# Business logic and parsing configuration constants

# Default categories supported by the application
DEFAULT_CATEGORIES = ["Food", "Travel", "Salary", "Miscellaneous"]
FALLBACK_CATEGORY = "Miscellaneous"

# Keyword mappings from merchants to their appropriate category (Case-insensitive matching)
MERCHANT_CATEGORY_MAPPINGS = {
    "zomato": "Food",
    "swiggy": "Food",
    "uber": "Travel",
    "ola": "Travel",
    "rapido": "Travel",
    "metro": "Travel",
    "railway": "Travel",
    "irctc": "Travel",
    "fuel": "Travel",
    "petrol": "Travel",
    "company": "Salary",
    "employer": "Salary",
    "salary": "Salary",
    "payroll": "Salary",
    "refund": "Salary",
}

# Keywords that qualify a transaction for projected savings/rewards
REWARD_KEYWORDS = [
    "cashback",
    "reward",
    "amazon pay",
    "paytm rewards",
    "gpay rewards"
]

# Reward rate (5%)
REWARD_PERCENTAGE = 0.05
