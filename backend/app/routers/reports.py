"""
Report generation routes
"""

from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, OSINTQuery
from app.schemas import ReportRequest
from app.core.security import get_current_user
from app.services.report_generator import generate_json_report, generate_pdf_report
import json

router = APIRouter()

@router.get("/json/{query_id}")
async def get_json_report(
    query_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate JSON report for a query"""
    query = db.query(OSINTQuery).filter(
        OSINTQuery.id == query_id,
        OSINTQuery.user_id == current_user.id
    ).first()
    
    if not query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Query not found"
        )
    
    report = generate_json_report(query)
    
    return Response(
        content=json.dumps(report, indent=2),
        media_type="application/json",
        headers={
            "Content-Disposition": f"attachment; filename=osint_report_{query_id}.json"
        }
    )

@router.get("/pdf/{query_id}")
async def get_pdf_report(
    query_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate PDF report for a query"""
    query = db.query(OSINTQuery).filter(
        OSINTQuery.id == query_id,
        OSINTQuery.user_id == current_user.id
    ).first()
    
    if not query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Query not found"
        )
    
    pdf_content = generate_pdf_report(query)
    
    return Response(
        content=pdf_content,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=osint_report_{query_id}.pdf"
        }
    )

