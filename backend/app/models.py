"""
Database models
"""

from sqlalchemy import Column, Integer, String, DateTime, Text, JSON, Boolean, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    queries = relationship("OSINTQuery", back_populates="user")
    cases = relationship("Case", back_populates="user")

class OSINTQuery(Base):
    __tablename__ = "osint_queries"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    case_id = Column(Integer, ForeignKey("cases.id"), nullable=True)
    query_type = Column(String, nullable=False)  # username, email, phone, domain, ip, company
    query_value = Column(String, nullable=False)
    results = Column(JSON)
    risk_score = Column(String)  # LOW, MEDIUM, HIGH
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="queries")
    case = relationship("Case", back_populates="queries")

class Case(Base):
    __tablename__ = "cases"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="active")  # active, closed, archived
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="cases")
    queries = relationship("OSINTQuery", back_populates="case")

