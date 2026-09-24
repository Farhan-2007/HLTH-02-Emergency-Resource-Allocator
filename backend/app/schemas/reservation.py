from pydantic import BaseModel


class ReservationCreate(BaseModel):
    case_id: int
    hospital_id: int
    resource_type: str


class ReservationResponse(BaseModel):
    id: int
    case_id: int
    hospital_id: int
    resource_type: str
    status: str

    class Config:
        from_attributes = True