from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

import shutil
import os

from pdf_reader import read_pdf
from chunker import create_chunks
from vector_store import store_chunks
from generator import (
    answer_question,
    generate_summary,
    generate_quiz
)

app = FastAPI()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@app.get("/")
def home():

    return {
        "message": "Study Assistant Running"
    }


@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    text = read_pdf(file_path)

    chunks = create_chunks(text)

    store_chunks(chunks)

    return {
        "message": "PDF Uploaded Successfully"
    }


@app.post("/chat")
async def chat(data: dict):

    question = data["question"]

    answer = answer_question(
        question
    )

    return {
        "answer": answer
    }


@app.get("/summary")
async def summary():

    summary_text = generate_summary()

    return {
        "summary": summary_text
    }


@app.get("/quiz")
def quiz():

    return {
        "questions": generate_quiz()
    }