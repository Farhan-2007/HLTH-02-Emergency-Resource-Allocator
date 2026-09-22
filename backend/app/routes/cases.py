from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.case import Case
from app.schemas.case import CaseCreate, CaseResponse


router = APIRouter()


@router.post("/cases", response_model=CaseResponse)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    new_case = Case(
        incident_latitude=case.incident_latitude,
        incident_longitude=case.incident_longitude,
        required_facilities=case.required_facilities,
        severity=case.severity,
        status="requested",
        created_at=datetime.now()
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case

@router.get("/cases/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()

    return case