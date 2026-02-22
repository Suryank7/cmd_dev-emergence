import requests
from app.config import settings
from app.database.faiss_store import VectorStore
from app.embeddings.generator import EmbeddingGenerator
import json

class RAGEngine:
    def __init__(self):
        self.vector_store = VectorStore()
        self.embedder = EmbeddingGenerator()

    def generate_response(self, query: str, history: list) -> str:
        # 1. Embed Query
        query_embedding = self.embedder.generate([query])[0]
        
        # 2. Retrieve Context
        results = self.vector_store.search(query_embedding, k=5)
        
        context_texts = []
        for res in results:
            if res["distance"] < 1.5:  # Arbitrary threshold to ensure relevance
                context_texts.append(res["metadata"]["text"])
                
        context = "\n\n".join(context_texts) if context_texts else "No relevant context found in resume."
        
        # 3. Construct Prompt
        system_prompt = f"""You are an AI assistant representing Alex Chen, based strictly on the provided resume context.
Your goal is to answer questions about Alex's background, skills, and experience.

RULES:
1. Answer ONLY using the information provided in the context below.
2. If the answer is not in the context, explicitly say: "Not mentioned in the resume."
3. Do NOT hallucinate or make up any information.
4. Maintain a professional, confident, and helpful tone.
5. Highlight achievements when relevant to the user's question.

CONTEXT FROM RESUME:
{context}
"""

        messages = [{"role": "system", "content": system_prompt}]
        for msg in history[-4:]: # Keep only recent history to save tokens
            messages.append(msg)
            
        messages.append({"role": "user", "content": query})

        # 4. Call LLM API
        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://localhost:8000",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": settings.LLM_MODEL,
            "messages": messages,
            "temperature": 0.2, # Low temperature for accurate grounding
        }
        
        try:
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"]
        except Exception as e:
            return f"Error communicating with AI model: {str(e)}"
