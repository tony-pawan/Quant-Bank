from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.seed.seeder import seed_database
from app.utils.exceptions import APIException
from app.utils.error_handlers import api_exception_handler, generic_exception_handler
from app.routers.transactions import router as transactions_router
from app.routers.analytics import router as analytics_router

# Create database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Auto-seed the database with mock transactions on startup
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="Bank Transaction UPI Summary & Categorization API",
    description="Backend API for parsing, categorizing, and calculating rewards for UPI transactions.",
    version="1.0.0"
)

# Centralized exception handling registration
app.add_exception_handler(APIException, api_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers under /api prefix
app.include_router(transactions_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "Bank Transaction UPI Summary & Categorization API"
    }
