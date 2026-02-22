import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")

headers = {
    "Authorization": f"Bearer {api_key}",
    "HTTP-Referer": "http://localhost:8022",
    "Content-Type": "application/json"
}

payload = {
    "model": "openrouter/auto",
    "messages": [
        {"role": "user", "content": "What is the capital of France?"}
    ]
}

response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
print("Status Code:", response.status_code)
print("Response:", response.text)
