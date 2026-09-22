from math import radians, sin, cos, sqrt, atan2

from app.database import SessionLocal
from app.models.hospital import Hospital


def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Earth radius in kilometres

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2

    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


def estimated_travel_time(distance_km, average_speed=30):
    time_hours = distance_km / average_speed
    time_minutes = time_hours * 60

    return time_minutes


def has_required_resources(hospital, required_facilities):
    for facility in required_facilities:
        if hospital.available.get(facility, 0) <= 0:
            return False

    return True


def rank_hospitals(
    hospitals,
    incident_latitude,
    incident_longitude,
    required_facilities
):
    ranked_hospitals = []

    for hospital in hospitals:

        if not has_required_resources(hospital, required_facilities):
            continue

        distance = haversine_distance(
            incident_latitude,
            incident_longitude,
            hospital.latitude,
            hospital.longitude
        )

        travel_time = estimated_travel_time(distance)

        reason = (
            f"Has {', '.join(required_facilities)}, "
            f"approximately {round(travel_time, 1)} minutes away"
        )

        ranked_hospitals.append({
            "hospital_id": hospital.id,
            "hospital_name": hospital.name,
            "distance_km": distance,
            "estimated_travel_time_minutes": travel_time,
            "reason": reason
        })

    ranked_hospitals.sort(
        key=lambda hospital: hospital["estimated_travel_time_minutes"]
    )

    return ranked_hospitals


if __name__ == "__main__":
    db = SessionLocal()

    hospitals = db.query(Hospital).all()

    results = rank_hospitals(
        hospitals,
        19.0760,
        72.8777,
        ["ICU", "Ventilator"]
    )

    for hospital in results:
        print(hospital)

    db.close()