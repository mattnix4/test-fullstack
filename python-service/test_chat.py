import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_valid_question():
    payload = {"message": "Qu'est-ce que l'EBITDA ?"}
    response = client.post("/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data
    assert isinstance(data["sources"], list)
    assert len(data["sources"]) > 0 or data["answer"].startswith("Je ne sais pas") is False

def test_chat_unknown_question():
    payload = {"message": "Question totalement inconnue"}
    response = client.post("/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["answer"].startswith("Je ne sais pas")
    assert data["sources"] == []

def test_chat_empty_message():
    payload = {"message": ""}
    response = client.post("/chat", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "message required"
