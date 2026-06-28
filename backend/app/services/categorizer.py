from app.config.constants import MERCHANT_CATEGORY_MAPPINGS, FALLBACK_CATEGORY

def categorize_merchant(merchant: str) -> str:
    """
    Looks up the merchant name against the business constants configuration to resolve a category.
    Defaults to FALLBACK_CATEGORY (Miscellaneous) if no match is found.
    """
    if not merchant:
        return FALLBACK_CATEGORY
        
    merchant_lower = merchant.lower()
    
    # Iterate through constants config to search for keyword matches
    for keyword, category in MERCHANT_CATEGORY_MAPPINGS.items():
        if keyword in merchant_lower:
            return category
            
    return FALLBACK_CATEGORY
