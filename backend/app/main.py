from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import Hospital, Case, Reservation
from app.routes.hospitals import router as hospital_router
from app.routes.cases import router as case_router
from app.routes.ranking import router as ranking_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hospital_router)
app.include_router(case_router)
app.include_router(ranking_router)


@app.get("/")
def home():
    return {"message": "Emergency Resource Allocator API is running"}