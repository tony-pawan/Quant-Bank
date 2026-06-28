from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.transaction import AnalyticsResponse
from app.services.analytics import calculate_analytics

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("", response_model=AnalyticsResponse)
def get_analytics(db: Session = Depends(get_db)):
    """
    Computes spending analytics, total income, total expense, net balance,
    and category percentage weights dynamically from the transactions table.
    """
    return calculate_analytics(db)
