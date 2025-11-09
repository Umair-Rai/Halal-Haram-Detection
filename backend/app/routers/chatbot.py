from __future__ import annotations

from fastapi import APIRouter, HTTPException

from ..schemas.analysis import ChatRequest, ChatResponseSchema, ChatResultSchema
from ..services.chatbot import answer_question

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponseSchema)
async def chat_with_kb(payload: ChatRequest) -> ChatResponseSchema:
    if not payload.question.strip():
        raise HTTPException(status_code=400, detail="Question must not be empty.")

    response = answer_question(payload.question)
    return ChatResponseSchema(
        question=response.query,
        results=[
            ChatResultSchema(score=result.score, status=result.status, matched_text=result.matched_text)
            for result in response.results
        ],
    )


__all__ = ["router"]


