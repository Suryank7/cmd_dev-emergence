import requests
import sys
import os

def ingest_pdf(pdf_path: str):
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return

    url = "http://localhost:8022/api/ingest-resume"
    
    with open(pdf_path, "rb") as f:
        files = {"file": (os.path.basename(pdf_path), f, "application/pdf")}
        print(f"Uploading {pdf_path} to {url}...")
        
        try:
            response = requests.post(url, files=files)
            response.raise_for_status()
            print("Success!")
            print(response.json())
        except requests.exceptions.HTTPError as e:
            print(f"HTTP Error: {e}")
            print(e.response.text)
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_ingest.py <path_to_pdf>")
    else:
        ingest_pdf(sys.argv[1])
