from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.engine.scan_engine import run_scan
from app.services.pdf_service import generate_pdf

router = APIRouter()


@router.get("/report/{domain}")
def report(domain: str):

    result = run_scan(domain)

    pdf = generate_pdf(result)

    return FileResponse(
        pdf,
        media_type="application/pdf",
        filename=pdf
    )