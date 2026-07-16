
from fastapi import APIRouter
from app.schemas.scan_schema import ScanRequest
from app.schemas.response_schema import ScanResponse
from app.engine.scan_engine import run_scan

router = APIRouter()


@router.post("/scan", response_model=ScanResponse)
def start_scan(scan: ScanRequest):
    return run_scan(scan.domain)