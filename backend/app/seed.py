from datetime import datetime

from app.database import SessionLocal
from app.models.hospital import Hospital


def seed_hospitals():
    db = SessionLocal()

    hospitals = [
        Hospital(
            name="City Care Hospital",
            latitude=19.0760,
            longitude=72.8777,
            facilities=["ICU", "Trauma", "Ventilator", "Blood Bank"],
            capacity={
                "ICU": 10,
                "Trauma": 8,
                "Ventilator": 6,
                "Blood Bank": 5
            },
            available={
                "ICU": 6,
                "Trauma": 5,
                "Ventilator": 4,
                "Blood Bank": 3
            },
            last_updated=datetime.now()
        ),
        Hospital(
            name="Metro General Hospital",
            latitude=19.0330,
            longitude=73.0297,
            facilities=["ICU", "Ventilator", "Blood Bank"],
            capacity={
                "ICU": 8,
                "Ventilator": 5,
                "Blood Bank": 4
            },
            available={
                "ICU": 3,
                "Ventilator": 2,
                "Blood Bank": 3
            },
            last_updated=datetime.now()
        ),
        Hospital(
            name="Sunrise Medical Center",
            latitude=19.2183,
            longitude=72.9781,
            facilities=["Trauma", "ICU", "Blood Bank"],
            capacity={
                "Trauma": 10,
                "ICU": 6,
                "Blood Bank": 6
            },
            available={
                "Trauma": 7,
                "ICU": 4,
                "Blood Bank": 5
            },
            last_updated=datetime.now()
        )
    ]

    db.add_all(hospitals)
    db.commit()

    print("Hospitals seeded successfully!")

    db.close()


if __name__ == "__main__":
    seed_hospitals()