from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)

    case_id = Column(Integer, ForeignKey("cases.id"), nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=False)

    resource_type = Column(String, nullable=False)

    status = Column(String, nullable=False, default="requested")

    timestamp = Column(DateTime, nullable=False)