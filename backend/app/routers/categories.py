from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
    """
    Get all transaction categories sorted alphabetically.
    """
    return db.query(Category).order_by(Category.name.asc()).all()


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)):
    """
    Create a new custom transaction category.
    Prevents empty names and name duplicates (case-insensitive).
    """
    name_clean = payload.name.strip()
    if not name_clean:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category name cannot be empty."
        )
        
    # Check for duplicates (case-insensitive)
    existing = db.query(Category).filter(Category.name.ilike(name_clean)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category '{name_clean}' already exists."
        )
        
    db_cat = Category(name=name_clean)
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat
