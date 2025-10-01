from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="FAQ Chatbot")

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
    
    return {"answer": "Hello", "sources": "test"}
