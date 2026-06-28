from app.config.constants import REWARD_KEYWORDS, REWARD_PERCENTAGE

def calculate_projected_savings(raw_message: str, amount: float, transaction_type: str) -> float:
    """
    Calculates the projected savings/cashback amount (5% by default) for outbound (debit)
    transactions containing cashback/reward partner keywords.
    """
    # Only outbound (debit) transactions are eligible for cashback savings
    if transaction_type != "debit":
        return 0.0

    msg_lower = raw_message.lower()
    
    # Check if transaction message matches any of the configured reward partner keywords
    for keyword in REWARD_KEYWORDS:
        if keyword in msg_lower:
            # Round calculations to two decimal places
            return round(amount * REWARD_PERCENTAGE, 2)

    return 0.0
