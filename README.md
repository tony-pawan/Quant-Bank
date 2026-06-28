# 🏦 QuantBank

### Intelligent Transaction Analytics & Insights

QuantBank is a full-stack fintech analytics dashboard developed as part of a **Vibe Coding Assessment**. The objective of the challenge was to build an automated money management application capable of parsing unstructured bank SMS/UPI alerts, automatically categorizing transactions, and visualizing user spending behavior.

Beyond the core assignment requirements, QuantBank introduces several additional user-centric features to deliver a richer and more production-ready banking experience.

Built with a strong emphasis on:

* Clean architecture
* Backend-driven business logic
* Scalable design principles
* Modern UI/UX
* Production-oriented engineering practices

---
<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/3eda59d3-d6a3-4550-8ade-583402a2a16a" />
<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/6090861c-1a8d-45fc-8627-8af17a1d40f9" />
<img width="1363" height="767" alt="image" src="https://github.com/user-attachments/assets/60ca9739-3bca-453a-a775-a49b992bbf58" />



## 🎯 Assignment Requirements Implemented

✅ Parse raw unstructured bank SMS/UPI alerts

✅ Automatically categorize transactions using keyword-based rules

✅ Display transactions in a chronological timeline

✅ Allow manual category reassignment

✅ Compute category-wise spending analytics

✅ Visualize spending distribution and category progress

✅ Detect cashback/reward transactions

✅ Display projected savings for eligible transactions

✅ Keep all business logic on the backend

---

## 🚀 Additional Features Added

To enhance the user experience and demonstrate engineering depth, the following features were implemented in addition to the assignment requirements:

### 🔍 Smart Search

* Search transactions by merchant name
* Search by raw transaction message
* Real-time client-side filtering

### 🎛️ Advanced Filtering & Sorting

Filter transactions by:

* Credit / Debit
* Category

Sort transactions by:

* Latest First
* Oldest First
* Highest Amount
* Lowest Amount

### ➕ Dynamic Transaction Ingestion

Users can paste raw SMS/UPI alerts directly into the application.

The system automatically:

1. Parses the message
2. Extracts financial information
3. Categorizes the transaction
4. Computes rewards
5. Persists the transaction
6. Updates analytics instantly

### 🏷️ Custom Category Management

Users can create and manage their own categories such as:

* Shopping
* Entertainment
* Bills
* Healthcare
* Investments

Categories are stored persistently and become immediately available throughout the dashboard.

### 🔔 Real-Time Notifications

Toast notifications provide immediate feedback for:

* Transaction creation
* Category updates
* Validation errors
* API failures

### 🌗 Premium Responsive UI

* Modern fintech-inspired dashboard
* Fully responsive design
* Dark mode support
* Interactive charts and analytics

---

## ✨ Core Features

### 🔍 Automated Transaction Processing

QuantBank parses raw bank alerts using regex-driven text processing to extract:

* Transaction Amount
* Merchant Name
* Transaction Type
* Timestamp

Example:

```text
Paid Rs.250 to Zomato via UPI
```

becomes:

```text
Amount      → ₹250
Merchant    → Zomato
Type        → Debit
Category    → Food
```

---

### 🏷️ Intelligent Auto-Categorization

Transactions are automatically categorized using a configurable rule engine.

| Merchant / Keyword | Category |
| ------------------ | -------- |
| Zomato             | Food     |
| Swiggy             | Food     |
| Uber               | Travel   |
| Ola                | Travel   |
| Salary             | Salary   |
| Company Credit     | Salary   |

Unknown transactions are assigned to:

```text
Miscellaneous
```

---

### 💰 Expected Savings Engine

QuantBank detects cashback and reward transactions and computes projected savings automatically.

Example:

```text
Paid Rs.500 to Swiggy Cashback Offer
```

Result:

```text
Expected Savings → ₹25
```

---

### 📊 Interactive Financial Analytics

The dashboard provides:

* Total Income
* Total Expense
* Net Balance
* Category-wise distribution
* Spending trends
* Dynamic progress indicators

All analytics are computed server-side.

---

### 📜 Transaction Timeline

A modern chronological transaction feed displaying:

* Merchant details
* Amount
* Category
* Timestamp
* Reward badges
* Category selector

---

## 🏗️ Architecture

```text
Frontend (React + Vite + Tailwind)
                │
                ▼
         FastAPI REST API
                │
      ┌─────────┴─────────┐
      ▼                   ▼
 Business Services     SQLite DB
(Parser, Analytics,
Rewards, Categorizer)
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Recharts
* Axios
* React Hot Toast

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* SQLite

---

## 📂 Project Structure

```text
QuantBank/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   └── utils/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── seed/
│
└── README.md
```

---

## 🚀 Getting Started

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://127.0.0.1:5173
```

---

## 📡 API Endpoints

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/transactions`      | Fetch transactions |
| POST   | `/api/transactions`      | Add transaction    |
| PUT    | `/api/transactions/{id}` | Update category    |
| DELETE | `/api/transactions/{id}` | Delete transaction |
| GET    | `/api/analytics`         | Fetch analytics    |
| GET    | `/api/categories`        | Fetch categories   |
| POST   | `/api/categories`        | Create category    |

---

## 🔮 Future Enhancements

* AI-powered spending insights
* Budget recommendation engine
* Export reports to PDF/CSV
* Financial health scoring
* Recurring transaction detection
* Personalized savings recommendations
* Multi-user authentication
* Real bank SMS integration

---

## 🌟 Highlights

✅ Full-Stack Fintech Dashboard

✅ Persistent SQLite Storage

✅ Backend-Driven Business Logic

✅ Intelligent Rule-Based Categorization

✅ Real-Time Analytics

✅ Extensible Category System

✅ Modern Responsive UI

✅ Production-Oriented Architecture
