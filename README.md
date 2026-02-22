# AI-Powered Portfolio & Resume Chat

This project is a modern, full-stack Personal Portfolio featuring a Retrieval-Augmented Generation (RAG) AI Chatbot. Users can ask questions about the developer's experience, skills, and background, and the AI will answer accurately based strictly on the provided Resume PDF.

## 🚀 Features
- **Frontend**: A stunning, interactive React/Vite UI with Particle backgrounds, smooth animations, and a real-time Chat interface.
- **Backend RAG AI**: A lightweight FastAPI backend that natively processes PDFs, generates semantic embeddings, and stores them in a lightning-fast custom JSON Vector Store.
- **Hallucination-Free**: The OpenRouter AI engine is strictly prompted to only answer based on the resume. If the information is not in the resume, it confidently states: *"Not mentioned in the resume."*
- **Portable & Cross-Platform**: By utilizing `pypdf` and a custom math-based Cosine-Similarity Vector Search, the backend avoids heavy C++ compiled dependencies (like FAISS and SentenceTransformers), making it incredibly easy to install on any OS seamlessly.

## 📦 Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui.
- **Backend**: Python 3+, FastAPI, Uvicorn.
- **AI / ML**: OpenRouter API, HuggingFace Inference API (Embeddings), Custom Vector Database (`faiss_store.py`).

---

## 🛠️ Setup & Installation

### 1. Requirements
- Node.js (v18+)
- Python (v3.9+)

### 2. Backend Setup
1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Virtual Environment:
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Setup Environment Variables:
   - Create a file named `.env` inside the `backend/` directory based on `.env.example`.
   - Add your [OpenRouter API Key](https://openrouter.ai/):
     ```env
     OPENROUTER_API_KEY=your_api_key_here
     PORT=8022
     ```
5. Run the Ingestion Script (Replace with your actual resume PDF):
   ```bash
   python test_ingest.py "path/to/your/resume.pdf"
   ```
6. Start the Backend Server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8022 --reload
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install NodeJS dependencies:
   ```bash
   npm install
   ```
3. Start the Development Server:
   ```bash
   npm run dev
   ```

You can now visit your beautiful AI Resume Portfolio in your browser!
