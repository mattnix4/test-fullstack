from difflib import SequenceMatcher
import json
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="FAQ Chatbot")


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
        simi = similarity(q, item["q"])
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
        
    return {"answer": answer, "sources": sources}
