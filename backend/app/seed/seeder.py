from datetime import datetime, timedelta
import random
from sqlalchemy.orm import Session
from app.models.transaction import Transaction
from app.models.category import Category
from app.services.parser import parse_message
from app.services.categorizer import categorize_merchant
from app.services.rewards import calculate_projected_savings
from app.config.constants import DEFAULT_CATEGORIES

# Realistic UPI and bank transaction SMS alerts
SEED_MESSAGES = [
    "Paid Rs.250 to Zomato via UPI",
    "Received Rs.1200 from Private Company Ltd",
    "Paid Rs.340 to Uber",
    "Paid Rs.500 to Swiggy Cashback Offer",
    "Received Rs.15000 Salary Credit",
    "Paid Rs.800 at Amazon",
    "Paid Rs.120 to Ola",
    "Paid Rs.600 to Swiggy",
    "UPI txn of INR 250 at Swiggy",
    "INR 500 debited for shopping",
    "Account credited with INR 15000",
    "Paid ₹250 to Zomato",
    "Paid ₹340 to Uber Cashback",
    "Received ₹500 Paytm Rewards",
    "Paid Rs.150 at Starbucks Coffee",
    "UPI txn of INR 1000 at Shell Petrol Pump",
    "Received Rs.50000 Salary from Employer Corp",
    "Paid Rs.3000 to Amazon Pay Gift Card",
    "Paid Rs.90 to Ola Auto",
    "Account credited with INR 2000 Refund reward"
]

def seed_database(db: Session):
    """Seed the SQLite database if there are no existing records."""
    # 1. Seed Categories if empty
    category_count = db.query(Category).count()
    if category_count == 0:
        for name in DEFAULT_CATEGORIES:
            db.add(Category(name=name))
        db.commit()

    # 2. Seed Transactions if empty
    tx_count = db.query(Transaction).count()
    if tx_count == 0:
        base_time = datetime.now()
        for msg in SEED_MESSAGES:
            # Disperse timestamps over the past 10 days
            tx_time = base_time - timedelta(
                days=random.randint(0, 10),
                hours=random.randint(1, 23),
                minutes=random.randint(0, 59)
            )
            
            # Parse, categorize, and calculate rewards
            parsed = parse_message(msg)
            category = categorize_merchant(parsed["merchant"])
            reward = calculate_projected_savings(msg, parsed["amount"], parsed["transaction_type"])
            
            db_tx = Transaction(
                raw_message=msg,
                amount=parsed["amount"],
                transaction_type=parsed["transaction_type"],
                merchant=parsed["merchant"],
                category=category,
                reward_amount=reward,
                timestamp=tx_time
            )
            db.add(db_tx)
            
        db.commit()
