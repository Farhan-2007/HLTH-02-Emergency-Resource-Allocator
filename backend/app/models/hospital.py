from sqlalchemy import Column, Integer, String, Float, DateTime, JSON
from app.database import Base


class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    facilities = Column(JSON, nullable=False)

    capacity = Column(JSON, nullable=False)
    available = Column(JSON, nullable=False)

    last_updated = Column(DateTime, nullable=False)