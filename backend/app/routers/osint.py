"""
OSINT query routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, OSINTQuery
from app.schemas import OSINTQueryRequest, OSINTQueryResponse
from app.core.security import get_current_user
from app.services.osint_engine import osint_engine

router = APIRouter()

@router.post("/query", response_model=OSINTQueryResponse)
async def create_osint_query(
    query: OSINTQueryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Perform OSINT analysis on a query"""
    
    # Validate query type
    valid_types = ["username", "email", "phone", "domain", "ip", "company"]
    if query.query_type not in valid_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid query type. Must be one of: {', '.join(valid_types)}"
        )
    
    # Run OSINT analysis
    analysis_result = await osint_engine.analyze(query.query_type, query.query_value)
    
    # Save query to database
    db_query = OSINTQuery(
        user_id=current_user.id,
        query_type=query.query_type,
        query_value=query.query_value,
        results=analysis_result,
        risk_score=analysis_result.get("risk_score", "LOW"),
        case_id=query.case_id
    )
    db.add(db_query)
    db.commit()
    db.refresh(db_query)
    
    return db_query

@router.get("/queries", response_model=List[OSINTQueryResponse])
async def get_user_queries(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    """Get user's OSINT query history"""
    queries = db.query(OSINTQuery).filter(
        OSINTQuery.user_id == current_user.id
    ).order_by(OSINTQuery.created_at.desc()).offset(skip).limit(limit).all()
    
    return queries

@router.get("/queries/{query_id}", response_model=OSINTQueryResponse)
async def get_query(
    query_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific OSINT query"""
    query = db.query(OSINTQuery).filter(
        OSINTQuery.id == query_id,
        OSINTQuery.user_id == current_user.id
    ).first()
    
    if not query:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Query not found"
        )
    
    return query

