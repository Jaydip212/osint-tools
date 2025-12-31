# Project Structure

```
OSINT Tool/
│
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── core/              # Core utilities
│   │   │   ├── __init__.py
│   │   │   ├── config.py      # Configuration settings
│   │   │   └── security.py    # JWT authentication
│   │   ├── routers/           # API routes
│   │   │   ├── __init__.py
│   │   │   ├── auth.py        # Authentication routes
│   │   │   ├── osint.py       # OSINT query routes
│   │   │   ├── cases.py       # Case management routes
│   │   │   └── reports.py     # Report generation routes
│   │   ├── services/          # Business logic
│   │   │   ├── __init__.py
│   │   │   ├── osint_engine.py    # Main OSINT engine
│   │   │   ├── report_generator.py # PDF/JSON reports
│   │   │   └── modules/       # OSINT data collection modules
│   │   │       ├── __init__.py
│   │   │       ├── search_engine.py
│   │   │       ├── social_media.py
│   │   │       ├── whois_dns.py
│   │   │       ├── breach_db.py
│   │   │       ├── github.py
│   │   │       ├── paste_sites.py
│   │   │       └── news_forum.py
│   │   ├── database.py        # Database configuration
│   │   ├── models.py          # SQLAlchemy models
│   │   └── schemas.py         # Pydantic schemas
│   ├── main.py                # FastAPI application entry
│   └── requirements.txt       # Python dependencies
│
├── frontend/                   # Next.js Frontend
│   ├── app/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── LoginForm.tsx      # Authentication form
│   │   ├── SearchBar.tsx      # OSINT search interface
│   │   ├── QueryResults.tsx   # Results display
│   │   ├── QueryHistory.tsx  # Query history
│   │   ├── Cases.tsx          # Case management
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── ResultCard.tsx     # Individual result card
│   │   ├── TimelineChart.tsx  # Timeline visualization
│   │   └── SourceChart.tsx    # Source distribution chart
│   ├── lib/
│   │   ├── api.ts             # API client
│   │   └── auth.ts            # Authentication utilities
│   ├── package.json           # Node dependencies
│   ├── tsconfig.json          # TypeScript config
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── next.config.js         # Next.js config
│
├── README.md                   # Main documentation
├── SETUP.md                    # Detailed setup guide
├── QUICKSTART.md              # Quick start guide
├── FEATURES.md                # Features documentation
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
└── .gitignore                 # Git ignore rules

```

## Key Components

### Backend Architecture

**FastAPI Application** (`main.py`)
- Main application entry point
- CORS configuration
- Router registration
- Database initialization

**Database Models** (`models.py`)
- User: Authentication and user management
- OSINTQuery: Query history and results
- Case: Investigation case management

**OSINT Engine** (`services/osint_engine.py`)
- Coordinates all OSINT modules
- Performs data correlation
- Generates risk scores
- Creates timelines

**OSINT Modules** (`services/modules/`)
- Independent data collection modules
- Rate-limited and respectful
- Public data only
- Source attribution

**API Routes** (`routers/`)
- RESTful API endpoints
- JWT authentication
- Request validation
- Error handling

### Frontend Architecture

**Next.js Application**
- Server-side rendering ready
- TypeScript for type safety
- Tailwind CSS for styling
- Dark cybersecurity theme

**Components**
- Modular React components
- Reusable UI elements
- Data visualization
- Responsive design

**State Management**
- React hooks
- Local storage for auth
- API client with interceptors

## Data Flow

1. **User Input** → SearchBar component
2. **API Request** → FastAPI backend
3. **OSINT Engine** → Parallel module execution
4. **Data Collection** → Multiple sources
5. **Analysis** → Correlation and risk scoring
6. **Storage** → PostgreSQL database
7. **Response** → Frontend display
8. **Visualization** → Charts and graphs

## Security Layers

1. **Authentication**: JWT tokens
2. **Authorization**: User-based access control
3. **Rate Limiting**: Built into modules
4. **Input Validation**: Pydantic schemas
5. **Error Handling**: Graceful failures
6. **Data Privacy**: No sensitive data stored

## Extension Points

- **New OSINT Modules**: Add to `services/modules/`
- **New API Endpoints**: Add to `routers/`
- **New Visualizations**: Add components to `frontend/components/`
- **New Report Formats**: Extend `report_generator.py`

