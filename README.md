# Test Technique — Fullstack React + Python (MVP)

## Structure
- `/frontend` — Next.js application (pages router) + API routes
- `/python-service` — FastAPI chatbot (FAQ)

## Prérequis
- Node.js 20+ et npm
- Python 3.10+ et pip

## Lancer le frontend

```bash
cd frontend/test-taram
npm install
npm run dev
```

# Page principale: http://localhost:3000/articles

Lancer le micro-service Python

```bash
cd python-service
python -m venv .venv
source .venv/bin/activate    # windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

Endpoints principaux
```bash
    GET /api/articles?query=&sort=asc|desc (Next.js API)

    POST http://localhost:8001/chat body: { "message": "..." }
```

Données fournies

```bash
    frontend/data/articles.json : seed 10-20 articles

    python-service/faq.json : 10-15 Q/A
```

Tests

```bash
    Python : pytest dans /python-service

    Frontend : tests unitaires : npm run test.
```

Choix techniques & limites

    Frontend : Next.js pages router pour simplicite, zod pour validation d'input à l'API route. Données stockée en JSON pour rapidité d'itération (option Prisma + SQLite possible).

    Chatbot : FastAPI + matching simple (difflib + keyword). Pas de ML lourde ni d'index inversé (temps limité). Logs minimal sur la console.

    Améliorations possibles :

        Utiliser Prisma + SQLite pour persistance et seed.

        Remplacer matching par TF-IDF ou un petit embedding local.

        Ajouter authentification / rate limiting.

        Tests étendus (coverage), CI, formatting, linting.
