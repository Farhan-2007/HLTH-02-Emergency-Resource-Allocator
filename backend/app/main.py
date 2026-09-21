from fastapi import FastAPI

from app.database import Base, engine
from app.models import Hospital, Case, Reservation

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Emergency Resource Allocator API is running"}