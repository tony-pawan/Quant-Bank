import re

def parse_message(message: str) -> dict:
    """
    Parses unstructured raw bank/UPI transaction alerts.
    Extracts transaction amount, type, and merchant name.
    """
    msg_lower = message.lower()
    
    # 1. Extract Amount
    # Matches: Rs.250, Rs 250, INR 500, ₹15,000.50, etc.
    amount_match = re.search(r"(?:rs\.?|inr|₹)\s*([\d,]+(?:\.\d{1,2})?)", message, re.IGNORECASE)
    amount = 0.0
    if amount_match:
        amount_str = amount_match.group(1).replace(",", "")
        try:
            amount = float(amount_str)
        except ValueError:
            pass

    # 2. Determine Transaction Type
    # Look for keywords signifying a credit or deposit. Default is debit.
    credit_indicators = ["credited", "received", "credit", "refund"]
    transaction_type = "debit"
    for indicator in credit_indicators:
        if indicator in msg_lower:
            transaction_type = "credit"
            break

    # 3. Extract Merchant
    # Find prepositions like 'to', 'at', 'from' to detect the counterparty.
    merchant = "Miscellaneous"
    merchant_match = re.search(r"\b(to|at|from)\s+([^,\n\.]+)", message, re.IGNORECASE)
    if merchant_match:
        raw_merchant = merchant_match.group(2).strip()
        # Clean up by removing common trailing words (e.g. "via UPI", "Cashback Offer")
        clean_merchant = re.split(
            r"\s+(via|cashback|offer|credit|debit|on|using|for|txn)\b", 
            raw_merchant, 
            flags=re.IGNORECASE
        )[0]
        merchant = clean_merchant.strip()
    else:
        # Fallback values if counterparty preposition is not present
        if transaction_type == "credit":
            merchant = "Deposit / Transfer"
        else:
            merchant = "Debit / Expense"

    return {
        "amount": amount,
        "transaction_type": transaction_type,
        "merchant": merchant
    }
