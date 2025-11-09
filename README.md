# Halal Product Identifier

A modern web application that classifies food products as **halal**, **haram**, **doubtful**, or **unknown** by analysing product-label images. The system combines a FastAPI backend (Gemini OCR, YOLO logo detection, sentence-transformer embeddings) with a React + Tailwind CSS frontend for a polished multi-page experience.

## Project structure

```
.
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── config.py         # Settings and path configuration
│   │   ├── main.py           # FastAPI entrypoint
│   │   ├── routers/          # API routers (analysis, chatbot)
│   │   ├── schemas/          # Pydantic response models
│   │   └── services/         # OCR, knowledge base, analysis logic
│   └── requirements.txt
├── frontend/                 # React + Vite + Tailwind client
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── api/              # Axios client helpers
│   │   ├── components/       # Header, footer, shared UI
│   │   ├── layouts/          # App layout with shared chrome
│   │   └── pages/            # Home, Upload, Chatbot, Guide
├── HalalKB/                  # Pre-computed KB artefacts (pickle + torch tensor)
├── HalalLogoDetector/        # YOLO weights directory (best.pt expected under train_run_1/weights)
├── CV2.ipynb                 # Original Colab pipeline (reference)
└── apikey.py                 # Local development Gemini API key (do not commit)
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- A Google Gemini API key (place it in `.env` or `apikey.py`)
- Knowledge base artefacts (`HalalKB/kb_dataframe.pkl` and `HalalKB/kb_embeddings.pt`)
- Optional: YOLOv8 halal logo weights at `HalalLogoDetector/train_run_1/weights/best.pt`

## Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows PowerShell
pip install -r requirements.txt
```

Create a `.env` file (at the repository root) with:

```
HALAL_GEMINI_API_KEY=your-gemini-api-key
HALAL_SEMANTIC_THRESHOLD=0.70  # optional tweak
```

> 💡 During local development you can skip the `.env` file if `apikey.py` contains `GEMINI_API_KEY`. Production systems should rely on environment variables instead.

Start the API:

```bash
uvicorn app.main:app --reload --app-dir backend
```

Endpoints:

- `POST /api/analyze` – multipart image upload, returns halal verdict plus parsed ingredients.
- `POST /api/chat` – ask questions about ingredients or E-codes, returns top semantic matches.
- `GET /healthz` – simple health check.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Configure the backend URL (if different from `http://localhost:8000`) by setting `VITE_API_BASE_URL` in `frontend/.env`.

The site provides:

- **Home** – marketing/overview section with CTA.
- **Upload** – image upload workflow with result cards.
- **Chatbot** – Q&A interface powered by the knowledge base embeddings.
- **User Guide** – step-by-step instructions with screenshot placeholders.

## Tips

- Keep the knowledge-base files on a fast disk for quicker startup; they load once on API boot.
- If the YOLO weights are missing, the pipeline gracefully falls back to OCR + semantic analysis.
- Tailor the `User Guide` page by swapping the placeholder blocks with real screenshots.
- The chatbot endpoint surfaces the top matches; you can adjust `HALAL_TOP_K_CHAT_RESULTS` in `.env`.

## Future enhancements

- Persist user sessions and history.
- Add localisation and AR/UR translations.
- Capture feedback to refine the knowledge base over time.

Enjoy building with the Halal Product Identifier! 🕌


