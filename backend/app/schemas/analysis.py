from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, Field


class AnalysisResultSchema(BaseModel):
    logo_detected: bool = Field(
        ..., description="True when the halal logo was detected and the product is automatically halal."
    )
    status: str = Field(..., description="Final halal classification (halal, haram, doubtful, unknown).")
    score: float = Field(..., ge=0.0, le=1.0, description="Cosine similarity score for the best KB match.")
    matched_text: str = Field(..., description="Original KB entry that matched the product ingredients.")
    ingredients: List[str] = Field(default_factory=list, description="Parsed ingredient list (if available).")
    ingredients_block: Optional[str] = Field(
        default=None, description="Raw ingredients block extracted from the OCR text."
    )
    ocr_text: Optional[str] = Field(default=None, description="Full OCR transcript of the label (if collected).")


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, description="Ingredient or E-code question to ask the knowledge base.")


class ChatResultSchema(BaseModel):
    score: float = Field(..., ge=0.0, le=1.0)
    status: str
    matched_text: str


class ChatResponseSchema(BaseModel):
    question: str
    results: List[ChatResultSchema]


__all__ = [
    "AnalysisResultSchema",
    "ChatRequest",
    "ChatResponseSchema",
    "ChatResultSchema",
]


