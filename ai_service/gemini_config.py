import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv(
    "GEMINI_API_KEY"
)

print("API KEY FOUND:", bool(api_key))

genai.configure(
    api_key=api_key
)

chat_model = genai.GenerativeModel(
    "gemini-2.5-flash"
)