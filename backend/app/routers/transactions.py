from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionUpdate, TransactionResponse
from app.services.parser import parse_message
from app.services.categorizer import categorize_merchant
from app.services.rewards import calculate_projected_savings
from app.utils.exceptions import TransactionNotFoundException, InvalidTransactionDataException

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("", response_model=List[TransactionResponse])
def get_transactions(
    transaction_type: Optional[str] = Query(None, regex="^(credit|debit)$", description="Filter by type"),
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search by merchant name or raw SMS content"),
    db: Session = Depends(get_db)
):
    """
    Get all transactions sorted by timestamp (latest first).
    Allows filtering by type, category, and searching.
    """
    query = db.query(Transaction)
    
    if transaction_type:
        query = query.filter(Transaction.transaction_type == transaction_type)
    if category:
        query = query.filter(Transaction.category == category)
    if search:
        # Search by merchant or original message (case-insensitive)
        search_filter = f"%{search}%"
        query = query.filter(
            (Transaction.merchant.ilike(search_filter)) |
            (Transaction.raw_message.ilike(search_filter))
        )
        
    return query.order_by(Transaction.timestamp.desc()).all()


@router.post("", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def create_transaction(payload: TransactionCreate, db: Session = Depends(get_db)):
    """
    Adds a new raw transaction alert message.
    Automatically parses details, categorizes, calculates savings, and saves to database.
    """
    raw_message = payload.raw_message.strip()
    if not raw_message:
        raise InvalidTransactionDataException("Raw message cannot be empty or whitespaces.")
        
    # 1. Parse raw message
    parsed = parse_message(raw_message)
    
    # 2. Automatically categorize
    category = categorize_merchant(parsed["merchant"])
    
    # 3. Calculate rewards
    reward_amount = calculate_projected_savings(raw_message, parsed["amount"], parsed["transaction_type"])
    
    # 4. Save to DB
    db_tx = Transaction(
        raw_message=raw_message,
        amount=parsed["amount"],
        transaction_type=parsed["transaction_type"],
        merchant=parsed["merchant"],
        category=category,
        reward_amount=reward_amount,
        timestamp=payload.timestamp or datetime.utcnow()
    )
    
    db.add(db_tx)
    db.commit()
    db.refresh(db_tx)
    return db_tx


@router.put("/{id}", response_model=TransactionResponse)
def update_transaction(id: int, payload: TransactionUpdate, db: Session = Depends(get_db)):
    """
    Updates the category of a transaction manually.
    """
    db_tx = db.query(Transaction).filter(Transaction.id == id).first()
    if not db_tx:
        raise TransactionNotFoundException(id)
        
    category = payload.category.strip()
    if not category:
        raise InvalidTransactionDataException("Category name cannot be empty.")
        
    db_tx.category = category
    db.commit()
    db.refresh(db_tx)
    return db_tx


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(id: int, db: Session = Depends(get_db)):
    """
    Deletes a transaction record.
    """
    db_tx = db.query(Transaction).filter(Transaction.id == id).first()
    if not db_tx:
        raise TransactionNotFoundException(id)
        
    db.delete(db_tx)
    db.commit()
    return None
