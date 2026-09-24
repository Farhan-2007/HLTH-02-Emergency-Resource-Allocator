from datetime import datetime
from app.models.case import Case

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

    case = db.query(Case).filter(
         Case.id == reservation.case_id
    ).first()

    if case:
         case.status = "accepted"

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

    case = db.query(Case).filter(
         Case.id == reservation.case_id
    ).first()

    if case:
         case.status = "rejected"

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

@router.post("/requests/{request_id}/discharge")
def discharge_reservation(
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

    # Only an accepted reservation can be discharged
    if reservation.status != "accepted":
        raise HTTPException(
            status_code=400,
            detail="Only accepted requests can be discharged"
        )

    hospital = db.query(Hospital).filter(
        Hospital.id == reservation.hospital_id
    ).first()

    if not hospital:
        raise HTTPException(
            status_code=404,
            detail="Hospital not found"
        )

    resource_type = reservation.resource_type

    # Current available resource
    available = hospital.available.get(
        resource_type,
        0
    )

    # Maximum capacity
    capacity = hospital.capacity.get(
        resource_type,
        0
    )

    # Prevent availability from exceeding capacity
    if available >= capacity:
        raise HTTPException(
            status_code=400,
            detail="Resource availability is already at full capacity"
        )

    # Release the resource
    hospital.available[resource_type] = available + 1

    # Tell SQLAlchemy that JSON field changed
    from sqlalchemy.orm.attributes import flag_modified

    flag_modified(hospital, "available")

    # Update reservation status
    reservation.status = "discharged"

    db.commit()

    db.refresh(reservation)

    return reservation

@router.get("/requests/hospital/{hospital_id}/active")
def get_active_hospital_requests(
    hospital_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Reservation).filter(
        Reservation.hospital_id == hospital_id,
        Reservation.status == "accepted"
    ).all()