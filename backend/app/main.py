from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models.scan_history import Base

from app.routes.scan import router as scan_router
from app.routes.history import router as history_router
from app.routes.report import router as report_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ReconVault API",
    description="Attack Surface & OSINT Platform",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router)
app.include_router(history_router)
app.include_router(report_router)

@app.get("/")
def root():
    return {
        "message": "Welcome to ReconVault !!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }