"""
OSINT Tool - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.database import engine, Base
from app.routers import auth, osint, reports, cases
from app.core.config import settings

load_dotenv()

# Create database tables
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown

app = FastAPI(
    title="OSINT Tool API",
    description="Professional Open Source Intelligence Platform - Educational & Legal Use Only",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(osint.router, prefix="/api/osint", tags=["OSINT"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(cases.router, prefix="/api/cases", tags=["Cases"])

@app.get("/")
async def root():
    return {
        "message": "OSINT Tool API",
        "version": "1.0.0",
        "disclaimer": "This tool is for educational, investigative, and defensive security purposes only. Only publicly available information is collected."
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

