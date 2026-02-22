from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List
from app.utils.extractor import extract_text_from_pdf, chunk_text
from app.database.faiss_store import VectorStore
from app.embeddings.generator import EmbeddingGenerator

router = APIRouter()
vector_store = VectorStore()
embedder = EmbeddingGenerator()

@router.post("/ingest-resume")
async def ingest_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        # Extract Text
        content = await file.read()
        text = extract_text_from_pdf(content)
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
            
        # Chunk Text
        chunks = chunk_text(text)
        
        # Embed Chunks
        embeddings = embedder.generate(chunks)
        
        # Prepare Metadata
        metadatas = [{"text": chunk, "source": file.filename} for chunk in chunks]
        
        # Store in Vector DB
        vector_store.add_texts(embeddings, metadatas)
        
        return {
            "message": f"Successfully ingested {file.filename}",
            "chunks_processed": len(chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error ingesting resume: {str(e)}")
