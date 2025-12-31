# OSINT Tool - Professional Open Source Intelligence Platform

**Developed by Jayvik Labs**

## ⚠️ Legal Disclaimer

**This tool is designed for educational, investigative, and defensive security purposes ONLY.**

- ✅ Only collects publicly available information
- ✅ No hacking, password extraction, or unauthorized access
- ✅ No social media login bypass
- ✅ Clear source attribution for all data
- ❌ NOT for stalking, harassment, or illegal activities

**Users are responsible for ensuring their use of this tool complies with all applicable laws and regulations.**

## 🎯 Features

### Input Types
- Username
- Email address
- Phone number
- Domain / Website
- IP address
- Company name

### Data Sources
- Search engines (public scraping simulation)
- Social media public profiles
- WHOIS & DNS records
- Public breach databases (metadata only)
- GitHub public repositories
- Paste sites (public pastes)
- News & public forums
- Public government/company registries

### Analysis Engine
- Multi-source data correlation
- Pattern detection (username reuse across platforms)
- Timeline creation
- Risk scoring (LOW/MEDIUM/HIGH - informational)
- Duplicate & false-positive filtering

### Output
- Interactive dashboard
- Structured reports (JSON + PDF)
- Visual graphs (connections, timeline, geo map)
- Source attribution

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Backend**: Python FastAPI
- **Database**: PostgreSQL
- **Authentication**: JWT
- **OSINT Modules**: Requests, BeautifulSoup, Public APIs

## 📦 Installation

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

### Database Setup

```bash
# Create PostgreSQL database
createdb osint_tool

# Run migrations (if using Alembic)
cd backend
alembic upgrade head
```

## 🏃 Running the Application

### Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm run dev
```

Access the application at `http://localhost:3000`

## 📝 Environment Variables

Create `.env` files in both `backend/` and `frontend/` directories:

**backend/.env**
```
DATABASE_URL=postgresql://user:password@localhost/osint_tool
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🔒 Security Notes

- All API endpoints require authentication (except login/register)
- Rate limiting implemented on all OSINT queries
- User activity logging for audit purposes
- No sensitive data stored (only metadata)

## 📄 License

This project is for educational purposes only. Use responsibly and ethically.

