"""
Case management routes
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import User, Case
from app.schemas import CaseCreate, CaseResponse
from app.core.security import get_current_user

router = APIRouter()

@router.post("/", response_model=CaseResponse)
async def create_case(
    case: CaseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new investigation case"""
    db_case = Case(
        user_id=current_user.id,
        name=case.name,
        description=case.description
    )
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    
    return db_case

@router.get("/", response_model=List[CaseResponse])
async def get_cases(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all cases for current user"""
    cases = db.query(Case).filter(
        Case.user_id == current_user.id
    ).order_by(Case.created_at.desc()).all()
    
    return cases

@router.get("/{case_id}", response_model=CaseResponse)
async def get_case(
    case_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific case"""
    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    return case

@router.put("/{case_id}", response_model=CaseResponse)
async def update_case(
    case_id: int,
    case_update: CaseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update a case"""
    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    case.name = case_update.name
    case.description = case_update.description
    db.commit()
    db.refresh(case)
    
    return case

@router.delete("/{case_id}")
async def delete_case(
    case_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a case"""
    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Case not found"
        )
    
    db.delete(case)
    db.commit()
    
    return {"message": "Case deleted successfully"}

