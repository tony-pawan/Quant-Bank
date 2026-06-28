from pydantic import BaseModel, Field
from datetime import datetime

class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, description="The name of the new custom category")


class CategoryResponse(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        from_attributes = True
