# FAQ Chatbot - Fullstack Project

Ce projet est un microservice FastAPI qui simule un chatbot FAQ.
Il propose un endpoint `/chat` capable de répondre à des questions simples à partir d'une base locale (`faq.json`).
Le service inclut un logging console + fichier et est testable avec `pytest`.

---

## Structure du projet

```
python-service/
├─ main.py              # microservice FastAPI
├─ faq.json             # base de questions-réponses
├─ chatbot.log          # fichier de logs (généré automatiquement)
├─ test_chat.py         # tests unitaires
├─ requirements.txt     # dépendances Python
```

---

## Prérequis

* Python 3.10+
* pip
* Virtualenv recommandé pour isoler l'environnement

---

## Installation

1️⃣ Créer et activer un environnement virtuel :

**Windows :**

```bash
python -m venv venv
.\venv\Scripts\activate
```

**Linux / macOS :**

```bash
python3 -m venv venv
source venv/bin/activate
```

2️⃣ Installer les dépendances :

```bash
pip install -r requirements.txt
```

ou manuellement :

```bash
pip install fastapi uvicorn pydantic httpx pytest
```

---

## Lancer le microservice

```bash
uvicorn main:app --reload --port 8001
```

* L'API sera disponible sur : `http://127.0.0.1:8001/chat`
* Méthode : POST
* Payload JSON attendu :

```json
{
  "message": "Votre question ici"
}
```

* Réponse JSON :

```json
{
  "answer": "Réponse du chatbot",
  "sources": ["faq#id"]
}
```

---

## Logging

* Les logs apparaissent dans la console **et** dans `chatbot.log`
* Format : `[YYYY-MM-DD HH:MM:SS] LEVEL - q: ... -> a: ... (score=...)`

Exemple de log :

```
[2025-10-01 10:15:33] INFO - q: Qu'est-ce que l'EBITDA ? -> a: L'EBITDA est un indicateur... (score=0.920)
```

---

## Tests

* Les tests utilisent `pytest` et `fastapi.testclient`
* Pour exécuter les tests :

```bash
pytest test_chat.py -v
```

* Tests inclus :

  * Question connue → réponse avec `sources`
  * Question inconnue → message humain « Je ne sais pas cette fois… »
  * Message vide → HTTP 400 avec `detail="message required"`

---

## FAQ / Limitations

* Base de données locale (`faq.json`) → pas de persistance dynamique
* Matching simple par similarité + mot-clé
* Message humain si aucune réponse trouvée

---

## Améliorations possibles

* Utiliser TF-IDF ou embedding pour un meilleur matching
* Historique des questions/réponses stocké en DB
* Rotation automatique des logs (logging.handlers.RotatingFileHandler)
