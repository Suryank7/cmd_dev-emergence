from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, ingest

app = FastAPI(title="AI Resume Chat API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")
app.include_router(ingest.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running flawlessly"}
