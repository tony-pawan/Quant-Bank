from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.config.constants import DEFAULT_CATEGORIES
from typing import Dict, Any

def calculate_analytics(db: Session) -> Dict[str, Any]:
    """
    Computes summary metrics for all transactions in the database:
    - total_income (credits)
    - total_expense (debits)
    - net_balance (income - expense)
    - category_totals (sum of amounts per category)
    - category_percentages (percentage of total transaction volume per category)
    - top_category (the category with the highest overall debit transactions)
    - transaction_count (total number of transactions)
    """
    transactions = db.query(Transaction).all()
    
    total_income = 0.0
    total_expense = 0.0
    
    # Initialize category totals for all default categories
    category_totals = {cat: 0.0 for cat in DEFAULT_CATEGORIES}
    
    # Track expense per category specifically to find the top spending category
    expense_totals = {cat: 0.0 for cat in DEFAULT_CATEGORIES}
    
    for tx in transactions:
        amount = tx.amount
        category = tx.category
        
        # Ensure dynamic categories are handled
        if category not in category_totals:
            category_totals[category] = 0.0
        if category not in expense_totals:
            expense_totals[category] = 0.0

        if tx.transaction_type == "credit":
            total_income += amount
        elif tx.transaction_type == "debit":
            total_expense += amount
            expense_totals[category] += amount
            
        category_totals[category] += amount

    # Net balance calculation
    net_balance = round(total_income - total_expense, 2)
    total_income = round(total_income, 2)
    total_expense = round(total_expense, 2)

    # Round category totals
    for cat in category_totals:
        category_totals[cat] = round(category_totals[cat], 2)

    # Compute category percentages based on total transaction volume
    # (or sum of all categorized amounts)
    total_volume = sum(category_totals.values())
    category_percentages = {}
    for cat, val in category_totals.items():
        percentage = (val / total_volume * 100) if total_volume > 0 else 0.0
        category_percentages[cat] = round(percentage, 2)

    # Find the top spending category (highest debit/expense)
    top_spending_category = "None"
    max_expense = 0.0
    for cat, val in expense_totals.items():
        # Skip Salary for spending calculation
        if cat == "Salary":
            continue
        if val > max_expense:
            max_expense = val
            top_spending_category = cat

    # Fallback if no expenses recorded
    if top_spending_category == "None" and len(transactions) > 0:
        # Fall back to overall highest category
        top_spending_category = max(category_totals, key=category_totals.get)

    return {
        "category_totals": category_totals,
        "category_percentages": category_percentages,
        "total_income": total_income,
        "total_expense": total_expense,
        "net_balance": net_balance,
        "top_category": top_spending_category,
        "transaction_count": len(transactions)
    }
