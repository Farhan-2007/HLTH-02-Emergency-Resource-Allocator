from pydantic import BaseModel
from datetime import datetime
from typing import Any


class HospitalResponse(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
    facilities: Any
    capacity: Any
    available: Any
    last_updated: datetime

    class Config:
        from_attributes = True