from datetime import datetime
from difflib import SequenceMatcher
import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging

app = FastAPI(title="FAQ Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOG_FILE = os.path.join(os.path.dirname(__file__), "chatbot.log")

# CONFIG LOGGING
logger = logging.getLogger("chatbot")
logger.setLevel(logging.INFO)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

file_handler = logging.FileHandler(LOG_FILE, encoding="utf-8")
file_handler.setLevel(logging.INFO)

formatter = logging.Formatter(
    "[%(asctime)s] %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
)

console_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)

if not logger.handlers:
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)
    
DATA_PATH = os.path.join(os.path.dirname(__file__), "faq.json")
with open(DATA_PATH, "r", encoding="utf-8") as f:
    faq = json.load(f)

def similarity(a: str, b: str) -> float:
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()
class ChatIn(BaseModel):
    message: str

class ChatOut(BaseModel):
    answer: str
    sources: List[str] = []

@app.post("/chat", response_model=ChatOut)
def chat(payload: ChatIn):
    q = payload.message.strip()
    if not q:
        raise HTTPException(status_code=400, detail="message required") 
    
    best = None
    best_score = 0.0
    for item in faq:
        simi = 0.6 * similarity(q, item["q"])
        if any(tok in item["q"].lower() for tok in q.lower().split()):
            simi += 0.4
        if simi > best_score:
            best_score = simi
            best = item
    if best is None or best_score < 0.25:
        answer = "Je ne sais pas cette fois, mais n'hésitez pas à poser une autre question!"
        sources = []
    else:
        answer = best["a"]
        sources = [best.get("id", "faq#none")]
    
    time_log = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    logger.info(f"[{time_log}] q: {q} -> a: {answer[:80]} (score={best_score:.3f})")
    
    return {"answer": answer, "sources": sources}
