from pydantic import BaseModel


class RankRequest(BaseModel):
    incident_latitude: float
    incident_longitude: float
    required_facilities: list[str]