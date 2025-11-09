from __future__ import annotations

"""
Application configuration helpers.
"""

from functools import lru_cache
from pathlib import Path
from typing import Optional

from pydantic import Field, validator
from pydantic_settings import BaseSettings

BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent
REPO_ROOT = PROJECT_ROOT.parent


def _load_api_key_from_module() -> Optional[str]:
    """
    Attempt to read the Gemini API key from the top-level ``apikey.py`` file.

    The file is provided in this repository for local development convenience.
    """
    try:
        import importlib.util
        import sys

        apikey_path = REPO_ROOT / "apikey.py"
        if not apikey_path.exists():
            return None

        spec = importlib.util.spec_from_file_location("apikey", apikey_path)
        if spec is None or spec.loader is None:
            return None

        module = importlib.util.module_from_spec(spec)
        sys.modules["apikey"] = module
        spec.loader.exec_module(module)  # type: ignore[assignment]
        return getattr(module, "GEMINI_API_KEY", None)
    except Exception:
        return None


class Settings(BaseSettings):
    """
    Global application settings sourced from environment variables (with sensible defaults).
    """

    gemini_api_key: str = Field(default_factory=lambda: _load_api_key_from_module() or "")
    kb_dataframe_path: Path = Field(
        default=REPO_ROOT / "HalalKB" / "kb_dataframe.pkl",
        description="Path to the pickled knowledge base DataFrame.",
    )
    kb_embeddings_path: Path = Field(
        default=REPO_ROOT / "HalalKB" / "kb_embeddings.pt",
        description="Path to the knowledge base sentence-transformer embeddings (torch tensor).",
    )
    yolo_weights_path: Path = Field(
        default=REPO_ROOT / "HalalLogoDetector" / "train_run_1" / "weights" / "best.pt",
        description="Path to the trained Halal logo detector weights.",
    )
    semantic_threshold: float = Field(
        default=0.70,
        ge=0.0,
        le=1.0,
        description="Cosine similarity threshold used to accept a KB match as authoritative.",
    )
    top_k_chat_results: int = Field(
        default=5, ge=1, description="Number of KB entries to surface for chatbot questions."
    )

    class Config:
        env_file = ".env"
        env_prefix = "HALAL_"
        case_sensitive = False

    @validator("kb_dataframe_path", "kb_embeddings_path", "yolo_weights_path")
    def _expand_path(cls, value: Path) -> Path:  # noqa: N805
        return value.expanduser().resolve()


@lru_cache()
def get_settings() -> Settings:
    """
    Cached accessor for application settings.
    """

    return Settings(_env_file=REPO_ROOT / ".env", _env_file_encoding="utf-8")


__all__ = ["Settings", "get_settings"]


