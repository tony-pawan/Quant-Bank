from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    raw_message = Column(Text, nullable=False)
    amount = Column(Float, nullable=False)
    transaction_type = Column(String, nullable=False)  # 'credit' or 'debit'
    merchant = Column(String, nullable=True)
    category = Column(String, nullable=False)          # 'Food', 'Travel', 'Salary', 'Miscellaneous'
    reward_amount = Column(Float, default=0.0)
    timestamp = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
