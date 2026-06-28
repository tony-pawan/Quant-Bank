from fastapi import Request
from fastapi.responses import JSONResponse
from app.utils.exceptions import APIException
import logging

logger = logging.getLogger(__name__)

async def api_exception_handler(request: Request, exc: APIException):
    """Graceful JSON handler for application-defined API exceptions."""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "status_code": exc.status_code,
            "message": exc.message,
            "detail": exc.detail
        }
    )

async def generic_exception_handler(request: Request, exc: Exception):
    """Graceful fallback handler for unhandled internal exceptions."""
    logger.exception("Unhandled error occurred during request processing")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "status_code": 500,
            "message": "An unexpected server error occurred.",
            "detail": {"error": str(exc)}
        }
    )
