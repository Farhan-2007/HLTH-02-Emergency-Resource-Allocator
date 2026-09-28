# RESQ – Emergency Resource Allocator

## Project Overview

**RESQ (Emergency Resource Allocator)** is an emergency coordination platform designed to help dispatchers identify suitable hospitals for emergency cases based on required medical facilities, geographic distance, and estimated travel time.

The system connects a **dispatcher** with available hospitals through a centralized web application.

Instead of manually checking hospitals one by one, RESQ provides ranked hospital recommendations and allows the dispatcher to send a resource request to a selected hospital.

The hospital can then **accept or reject the request**, after which the emergency case status is updated.

> **Current prototype:** Hospital availability is simulated using application database data, and travel time is estimated from geographic distance using a configured average speed.

---

# Problem Statement

During emergency situations, identifying a suitable hospital quickly can be difficult.

Dispatchers may need to consider:

- Required medical facilities
- Hospital resource availability
- Distance from the incident
- Estimated travel time
- Hospital response to the emergency request

A manual process can increase coordination time and make it difficult to compare multiple hospitals efficiently.

RESQ addresses this problem by providing a centralized system for **hospital discovery, ranking, request management, and status tracking**.

---

# Proposed Solution

RESQ provides an automated emergency resource allocation workflow.

The dispatcher enters:

- Emergency location
- Emergency severity
- Required medical facilities

The backend then:

1. Creates the emergency case.
2. Checks hospitals for the required facilities.
3. Filters unsuitable hospitals.
4. Calculates geographic distance.
5. Estimates travel time.
6. Ranks suitable hospitals.
7. Displays recommendations to the dispatcher.
8. Allows the dispatcher to send a request to a selected hospital.
9. Allows the hospital to accept or reject the request.
10. Updates the emergency case status.

---

# Key Features

## Dispatcher Dashboard

- Create a new emergency case.
- Enter incident location.
- Select required medical facilities.
- Specify emergency severity.
- View ranked hospital recommendations.
- View hospital distance.
- View estimated travel time.
- View the reason for hospital recommendation.
- Send a resource request to a hospital.
- Track the emergency case status.

## Hospital Dashboard

- View incoming emergency requests.
- View emergency case information.
- Accept an emergency request.
- Reject an emergency request.
- Update request status.
- Update resource capacity after acceptance.

## Hospital Ranking

Hospitals are ranked using:

- Required facility availability
- Geographic distance
- Estimated travel time

Hospitals that do not satisfy the required facilities are filtered out before ranking.

## Case Tracking

The dispatcher can track the current status of an emergency case.

Example statuses include:

```text
requested
accepted
rejected
```

---

# System Architecture

RESQ uses a client-server architecture.

```text
+-----------------------+
|       User            |
| Dispatcher / Hospital |
+-----------+-----------+
            |
            v
+-----------------------+
|    React Frontend     |
|        + Vite         |
+-----------+-----------+
            |
            | REST API / JSON
            v
+-----------------------+
|    FastAPI Backend    |
+-----------+-----------+
            |
            v
+-----------------------+
|   API Routes /        |
|   Business Logic      |
+-----------+-----------+
            |
      +-----+------+
      |            |
      v            v
+-----------+  +----------------+
| Ranking   |  | SQLAlchemy ORM |
| Engine    |  +-------+--------+
+-----------+          |
                       v
                +-------------+
                | PostgreSQL  |
                +-------------+
```

A detailed architecture diagram is available in:

```text
docs/architecture.md
```

---

# Workflow

```text
Dispatcher
    |
    v
Enter Emergency Details
    |
    v
Create Emergency Case
    |
    v
Find Suitable Hospitals
    |
    v
Filter Required Facilities
    |
    v
Calculate Distance
    |
    v
Estimate Travel Time
    |
    v
Rank Hospitals
    |
    v
Display Recommendations
    |
    v
Send Hospital Request
    |
    v
Hospital Receives Request
    |
    +-------------------+
    |                   |
    v                   v
  Accept              Reject
    |                   |
    v                   v
Update Capacity    Update Status
    |                   |
    +---------+---------+
              |
              v
       Update Case Status
```

---

# Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | CSS |
| Backend | FastAPI |
| Language | Python |
| ORM | SQLAlchemy |
| Database | PostgreSQL |
| API | REST API |
| API Documentation | Swagger / OpenAPI |
| Version Control | Git / GitHub |

---

# Project Structure

```text
HLTH-02-Emergency-Resource-Allocator/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   │
│   │   ├── models/
│   │   │   ├── hospital.py
│   │   │   ├── case.py
│   │   │   └── reservation.py
│   │   │
│   │   ├── routes/
│   │   │   ├── hospitals.py
│   │   │   ├── cases.py
│   │   │   ├── ranking.py
│   │   │   └── reservations.py
│   │   │
│   │   ├── schemas/
│   │   │   └── ranking.py
│   │   │
│   │   └── services/
│   │       └── ranking.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmergencyForm.jsx
│   │   │   └── HospitalCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── DispatcherDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── docs/
│   ├── architecture.md
│   └── screenshots/
│
├── README.md
└── .gitignore
```

---

# Ranking Algorithm

The ranking engine helps identify hospitals that can handle the emergency.

## Step 1 – Resource Filtering

The system checks whether a hospital has the facilities required for the emergency.

For example:

```text
Required Facilities:
ICU
Ventilator
```

Hospitals that do not provide the required facilities are excluded.

---

