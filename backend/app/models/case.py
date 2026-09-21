from sqlalchemy import Column, Integer, Float, String, DateTime, JSON
from app.database import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    incident_latitude = Column(Float, nullable=False)
    incident_longitude = Column(Float, nullable=False)

    required_facilities = Column(JSON, nullable=False)

    severity = Column(String, nullable=False)

    status = Column(String, nullable=False, default="requested")

    created_at = Column(DateTime, nullable=False)