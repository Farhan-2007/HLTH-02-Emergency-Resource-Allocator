from pydantic import BaseModel
from typing import Any


class CaseCreate(BaseModel):
    incident_latitude: float
    incident_longitude: float
    required_facilities: Any
    severity: str


class CaseResponse(BaseModel):
    id: int
    incident_latitude: float
    incident_longitude: float
    required_facilities: Any
    severity: str
    status: str

    class Config:
        from_attributes = True