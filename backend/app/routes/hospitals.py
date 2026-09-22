from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hospital import Hospital
from app.schemas.hospital import HospitalResponse


router = APIRouter()


@router.get("/hospitals", response_model=list[HospitalResponse])
def get_hospitals(db: Session = Depends(get_db)):
    hospitals = db.query(Hospital).all()

    return hospitals