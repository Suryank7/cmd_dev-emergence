from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.rag.engine import RAGEngine

router = APIRouter()
rag_engine = RAGEngine()

class ChatRequest(BaseModel):
    query: str
    history: List[dict] = []

@router.post("/chat")
async def chat_with_resume(request: ChatRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
        
    try:
        response_text = rag_engine.generate_response(request.query, request.history)
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