## Step 2 – Distance Calculation

The system calculates the geographic distance between:

```text
Emergency Location
        ↓
Hospital Location
```

The **Haversine formula** is used to calculate the distance between two latitude/longitude coordinates.

---

## Step 3 – Travel Time Estimation

The prototype estimates travel time using:

```text
Travel Time = Distance / Average Speed
```

The current prototype uses a configured average speed rather than live traffic information.

---

## Step 4 – Ranking

Eligible hospitals are sorted using the calculated travel time.

The frontend then displays the ranked hospitals along with:

- Rank
- Hospital name
- Distance
- Estimated travel time
- Resource availability
- Ranking reason

---

# API Documentation

The backend provides REST APIs for interacting with emergency cases, hospitals, ranking, and requests.

When the FastAPI backend is running, Swagger UI is available at:

```text
http://127.0.0.1:8000/docs
```

## Main API Operations

### Hospitals

```text
GET /hospitals
```

Returns available hospitals.

---

### Emergency Cases

```text
GET /cases
```

Returns emergency cases.

```text
GET /cases/{case_id}
```

Returns information about a specific emergency case.

```text
POST /cases
```

Creates a new emergency case.

---

### Hospital Ranking

```text
POST /rank
```

Ranks hospitals based on the emergency location and required facilities.

Example request:

```json
{
  "incident_latitude": 19.076,
  "incident_longitude": 72.8777,
  "required_facilities": [
    "ICU",
    "Ventilator"
  ]
}
```

The response contains ranked hospitals with information such as:

```text
Hospital
Distance
Estimated Travel Time
Availability
Ranking Reason
```

---

### Resource Requests

The request APIs are used to send an emergency resource request to a hospital and process the hospital's response.

The workflow supports:

```text
Dispatcher → Hospital Request → Accept / Reject → Case Status Update
```

For the complete list of available endpoints and request/response schemas, use the Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Backend Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Farhan-2007/HLTH-02-Emergency-Resource-Allocator.git
```

Move into the project:

```bash
cd HLTH-02-Emergency-Resource-Allocator
```

---

## 2. Open Backend

```bash
cd backend
```

---

## 3. Create Virtual Environment

Windows:

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

Do **not** commit the actual `.env` file.

Use `.env.example` as the template.

---

## 6. Start PostgreSQL

Make sure PostgreSQL is running and the configured database exists.

---

## 7. Run Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Open that URL in your browser.

---

# Running the Complete System

Start the backend first:

```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

Then open another terminal and start the frontend:

```bash
cd frontend
npm run dev
```

The complete flow is:

```text
React Frontend
      ↓
FastAPI Backend
      ↓
PostgreSQL Database
```

---

# Environment Variables and Security

Sensitive configuration files should not be committed to GitHub.

The repository ignores:

```text
.env
venv/
__pycache__/
node_modules/
```

Use:

```text
.env.example
```

to document the required environment variables without exposing credentials.

---

# Limitations

The current prototype has several limitations.

### Simulated Hospital Availability

Hospital availability is currently based on data stored in the application's database.

It does not represent real-time hospital availability.

### Estimated Travel Time

Travel time is estimated using geographic distance and a configured average speed.

The system does not currently use live traffic data.

### Prototype Database

The prototype uses a predefined set of hospital data for demonstration.

### Authentication

Authentication and role-based access control are not currently implemented as a production security layer.

### Concurrency

Advanced concurrency and real-time resource locking are not yet implemented.

---

# Future Scope

## Live Hospital Data Integration

The system can be extended to integrate real-time hospital availability and resource information.

## Live Traffic Integration

Traffic APIs can be integrated to provide more realistic emergency travel-time estimates.

## Network Expansion

The platform can be expanded to support a larger network of hospitals and emergency facilities.

## Authentication and Authorization

Secure dispatcher and hospital accounts can be added with role-based access control.

## Real-Time Communication

WebSockets or similar technologies can be introduced for real-time request and status updates.

## Advanced Resource Management

The system can support more detailed resource tracking, reservation locking, and concurrent emergency requests.

## Production Deployment

The prototype can be extended into a production-ready emergency coordination platform with monitoring, logging, security, and scalable infrastructure.

---

# Screenshots

Prototype screenshots are included in the Idea Submission PPT and demonstrated in the prototype video submitted for evaluation.
---

# Demo Flow

The complete prototype can be demonstrated using the following sequence:

```text
1. Open Dispatcher Dashboard
        ↓
2. Enter emergency details
        ↓
3. Create emergency
        ↓
4. View ranked hospitals
        ↓
5. Select a hospital
        ↓
6. Send request
        ↓
7. Open Hospital Dashboard
        ↓
8. View incoming request
        ↓
9. Accept request
        ↓
10. Return to Dispatcher Dashboard
        ↓
11. Observe updated case status
```

This demonstrates the complete emergency resource allocation loop.

---

# Project Status

The current prototype demonstrates the core emergency resource allocation workflow:

- Emergency case creation
- Hospital discovery
- Facility-based filtering
- Hospital ranking
- Distance calculation
- Estimated travel time
- Hospital request creation
- Hospital accept/reject workflow
- Case status updates
- Frontend-backend integration
- PostgreSQL database integration

---

# Repository

GitHub:

https://github.com/Farhan-2007/HLTH-02-Emergency-Resource-Allocator

---

# Team

**Project:** RESQ – Emergency Resource Allocator

**Repository:** `HLTH-02-Emergency-Resource-Allocator`