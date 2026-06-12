import json

from vector_store import search_chunks
from gemini_config import chat_model


def answer_question(question):

    context = search_chunks(question)

    context_text = "\n".join(context)

    prompt = f"""
You are a study assistant.

Use ONLY the provided context.

Context:
{context_text}

Question:
{question}

Answer:
"""

    response = chat_model.generate_content(
        prompt
    )

    return response.text


def generate_summary():

    context = search_chunks(
        "summary"
    )

    context_text = "\n".join(context)

    prompt = f"""
Create concise study notes.

Context:

{context_text}
"""

    response = chat_model.generate_content(
        prompt
    )

    return response.text


def generate_quiz():

    context = search_chunks(
        "main topics"
    )

    context_text = "\n".join(context)

    prompt = f"""
Generate exactly 10 MCQs.

Return ONLY valid JSON.

Format:

[
  {{
    "question":"...",
    "options":[
      "...",
      "...",
      "...",
      "..."
    ],
    "answer":"..."
  }}
]

Context:

{context_text}
"""

    response = chat_model.generate_content(
        prompt
    )

    content = response.text

    content = content.replace(
        "```json",
        ""
    )

    content = content.replace(
        "```",
        ""
    )

    content = content.strip()

    try:
        return json.loads(content)

    except Exception as e:

        print(
            "QUIZ JSON ERROR:",
            e
        )

        print(content)

        return []