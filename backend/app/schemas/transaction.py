from pydantic import BaseModel, Field
from datetime import datetime
from typing import Dict, Optional

class TransactionCreate(BaseModel):
    raw_message: str = Field(..., description="The raw unstructured text message alert of the transaction")
    timestamp: Optional[datetime] = Field(None, description="Optional manual override for transaction timestamp")


class TransactionUpdate(BaseModel):
    category: str = Field(..., description="The new manually assigned category")


class TransactionResponse(BaseModel):
    id: int
    raw_message: str
    amount: float
    transaction_type: str
    merchant: Optional[str] = None
    category: str
    reward_amount: float
    timestamp: datetime
    created_at: datetime

    class Config:
        from_attributes = True


class AnalyticsResponse(BaseModel):
    category_totals: Dict[str, float] = Field(..., description="Sum of transactions per category")
    category_percentages: Dict[str, float] = Field(..., description="Percentage of spending/income per category")
    total_income: float = Field(..., description="Sum of all credit transactions")
    total_expense: float = Field(..., description="Sum of all debit transactions")
    net_balance: float = Field(..., description="Total income minus total expense")
    top_category: str = Field(..., description="The category with the highest spending")
    transaction_count: int = Field(..., description="Total count of transactions in database")
