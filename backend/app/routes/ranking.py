from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.hospital import Hospital
from app.schemas.ranking import RankRequest
from app.services.ranking import rank_hospitals


router = APIRouter()


@router.post("/rank")
def rank_emergency_hospitals(
    request: RankRequest,
    db: Session = Depends(get_db)
):
    hospitals = db.query(Hospital).all()

    results = rank_hospitals(
        hospitals,
        request.incident_latitude,
        request.incident_longitude,
        request.required_facilities
    )

    return results