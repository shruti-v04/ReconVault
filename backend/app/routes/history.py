from fastapi import APIRouter
from app.database import SessionLocal
from app.models.scan_history import ScanHistory

router = APIRouter()


@router.get("/history")
def get_history():

    db = SessionLocal()

    scans = db.query(ScanHistory).order_by(
        ScanHistory.scanned_at.desc()
    ).all()

    db.close()

    return scans