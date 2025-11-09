from __future__ import annotations

"""
Gemini-based OCR utilities.
"""

from pathlib import Path
from typing import Optional

from PIL import Image
import google.generativeai as genai

from ..config import Settings, get_settings

GEMINI_MODEL_NAME = "models/gemini-2.5-flash"

_gemini_model: Optional[genai.GenerativeModel] = None
_configured_api_key: Optional[str] = None


def _get_model(settings: Settings) -> genai.GenerativeModel:
    global _gemini_model, _configured_api_key
    if not settings.gemini_api_key:
        raise RuntimeError(
            "Gemini API key is not configured. Set HALAL_GEMINI_API_KEY or provide apikey.py."
        )
    if _gemini_model is None or settings.gemini_api_key != _configured_api_key:
        genai.configure(api_key=settings.gemini_api_key)
        _gemini_model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        _configured_api_key = settings.gemini_api_key
    return _gemini_model


def extract_text_from_image(image_path: Path, prompt: Optional[str] = None, settings: Settings | None = None) -> str:
    """
    Run OCR over ``image_path`` using Google Gemini.
    """

    settings = settings or get_settings()
    prompt = prompt or "Extract all text from this image exactly as it appears. Preserve line breaks and formatting."

    if not image_path.exists():
        raise FileNotFoundError(f"Image path '{image_path}' does not exist.")

    model = _get_model(settings)
    image = Image.open(image_path)

    response = model.generate_content([prompt, image])
    if not response or not getattr(response, "text", "").strip():
        raise RuntimeError("No text returned by Gemini OCR.")
    return response.text.strip()


__all__ = ["extract_text_from_image", "GEMINI_MODEL_NAME"]


