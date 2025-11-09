from __future__ import annotations

"""
Simple chatbot utilities leveraging the knowledge base embeddings.
"""

from dataclasses import dataclass
from typing import List

from ..config import Settings, get_settings
from .knowledge_base import SemanticMatchResult, get_knowledge_base


@dataclass
class ChatResponse:
    query: str
    results: List[SemanticMatchResult]


def answer_question(question: str, settings: Settings | None = None) -> ChatResponse:
    settings = settings or get_settings()
    kb = get_knowledge_base()
    matches = kb.search_similar(question, top_k=settings.top_k_chat_results)
    return ChatResponse(query=question, results=matches)


__all__ = ["answer_question", "ChatResponse"]


