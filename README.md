# GROUP 3 Assignment

---

## 📊 Smart Budget & Spending Tracker API 

* A RESTful API that helps users track income and expenses, manage budgets, and receive alerts to make smarter financial decisions.
---

## 🚀 Project Overview

The Smart Budget & Spending Tracker API is a backend service designed to solve everyday financial problems such as:

* Poor spending habits
* Lack of budgeting discipline
* No visibility into financial activities

This API enables users to:

* Track income and expenses
* Set monthly budgets
* Receive alerts when overspending
* View financial summaries and analytics
---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt (Password Hashing)
* dotenv (for environment variables)

---
## 📁 Project Structure

```text
src/
├── config/       # Configuration files (DB, env checks, cloudinary)
├── controllers/  # Business logic
├── models/       # Mongoose schemas
├── routes/       # API routes
├── middleware/   # Custom middleware (auth, error handling)
├── utils/        # Utility functions
├── app.js        # Express app setup
└── server.js     # Entry point
```

## 🔐 Features
1. Authentication
   * User Registration
   * User Login
   * Secure JWT-based Authentication

2. User Profile
   * Store user information
   * Set monthly budget
3. Transactions
   * Add income and expenses
   * Categorize transactions
   * Update and delete records
4. Budget Tracking
   * Monitor total expenses
   * Compare with monthly budget
5. Alerts System
  * Notify users when:
  * 80% of budget is reached
  * Budget is exceeded
6. Analytics
   * Total income and expenses
   * Balance calculation
   * Category-based spending insights
---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Aridunnu1-art/Fintech-Backend-Project
cd API Deployment
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

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

## 📌 API Endpoints

### Auth Routes
* POST /api/auth/register     ( Register a new user )
* POST /api/auth/login        ( Login user )
* GET  /api/auth/profile      ( Get user profile )

---

### Transaction Routes

POST   /api/transactions         ( Add transaction )
GET    /api/transactions         ( Get all transactions )
GET    /api/transactions/:id     ( Get single transaction )
PUT    /api/transactions/:id     ( Update transaction )
DELETE /api/transactions/:id     ( Delete transaction )

---


---

## 🔐 Authentication
* User registration
* Uses login
* JWT-based authentication

```http
Authorization: Bearer <token>
```

---

## ❗ Error Handling

* Centralized error handling middleware
* Returns consistent JSON responses:

```json
{
  "status": "error",
  "message": "Something went wrong"
}
```

---

## 🧪 Testing

You can test endpoints using:

* Postman
* Thunder Client

---

## 📦 Deployment

* Can be deployed on platforms like:

  * Render
  * Railway
  * Heroku

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 🧠 Best Practices

* Use environment variables for sensitive data
* Follow RESTful conventions
* Write clean and modular code
* Validate all incoming data

---


## 👨‍💻 Author

Developed by Backend Group 3
Feel free to connect and contribute 🚀

