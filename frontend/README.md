# e-Allocator Frontend: HLTH-02 Real-Time Emergency Resource Allocator

Frontend for **e-Allocator**, our HackMatrix 5.0 entry for problem statement **HLTH-02: Real-Time Emergency Resource Allocator**.

> **Project stage:** first-round submission, roughly 30-40% complete. This README states what works today and what does not.

## The Problem

Ambulance teams and hospitals lack a shared, up-to-date view of beds and other resources. Choosing the right hospital depends on travel time, required facilities, and confirmed capacity, and that information is often disconnected. HLTH-02 asks for a platform where dispatchers can identify suitable hospitals, request confirmation, and coordinate the incoming-patient handover.

## Our Approach

<!-- TODO: 2-3 sentences in your own words. What does the dispatcher do, what does the hospital do, and what does the system decide? -->

## Current Status

The backend (see [`../backend/README.md`](../backend/README.md)) currently provides hospital listing, emergency case creation and retrieval, and a ranking endpoint. Ranking is based on **estimated travel time only**.

<!-- TODO: mark each row honestly: Working / Partial / Not started -->

| Frontend capability | Status |
| --- | --- |
| Dispatcher: create an emergency request | TODO |
| Hospital availability display | TODO |
| Ranked list of suitable hospitals | TODO |
| Hospital staff: accept / reject / reserve | TODO |
| Assignment-to-handoff tracking | TODO |
| Stale-data indication | TODO |
| Handling of double-booking / conflict responses | TODO |

### Known Limitations

- Travel time is **simulated**: straight-line (Haversine) distance at a fixed average speed, not real road routing.
- Ranking does not yet consider **data freshness**, which the problem statement requires.
- No reservation or accept/reject endpoint exists on the backend yet, so double-booking prevention is not implemented.
- <!-- TODO: add any frontend-specific limitations, e.g. mock data on specific screens -->

## Screenshots

<!-- TODO: add 2+ screenshots of screens that actually work, e.g. ![Dispatcher dashboard](docs/dispatcher.png) -->

## Tech Stack

- React 19
- Vite
- JavaScript (ES modules)
- lucide-react (icons)
- ESLint

## Getting Started

### Prerequisites

- Node.js (current LTS) and npm
- The backend running locally (see [`../backend/README.md`](../backend/README.md))

### Install and run

```bash
cd frontend
npm install
npm run dev
```

### Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Environment variables

<!-- TODO: list variable NAMES only, e.g. VITE_API_BASE_URL, or state that none are required and the URL is set in src/services/api.js -->

## Project Structure

```text
frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   ├── assets/
│   ├── components/
│   │   ├── EmergencyForm.jsx
│   │   ├── HospitalCard.jsx
│   │   └── RequestCard.jsx
│   ├── pages/
│   │   ├── DispatcherDashboard.jsx
│   │   └── HospitalDashboard.jsx
│   └── services/
│       └── api.js
├── package.json
└── vite.config.js
```

<!-- TODO: verify each file's role below against the code, and confirm vite.config.js exists -->

- `pages/`: the two role-based views, **Dispatcher** and **Hospital**.
- `components/`: reusable UI pieces (emergency request form, hospital card, request card).
- `services/api.js`: the single place where backend calls are made.

## Backend Integration

The frontend talks to the FastAPI backend. Endpoints available on the backend:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/hospitals` | List hospitals and their resources |
| `POST` | `/cases` | Create an emergency case |
| `GET` | `/cases/{id}` | Retrieve a case |
| `POST` | `/rank` | Rank suitable hospitals for a case |

<!-- TODO: state which of these the frontend actually calls today, the backend base URL/port, and whether CORS is configured -->

## Roadmap

Remaining work, in priority order:

1. **Reservation flow:** hospital staff accept/reject and reserve resources (backend endpoint and frontend UI).
2. **Double-booking protection:** atomic reservation on the backend; a clear conflict message in the UI when a resource is taken by another request.
3. **Data freshness:** `last_updated` on hospital data, a freshness factor in ranking, and a visible stale-data warning in the UI.
4. **Simulated live availability:** periodic availability updates reflected on the dashboards.
5. **Assignment-to-handoff workflow:** status tracking from request through to patient handover.
6. **Test scenarios:** stale data and simultaneous conflicting requests.
7. **Frontend cleanup:** client-side routing, removal of Vite template leftovers, extracting data-fetching logic into hooks.

<!-- TODO: adjust this roadmap to what the team will actually build -->

## Team

<!-- TODO: names, roles, GitHub handles -->

## Hackathon

**HackMatrix 5.0**, Problem Statement **HLTH-02: Real-Time Emergency Resource Allocator**