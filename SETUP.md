# OSINT Tool - Setup Guide

## Prerequisites

- Python 3.9+
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SECRET_KEY`: Random secret key for JWT (generate with: `python -c "import secrets; print(secrets.token_urlsafe(32))"`)
   - `ALGORITHM`: HS256 (default)
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: 30 (default)

6. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE osint_tool;
   ```

7. **Run the backend:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` and set:
   - `NEXT_PUBLIC_API_URL`: http://localhost:8000 (or your backend URL)

4. **Run the frontend:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open http://localhost:3000 in your browser

## First Use

1. Register a new account
2. Login with your credentials
3. Start a new OSINT investigation

## Important Notes

- The database tables will be created automatically on first run
- All OSINT queries are rate-limited to respect API limits
- Only publicly available information is collected
- No private data or passwords are accessed

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format: `postgresql://user:password@localhost/osint_tool`
- Verify database exists

### API Connection Issues
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify NEXT_PUBLIC_API_URL in frontend `.env.local`

### Module Import Errors
- Ensure all Python dependencies are installed
- Check virtual environment is activated
- Verify Python path

## Legal Reminder

⚠️ **This tool is for educational, investigative, and defensive security purposes only.**

- Only publicly available information is collected
- No hacking or unauthorized access
- No password extraction
- Users are responsible for legal compliance

