class APIException(Exception):
    """Base exception class for application-specific errors."""
    def __init__(self, status_code: int, message: str, detail: dict = None):
        self.status_code = status_code
        self.message = message
        self.detail = detail or {}
        super().__init__(self.message)


class TransactionNotFoundException(APIException):
    """Exception raised when a requested transaction does not exist."""
    def __init__(self, transaction_id: int):
        super().__init__(
            status_code=404,
            message=f"Transaction with ID {transaction_id} not found."
        )


class InvalidTransactionDataException(APIException):
    """Exception raised when raw message parsing or validation fails."""
    def __init__(self, message: str, detail: dict = None):
        super().__init__(
            status_code=400,
            message=message,
            detail=detail
        )
