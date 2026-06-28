# QuantBank

A production-style, interview-ready full-stack application built from scratch to parse raw, unstructured UPI and bank transaction alerts, automatically categorize expenditures, track projected savings/cashbacks, and present visual financial analytics in a modern dashboard interface.

---

## Technical Stack

### Backend
- **Core Framework**: FastAPI (Python) - High performance, automatic Swagger/OpenAPI docs, and rapid type-safe validation.
- **Database ORM**: SQLAlchemy 2.0 ORM - Clean OOP-to-relational schema mapping.
- **Database Engine**: SQLite - Persisted in-memory database file (`transactions.db`).
- **Object Serialization & Schema Validation**: Pydantic v2.
- **Environment Management**: Python-dotenv - Decoupling configurations.

### Frontend
- **Framework & Tooling**: React (JavaScript) + Vite (ultra-fast compilation and HMR).
- **Styling**: Tailwind CSS v3 - Modern, responsive CSS utilities.
- **Data Visualization**: Recharts - Dynamic SVG charts (Doughnut / Pie representations).
- **Network Client**: Axios - Structured AJAX queries with local server proxy configurations.
- **Iconography**: Lucide React - Sleek vector icons.

---

## System Architecture & Flow

```
   +-------------------------------------------------------------+
   |                  React Frontend (Vite)                      |
   +------------------------------+------------------------------+
                                  |
                                  |  Axios Requests (/api)
                                  v
   +-------------------------------------------------------------+
   |                    FastAPI Backend Router                   |
   +-----+------------------------+------------------------+-----+
         |                        |                        |
         | (POST alert)           | (CRUD queries)         | (GET metrics)
         v                        v                        v
   +------------+           +------------+           +------------+
   |   Parser   |           | SQLAlchemy |           | Analytics  |
   |   Engine   |           |  Session   |           |  Service   |
   +-----+------+           +-----+------+           +-----+------+
         |                        |                        |
         | (Extract details)      |                        | (Aggregates)
         v                        |                        v
   +------------+                 |                  +------------+
   | Categorize |                 |                  | Category % |
   | & Rewards  |                 |                  | & Totals   |
   +-----+------+                 |                  +------------+
         |                        |
         | (Assign schemas)       |
         v                        v
   +-------------------------------------------------------------+
   |                     SQLite Database                         |
   +-------------------------------------------------------------+
```

1. **Transaction Alert Simulation**: The user inserts raw SMS alerts (e.g. `"Paid Rs.250 to Zomato via UPI"`).
2. **Parser Service**: The backend runs regex rules to extract:
   - **Amount**: Normalizes currency formats (`Rs.`, `₹`, `INR`, `Rs`).
   - **Type**: Credit vs. Debit (via direction keywords like `credited`, `received`, `paid`, `txn of`).
   - **Merchant**: Counters matching prepositions (`to`, `at`, `from`).
3. **Categorization & Rewards Engines**: Resolves category using merchant keyword constants (e.g., `Zomato -> Food`, `Uber -> Travel`) and evaluates reward yields (5% for configured reward partners containing `cashback`, `amazon pay`, etc.).
4. **Data Aggregates**: SQLite commits changes, and the dashboard automatically pulls fresh analytics aggregates to draw metrics charts.

---

## Directory Layout

```
backend/
├── app/
│   ├── config/
│   │   ├── constants.py       # Configurable business variables (merchants, rewards, percentages)
│   │   └── __init__.py
│   ├── models/
│   │   ├── transaction.py  # SQLAlchemy Transaction database schema
│   │   └── __init__.py
│   ├── routers/
│   │   ├── analytics.py    # Endpoint mapping for summaries and category volumes
│   │   ├── transactions.py # CRUD and parsed message submissions
│   │   └── __init__.py
│   ├── schemas/
│   │   ├── transaction.py  # Pydantic serializer data models
│   │   └── __init__.py
│   ├── seed/
│   │   ├── seeder.py       # Mock database populations (20+ UPI messages)
│   │   └── __init__.py
│   ├── services/
│   │   ├── analytics.py    # Analytics aggregations
│   │   ├── categorizer.py  # Auto-categorization engine
│   │   ├── parser.py       # Regex parsing logic
│   │   ├── rewards.py      # projected savings calculator
│   │   └── __init__.py
│   ├── utils/
│   │   ├── error_handlers.py # Standardized JSON handler configurations
│   │   ├── exceptions.py   # Custom API error exceptions
│   │   └── __init__.py
│   ├── database.py         # DB sessions generator and engines
│   └── main.py             # App initialization and exception attachments
├── .env                    # Environment file (SQLite configs)
├── requirements.txt        # Backend dependencies
└── README.md               # Documentation
```

---

## API Endpoints

### 1. Transactions Ledger
- **`GET /api/transactions`**
  - Query parameters: `transaction_type` (credit/debit), `category` (Food/Travel/Salary/Miscellaneous), `search` (merchant or message match).
  - Response: Array of Transaction records sorted latest first.
- **`POST /api/transactions`**
  - Payload: `{ "raw_message": "Paid Rs.250 to Zomato" }`.
  - Action: Parses, categorizes, calculates savings, and saves to database.
- **`PUT /api/transactions/{id}`**
  - Payload: `{ "category": "Travel" }`.
  - Action: Manually re-assigns category and persists changes.
- **`DELETE /api/transactions/{id}`**
  - Action: Removes the transaction record from SQLite database.

### 2. Spending Analytics
- **`GET /api/analytics`**
  - Returns: Combined object containing:
    ```json
    {
      "category_totals": { "Food": 1850.0, ... },
      "category_percentages": { "Food": 12.5, ... },
      "total_income": 83700.0,
      "total_expense": 8190.0,
      "net_balance": 75510.0,
      "top_category": "Miscellaneous",
      "transaction_count": 20
    }
    ```

---

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI development server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
   ```
   *The server automatically boots up, creates `transactions.db`, and seeds it with mock transactions.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Boot the Vite React development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard in your browser at `http://127.0.0.1:5173`.

---

## Screenshots Placeholder
*Once deployed to staging or local execution, interface previews will be visible here showing dark/light styles, charts, and metrics cards.*
