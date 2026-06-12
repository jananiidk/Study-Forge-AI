# StudyForge AI

AI-powered study assistant that allows students to upload PDFs, generate summaries, ask questions, and create quizzes from study material.

## Features

* PDF Upload
* AI Summary Generation
* AI Question Answering
* MCQ Quiz Generation
* FastAPI AI Service
* Gemini AI Integration

## Tech Stack

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express

### AI Service

* FastAPI
* Gemini 2.5 Flash
* PyMuPDF

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd StudyAssistant
```

---

## AI Service Setup

```bash
cd ai_service

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside `ai_service`:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run:

```bash
uvicorn app:app --reload
```

Runs on:

```text
http://127.0.0.1:8000
```

---

## Backend Setup

Open a new terminal:

```bash
cd backend

npm install

node server.js
```

Runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

## Running the Application

Keep three terminals running:

### Terminal 1

```bash
cd ai_service
venv\Scripts\activate
uvicorn app:app --reload
```

### Terminal 2

```bash
cd backend
node server.js
```

### Terminal 3

```bash
cd frontend
npm run dev
```

---

## Usage

1. Open the frontend.
2. Upload a PDF document.
3. Generate a summary.
4. Ask questions about the uploaded document.
5. Generate MCQ quizzes for revision.

---

## Future Improvements

* Flashcards
* Progress Tracking
* User Authentication
* Cloud Deployment
* PDF Highlight References
* Multi-document Support
