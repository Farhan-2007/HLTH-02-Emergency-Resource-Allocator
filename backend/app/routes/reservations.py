from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.reservation import Reservation
from app.models.hospital import Hospital
from app.schemas.reservation import ReservationCreate, ReservationResponse


router = APIRouter()


@router.post("/requests", response_model=ReservationResponse)
def create_reservation(
    request: ReservationCreate,
    db: Session = Depends(get_db)
):
    new_reservation = Reservation(
        case_id=request.case_id,
        hospital_id=request.hospital_id,
        resource_type=request.resource_type,
        status="requested",
        timestamp=datetime.now()
    )

    db.add(new_reservation)
    db.commit()
    db.refresh(new_reservation)

    return new_reservation

@router.post("/requests/{request_id}/accept")
def accept_reservation(
    request_id: int,
    db: Session = Depends(get_db)
):
    reservation = db.query(Reservation).filter(
        Reservation.id == request_id
    ).first()

    if not reservation:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    hospital = db.query(Hospital).filter(
        Hospital.id == reservation.hospital_id
    ).first()

    if not hospital:
        raise HTTPException(
            status_code=404,
            detail="Hospital not found"
        )

    available = hospital.available.get(
        reservation.resource_type,
        0
    )

    if available <= 0:
        raise HTTPException(
            status_code=400,
            detail="Resource not available"
        )

    hospital.available[reservation.resource_type] = available - 1

    # Tell SQLAlchemy that the JSON field was modified
    from sqlalchemy.orm.attributes import flag_modified

    flag_modified(hospital, "available")

    reservation.status = "accepted"

    db.commit()
    db.refresh(reservation)

    return reservation

@router.post("/requests/{request_id}/reject")
def reject_reservation(
    request_id: int,
    db: Session = Depends(get_db)
):
    reservation = db.query(Reservation).filter(
        Reservation.id == request_id
    ).first()

    if not reservation:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    if reservation.status != "requested":
        raise HTTPException(
            status_code=400,
            detail="Reservation is not pending"
        )

    reservation.status = "rejected"

    db.commit()
    db.refresh(reservation)

    return reservation

@router.get("/requests")
def get_requests(
    db: Session = Depends(get_db)
):
    return db.query(Reservation).all()

@router.get("/requests/pending")
def get_pending_requests(
    db: Session = Depends(get_db)
):
    return db.query(Reservation).filter(
        Reservation.status == "requested"
    ).all()

@router.get("/requests/hospital/{hospital_id}")
def get_hospital_requests(
    hospital_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Reservation).filter(
        Reservation.hospital_id == hospital_id,
        Reservation.status == "requested"
    ).all()