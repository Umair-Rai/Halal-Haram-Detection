from __future__ import annotations

"""
Halal logo detection using the trained YOLOv8 model.
"""

from pathlib import Path
from typing import Optional

import contextlib
import torch
from ultralytics import YOLO

from ..config import Settings, get_settings


class LogoDetector:
    """
    Thin wrapper around the Ultralytics YOLO model for halal logo detection.
    """

    def __init__(self, weights_path: Path, settings: Settings | None = None) -> None:
        self.settings = settings or get_settings()
        self.weights_path = weights_path
        self._model: Optional[YOLO] = None

        if self.weights_path.exists():
            with _force_weights_only_false():
                self._model = YOLO(str(self.weights_path))

    @property
    def available(self) -> bool:
        return self._model is not None

    def detect(self, image_path: Path, confidence_threshold: float = 0.5) -> bool:
        """
        Return True when a halal logo is detected with confidence above the threshold.
        """

        if not self.available:
            return False

        results = self._model(image_path, verbose=False)  # type: ignore[operator]
        if not results:
            return False

        result = results[0]
        if not getattr(result, "boxes", None):
            return False

        for box in result.boxes:
            score = float(box.conf[0])
            if score >= confidence_threshold:
                return True
        return False


_detector: Optional[LogoDetector] = None


def get_logo_detector() -> LogoDetector:
    global _detector
    if _detector is None:
        settings = get_settings()
        _detector = LogoDetector(settings.yolo_weights_path, settings=settings)
    return _detector


@contextlib.contextmanager
def _force_weights_only_false():
    original_load = torch.load

    def custom_load(*args, **kwargs):
        kwargs["weights_only"] = False
        return original_load(*args, **kwargs)

    torch.load = custom_load
    try:
        yield
    finally:
        torch.load = original_load


__all__ = ["LogoDetector", "get_logo_detector"]


