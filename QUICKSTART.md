# Quick Start Guide

Get the OSINT Tool up and running in 5 minutes!

## Prerequisites Check

- ✅ Python 3.9+ installed
- ✅ Node.js 18+ installed
- ✅ PostgreSQL running
- ✅ Git installed

## Step 1: Database Setup

```bash
# Create PostgreSQL database
createdb osint_tool

# Or using psql:
psql -U postgres
CREATE DATABASE osint_tool;
\q
```

## Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost/osint_tool" > .env
echo "SECRET_KEY=$(python -c 'import secrets; print(secrets.token_urlsafe(32))')" >> .env
echo "ALGORITHM=HS256" >> .env
echo "ACCESS_TOKEN_EXPIRE_MINUTES=30" >> .env

# Edit .env with your actual database credentials

# Run backend
uvicorn main:app --reload --port 8000
```

Backend should now be running at http://localhost:8000

## Step 3: Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run frontend
npm run dev
```

Frontend should now be running at http://localhost:3000

## Step 4: First Use

1. Open http://localhost:3000 in your browser
2. Click "Register" to create an account
3. Login with your credentials
4. Start your first OSINT investigation!

## Example Queries

Try these to test the system:

- **Username**: `octocat` (GitHub)
- **Email**: Your own email (for breach check)
- **Domain**: `github.com`
- **IP**: `8.8.8.8`

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Check port 8000 is available

### Frontend won't start
- Check Node.js version: `node --version`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is available

### Database errors
- Verify database exists
- Check user permissions
- Verify connection string format

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed setup
- Read [FEATURES.md](FEATURES.md) for feature documentation
- Read [README.md](README.md) for full documentation

## Need Help?

- Check the documentation files
- Review error messages carefully
- Ensure all prerequisites are met
- Verify environment variables are set correctly

Happy investigating! 🕵️

