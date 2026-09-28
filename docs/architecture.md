# System Architecture

## RESQ – Emergency Resource Allocator

RESQ follows a client-server architecture where the React frontend communicates with a FastAPI backend through REST APIs. The backend manages emergency cases, hospitals, resource availability, ranking, and reservation requests using PostgreSQL.

---

## 1. High-Level Architecture

```mermaid
flowchart TD

    A[Dispatcher / Hospital User]

    B[React Frontend<br/>Vite]

    C[FastAPI Backend<br/>REST API]

    D[API Routes]

    E[Business Logic<br/>Services]

    F[Ranking Engine<br/>Haversine Distance]

    G[SQLAlchemy ORM]

    H[(PostgreSQL Database)]

    A --> B
    B -->|HTTP / REST API| C
    C --> D
    D --> E
    E --> F
    E --> G
    G --> H

    H --> G
    G --> E
    E --> D
    D --> C
    C -->|JSON Response| B