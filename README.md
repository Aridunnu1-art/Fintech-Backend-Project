# 📊 Smart Budget & Spending Tracker API

A RESTful API that helps users manage their finances by tracking income, expenses, budgets, and spending behavior.

---

## 🚀 Project Overview

The Smart Budget & Spending Tracker API is a backend service designed to help users:

* Track income and expenses
* Monitor their financial balance
* Set a monthly budget
* Receive alerts when nearing or exceeding budget
* View financial summaries and analytics

This project simulates a fintech backend system focused on improving financial awareness and discipline.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* Bcrypt (Password hashing)
* Joi (Validation)
* dotenv (Environment variables)

---

## 📁 Project Structure

```
src/
├── config/        # Database connection
├── controllers/   # Handles request/response logic
├── models/        # Mongoose schemas
├── routes/        # API routes
├── middleware/    # Authentication middleware
├── services/      # Business logic
├── validator/     # Joi validation schemas
├── app.js         # Express app setup
└── server.js      # Entry point
```

---

## 🔐 Authentication & Security

* Uses **JWT (JSON Web Tokens)** for authentication
* Passwords are hashed using **bcrypt**
* Protected routes require token:

```
Authorization: Bearer <token>
```

* Middleware verifies user identity before accessing secured endpoints

---

## 🧩 Database Schema

### 👤 User Model

* name: String
* email: String (unique)
* password: String (hashed)
* balance: Number (default: 0)
* budget: Number (optional)

---

### 💳 Transaction Model

* userId: ObjectId (ref: User)
* amount: Number
* type: "income" | "expense"
* category: String
* description: String
* date: Date

---

## 📌 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/auth/register | Register a user |
| POST   | /api/auth/login    | Login user      |

---

### 💰 Transaction Routes

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | /api/transactions     | Create transaction     |
| GET    | /api/transactions     | Get all transactions   |
| GET    | /api/transactions/:id | Get single transaction |
| PUT    | /api/transactions/:id | Update transaction     |
| DELETE | /api/transactions/:id | Delete transaction     |

---

### 📊 Additional Features

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| PUT    | /api/transactions/budget  | Set user budget       |
| GET    | /api/transactions/summary | Get financial summary |

---

## 🧠 Core Features

### ✅ Balance Management

* Income increases balance
* Expense decreases balance

---

### 💸 Budget Tracking

* Users can set a monthly budget
* System tracks total expenses against budget

---

### 🚨 Smart Alerts

* ⚠️ Alert when 80% of budget is used
* 🚨 Alert when budget is exceeded

---

### 📊 Financial Summary

Returns:

* Total income
* Total expenses
* Remaining balance

---

## 🧪 Example Request & Response

### ➤ Create Transaction

**Request:**

```json
POST /api/transactions

{
  "amount": 5000,
  "type": "expense",
  "category": "food",
  "description": "Lunch"
}
```

---

**Response:**

```json
{
  "message": "Transaction created successfully",
  "balance": 45000,
  "alert": "⚠️ You have used 80% of your budget",
  "transaction": {
    "id": "12345",
    "amount": 5000,
    "type": "expense",
    "category": "food",
    "description": "Lunch",
    "date": "2026-04-27"
  }
}
```

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Aridunnu1-art/Fintech-Backend-Project.git
cd Fintech-Backend-Project
```

---

2. Install dependencies:

```bash
npm install
```

---

3. Create `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## 🧪 Testing

You can test endpoints using:

* Thunder Client
* Postman

---

## 📦 Deployment

This API can be deployed on:

* Render
* Railway
* Heroku

---

## 🌐 Repository Link

👉 https://github.com/Aridunnu1-art/Fintech-Backend-Project

---

## 👨‍💻 Contributors

Backend Group 3

---

## 🎯 Conclusion

This project demonstrates:

* RESTful API design
* Authentication & security
* Financial data handling
* Budget tracking and analytics

It serves as a solid foundation for building real-world fintech applications.

---
