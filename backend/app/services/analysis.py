from __future__ import annotations

"""
Business logic for analysing product images and classifying halal status.
"""

from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional
import re

from ..config import Settings, get_settings
from .knowledge_base import KnowledgeBase, get_knowledge_base
from .logo_detector import get_logo_detector
from .ocr import extract_text_from_image

INGREDIENTS_BLOCK_RE = re.compile(r"ingredients.*?\.", re.IGNORECASE | re.DOTALL)


@dataclass
class AnalysisResult:
    logo_detected: bool
    ocr_text: str
    ingredients_block: Optional[str]
    ingredients: List[str]
    status: str
    score: float
    matched_text: str


def find_ingredients_block(full_text: str) -> Optional[str]:
    match = INGREDIENTS_BLOCK_RE.search(full_text)
    if match:
        return match.group(0).strip()
    return None


def parse_ingredients_list(block: str) -> List[str]:
    if not block:
        return []

    flat_text = block.replace("\n", " ")
    cleaned_text = re.sub(r"^ingredients.*?(?::|\))\s*", "", flat_text, flags=re.IGNORECASE | re.DOTALL)
    cleaned_text = cleaned_text.strip().removesuffix(".")

    ingredients: List[str] = []
    current = ""
    depth = 0
    for char in cleaned_text:
        if char == "(":
            depth += 1
        elif char == ")":
            depth = max(0, depth - 1)

        if char == "," and depth == 0:
            ingredients.append(current.strip())
            current = ""
        else:
            current += char

    if current.strip():
        ingredients.append(current.strip())

    return [item for item in ingredients if item]


def analyse_image(
    image_path: Path,
    *,
    settings: Settings | None = None,
    knowledge_base: KnowledgeBase | None = None,
    confidence_threshold: float = 0.5,
) -> AnalysisResult:
    settings = settings or get_settings()
    knowledge_base = knowledge_base or get_knowledge_base()

    detector = get_logo_detector()
    logo_detected = detector.detect(image_path, confidence_threshold=confidence_threshold)

    if logo_detected:
        return AnalysisResult(
            logo_detected=True,
            ocr_text="",
            ingredients_block=None,
            ingredients=[],
            status="halal",
            score=1.0,
            matched_text="Certified halal logo detected.",
        )

    ocr_text = extract_text_from_image(image_path, settings=settings)
    ingredients_block = find_ingredients_block(ocr_text)
    if not ingredients_block:
        raise ValueError("Unable to locate an 'Ingredients' block in the extracted text.")

    ingredients = parse_ingredients_list(ingredients_block)
    if not ingredients:
        raise ValueError("Failed to parse ingredients from the detected block.")

    match = knowledge_base.classify_ingredient_list(ingredients, semantic_threshold=settings.semantic_threshold)

    return AnalysisResult(
        logo_detected=False,
        ocr_text=ocr_text,
        ingredients_block=ingredients_block,
        ingredients=ingredients,
        status=match.status,
        score=match.score,
        matched_text=match.matched_text,
    )


__all__ = ["AnalysisResult", "analyse_image", "find_ingredients_block", "parse_ingredients_list"]


