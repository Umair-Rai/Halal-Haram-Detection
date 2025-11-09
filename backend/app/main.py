from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routers import analysis, chatbot
from .services.knowledge_base import get_knowledge_base
from .services.logo_detector import get_logo_detector

settings = get_settings()

app = FastAPI(
    title="Halal Product Identifier",
    description="API for analysing product labels and answering ingredient questions.",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):(5173|5174|5175)",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event() -> None:
    # Initialise heavy resources once.
    get_knowledge_base()
    get_logo_detector()


@app.get("/healthz", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(analysis.router)
app.include_router(chatbot.router)


__all__ = ["app"]


