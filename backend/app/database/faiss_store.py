import json
import os
import math
from typing import List, Dict, Any

def cosine_similarity(v1: List[float], v2: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(v1, v2))
    norm_v1 = math.sqrt(sum(a * a for a in v1))
    norm_v2 = math.sqrt(sum(b * b for b in v2))
    if norm_v1 == 0 or norm_v2 == 0:
        return 0.0
    return dot_product / (norm_v1 * norm_v2)

class VectorStore:
    def __init__(self, persist_dir: str = "faiss_data"):
        self.persist_dir = persist_dir
        self.data_path = os.path.join(self.persist_dir, "db.json")
        
        if not os.path.exists(self.persist_dir):
            os.makedirs(self.persist_dir)

        if os.path.exists(self.data_path):
            with open(self.data_path, "r") as f:
                self.data = json.load(f)
        else:
            self.data = []

    def add_texts(self, embeddings: List[List[float]], metadatas: List[Dict[str, Any]]):
        for emb, meta in zip(embeddings, metadatas):
            self.data.append({"embedding": emb, "metadata": meta})
        self.save()

    def search(self, query_embedding: List[float], k: int = 3):
        if not self.data:
            return []
            
        results = []
        for item in self.data:
            sim = cosine_similarity(query_embedding, item["embedding"])
            # Convert similarity to a distance-like metric (0 is best, 2 is worst)
            distance = 1.0 - sim
            results.append({
                "metadata": item["metadata"],
                "distance": distance
            })
            
        # Sort by distance ascending (lowest is best)
        results.sort(key=lambda x: x["distance"])
        return results[:k]

    def save(self):
        with open(self.data_path, "w") as f:
            json.dump(self.data, f)
