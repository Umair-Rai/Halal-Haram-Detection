from __future__ import annotations

from pathlib import Path
import shutil
import tempfile

from fastapi import APIRouter, File, HTTPException, UploadFile

from ..schemas.analysis import AnalysisResultSchema
from ..services.analysis import analyse_image

router = APIRouter(prefix="/api", tags=["analysis"])


@router.post("/analyze", response_model=AnalysisResultSchema)
async def analyze_product(
    file: UploadFile = File(..., description="Product label image to analyse."),
    confidence_threshold: float = 0.5,
) -> AnalysisResultSchema:
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required.")
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image uploads are supported.")

    suffix = Path(file.filename).suffix or ".png"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        temp_path = Path(tmp.name)
        try:
            shutil.copyfileobj(file.file, tmp)
        finally:
            file.file.close()

    try:
        result = analyse_image(temp_path, confidence_threshold=confidence_threshold)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        try:
            temp_path.unlink(missing_ok=True)
        except Exception:  # noqa: BLE001
            pass

    return AnalysisResultSchema(
        logo_detected=result.logo_detected,
        status=result.status,
        score=result.score,
        matched_text=result.matched_text,
        ingredients=result.ingredients,
        ingredients_block=result.ingredients_block,
        ocr_text=result.ocr_text or None,
    )


__all__ = ["router"]


