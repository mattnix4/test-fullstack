# Fullstack React + Python (MVP)

## Structure

-   `/frontend` --- Next.js application (pages router) + API
    routes
-   `/python-service` --- FastAPI chatbot (FAQ)

------------------------------------------------------------------------

## Prérequis

-   **Node.js 20+** et **npm**
-   **Python 3.10+** et **pip**

------------------------------------------------------------------------

## Configuration des environnements

### Frontend (`.env.local`)

``` env
# URL du backend Python
NEXT_PUBLIC_CHAT_URL=http://localhost:8001/chat
```

### Backend (`.env`)

``` env
# URLs autorisées par CORS (séparées par des virgules)
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Fichier de logs
LOG_FILE=chatbot.log
```

------------------------------------------------------------------------

## Lancer le frontend

``` bash
cd frontend
npm install
npm run dev
```

📍 **Page principale :** <http://localhost:3000/articles>

------------------------------------------------------------------------

## Lancer le micro-service Python

``` bash
cd python-service
python -m venv .venv
source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

------------------------------------------------------------------------

## Endpoints principaux

-   **Frontend API (Next.js)**

    ``` http
    GET /api/articles?query=&sort=asc|desc
    ```

-   **Backend Python (FastAPI chatbot)**

    ``` http
    POST http://localhost:8001/chat
    body: { "message": "..." }
    ```

------------------------------------------------------------------------

## Données fournies

-   `frontend/public/articles.json` : articles\
-   `python-service/faq.json` : Q/A

------------------------------------------------------------------------

## Tests

### Backend (Python)

``` bash
cd python-service
pytest -v
```

------------------------------------------------------------------------

## Logs

Le micro-service Python écrit les interactions dans `chatbot.log`.

------------------------------------------------------------------------

## Choix techniques & limites

-   **Frontend :**
    -   Next.js (Pages Router) pour simplicité
    -   Validation d'input avec **zod**
    -   Données mockées en JSON (option Prisma + SQLite possible)
-   **Backend (Chatbot) :**
    -   FastAPI + matching simple (**difflib** + recherche mots-clés)
    -   Pas de ML lourde (contrainte de temps)
    -   Middleware CORS configurable via `.env`

------------------------------------------------------------------------

## Améliorations possibles

-   Utiliser **Prisma + SQLite** pour persistance et seeding
-   Remplacer matching par **TF-IDF** ou embeddings
-   Ajouter authentification & rate limiting
-   Couvrir plus de **tests unitaires / e2e**
-   CI/CD, linting, auto-formatting

------------------------------------------------------------------------
