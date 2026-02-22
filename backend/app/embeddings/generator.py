import requests
from typing import List
import time

class EmbeddingGenerator:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.api_url = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{model_name}"

    def generate(self, texts: List[str]) -> List[List[float]]:
        # Hugging Face Inference API is free but rate limits.
        # It's an excellent fallback for lightweight text embedding on environments without torch/transformers.
        response = requests.post(self.api_url, json={"inputs": texts})
        
        if response.status_code == 503:
            # Model is loading, wait and retry
            time.sleep(5)
            response = requests.post(self.api_url, json={"inputs": texts})
            
        if response.status_code != 200:
            print("Warning: HuggingFace API failed. Using fallback zeroes.")
            return [[0.0] * 384 for _ in texts]
            
        return response.json()
