from __future__ import annotations

"""
Knowledge base loader and semantic search utilities.
"""

import re
from dataclasses import dataclass
from typing import Iterable, List, Tuple

import numpy as np
import pandas as pd
import torch
from sentence_transformers import SentenceTransformer, util

from ..config import Settings, get_settings

PARENS_RE = re.compile(r"\([^)]*\)")
BRACKETS_RE = re.compile(r"\[[^\]]*\]")
EXTRA_SPACES_RE = re.compile(r"\s+")

EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def normalize_text_for_matching(text: str) -> str:
    """
    Normalise text for semantic matching (mirrors the notebook implementation).
    """

    if not isinstance(text, str):
        return ""
    text = text.strip().lower()
    text = PARENS_RE.sub(" ", text)
    text = BRACKETS_RE.sub(" ", text)
    text = text.replace("*", " ")
    text = re.sub(r"[®™.,:;!?]", " ", text)
    text = text.replace("&", " and ")
    text = EXTRA_SPACES_RE.sub(" ", text)
    return text.strip()


@dataclass
class SemanticMatchResult:
    score: float
    status: str
    matched_text: str


class KnowledgeBase:
    """
    In-memory representation of the phrase knowledge base plus embedding model.
    """

    def __init__(self, settings: Settings | None = None) -> None:
        self.settings = settings or get_settings()
        self._embedder = SentenceTransformer(EMBEDDING_MODEL_NAME)
        self._kb_df = pd.read_pickle(self.settings.kb_dataframe_path)
        embeddings = torch.load(self.settings.kb_embeddings_path, map_location="cpu")
        if isinstance(embeddings, (list, tuple)):
            embeddings = torch.stack(list(embeddings))
        self._kb_embeddings = embeddings

        if "norm_text" not in self._kb_df.columns:
            raise ValueError(
                "Knowledge base DataFrame is missing 'norm_text'. "
                "Ensure it matches the exported format from CV2.ipynb."
            )

    @property
    def data_frame(self) -> pd.DataFrame:
        return self._kb_df

    def _encode(self, text: str) -> torch.Tensor:
        return self._embedder.encode([text], convert_to_tensor=True, normalize_embeddings=True)

    def classify_ingredient_list(
        self,
        ingredients: Iterable[str],
        semantic_threshold: float | None = None,
    ) -> SemanticMatchResult:
        """
        Given an iterable of ingredients, return the best semantic match from the KB.
        """

        semantic_threshold = (
            semantic_threshold if semantic_threshold is not None else self.settings.semantic_threshold
        )

        ingredients = [ing for ing in ingredients if ing]
        if not ingredients:
            raise ValueError("Ingredient list is empty.")

        query_text = " ".join(ingredients)
        normalized_query = normalize_text_for_matching(query_text)
        if not normalized_query:
            raise ValueError("Failed to normalise ingredient list for matching.")

        query_embedding = self._encode(normalized_query)
        cos_scores = util.cos_sim(query_embedding, self._kb_embeddings)[0]
        scores_np = cos_scores.cpu().numpy()
        best_index = int(np.argmax(scores_np))
        best_score = float(scores_np[best_index])

        matched_row = self._kb_df.iloc[best_index]
        matched_text = str(matched_row.get("original_text", ""))
        status = str(matched_row.get("status", "unknown"))

        if best_score < semantic_threshold:
            status = "doubtful"

        return SemanticMatchResult(
            score=best_score,
            status=status,
            matched_text=matched_text,
        )

    def search_similar(self, query: str, top_k: int | None = None) -> List[SemanticMatchResult]:
        """
        Return the top-k KB entries that semantically match the query string.
        """

        top_k = top_k or self.settings.top_k_chat_results
        normalized_query = normalize_text_for_matching(query)
        if not normalized_query:
            return []

        query_embedding = self._encode(normalized_query)
        cos_scores = util.cos_sim(query_embedding, self._kb_embeddings)[0]
        score_indices: List[Tuple[float, int]] = [
            (float(score), int(idx)) for idx, score in enumerate(cos_scores.cpu().numpy())
        ]
        score_indices.sort(key=lambda item: item[0], reverse=True)
        top_k = min(top_k, len(score_indices))

        results: List[SemanticMatchResult] = []
        for score, index in score_indices[:top_k]:
            row = self._kb_df.iloc[index]
            results.append(
                SemanticMatchResult(
                    score=score,
                    status=str(row.get("status", "unknown")),
                    matched_text=str(row.get("original_text", "")),
                )
            )
        return results


_kb_instance: KnowledgeBase | None = None


def get_knowledge_base() -> KnowledgeBase:
    global _kb_instance
    if _kb_instance is None:
        _kb_instance = KnowledgeBase()
    return _kb_instance


__all__ = [
    "KnowledgeBase",
    "SemanticMatchResult",
    "get_knowledge_base",
    "normalize_text_for_matching",
]


