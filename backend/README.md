# HLTH-02 — Emergency Resource Allocator Backend

Backend service for the **HLTH-02: Real-Time Emergency Resource Allocator** project developed for HackMatrix 5.0.

The backend manages emergency cases, hospital data, resource availability, and will provide the hospital ranking and reservation logic.

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Uvicorn
- python-dotenv

---

## Backend Structure

```text
backend/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── seed.py
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── hospital.py
│   │   ├── case.py
│   │   └── reservation.py
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── hospital.py
│   │   └── case.py
│   │
│   ├── routes/
│   │   ├── hospitals.py
│   │   └── cases.py
│   │
│   └── services/
│
├── requirements.txt
├── .env
└── .gitignore

## Today's Progress — 22 September 2026

### Day 2 — Database & CRUD

Today we completed the backend database and basic CRUD functionality.

#### Database

- [x] Created PostgreSQL database `emergency_allocator`
- [x] Connected PostgreSQL with SQLAlchemy
- [x] Created SQLAlchemy database session
- [x] Added `get_db()` dependency for FastAPI routes
- [x] Created database tables:
  - `hospitals`
  - `cases`
  - `reservations`

#### Hospital API

- [x] Created `HospitalResponse` Pydantic schema
- [x] Created `GET /hospitals`
- [x] Created seed script
- [x] Seeded 3 hospitals into PostgreSQL
- [x] Verified hospital data through Swagger

#### Case API

- [x] Created `CaseCreate` Pydantic schema
- [x] Created `CaseResponse` Pydantic schema
- [x] Created `POST /cases`
- [x] Successfully created and stored an emergency case
- [x] Created `GET /cases/{id}`
- [x] Successfully retrieved the stored case through Swagger

#### Testing

All implemented endpoints were tested using FastAPI Swagger.

Example case created:

```json
{
  "incident_latitude": 19.076,
  "incident_longitude": 72.8777,
  "required_facilities": [
    "ICU",
    "Ventilator"
  ],
  "severity": "high"
}