"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List, Any
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# OSINT schemas
class OSINTQueryRequest(BaseModel):
    query_type: str  # username, email, phone, domain, ip, company
    query_value: str
    case_id: Optional[int] = None

class OSINTResult(BaseModel):
    source: str
    data: Dict[str, Any]
    confidence: str  # HIGH, MEDIUM, LOW
    timestamp: datetime
    url: Optional[str] = None

class OSINTQueryResponse(BaseModel):
    id: int
    query_type: str
    query_value: str
    results: Optional[Dict[str, Any]] = None
    risk_score: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Case schemas
class CaseCreate(BaseModel):
    name: str
    description: Optional[str] = None

class CaseResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    status: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Report schemas
class ReportRequest(BaseModel):
    query_id: int
    format: str  # json, pdf

