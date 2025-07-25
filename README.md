# 🛒 E-commerce Backend API



This project is a **simple e-commerce backend** built with **Node.js**, **Express**, and **MongoDB**. It allows users to browse products, manage a cart (for both logged-in and guest users), and place orders.

---

## 📌 Objective

Build a functional and modular backend with the following capabilities:

- Product listing
- User signup/login with JWT authentication
- Cart operations for both logged-in and guest users
- Order placement and retrieval for logged-in users

---
## 🚀 Getting Started

-- Clone the repository
git clone <https://github.com/navinkumarparmar/ecommerce-backend>

-- Install dependencies:
npm install

PORT=3001
MONGODB_URI=""
JWT_SECRET=""

-- Start the server

npm run start

## 📦 Features & Endpoints


### 🔐 User Authentication

🚀 API Endpoints
Base URL: http://localhost:3001/api



| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | User login (JWT)    |


| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/product/listAll` | List all available products |


| Method | Endpoint                  | Description                     |
| ------ | ------------------------- | ------------------------------- |
| POST   | `/cart/add`               | Add item to cart (guest/normal) |
| GET    | `/cart/getCart`           | Get cart items                  |
| DELETE | `/cart/remove/:productId` | Remove item from cart           |
| PUT    | `/cart/update`            | Update item quantity in cart    |


| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/order/createOrder` | Place an order            |
| GET    | `/order/getOrders`   | Get list of user’s orders |


## Postman Collection

import postman

- [Import Postman Collection](https://www.postman.com/developers-8673/tech/collection/ydouuhp/e-commerce)


## 🧰 Tech Stack

- **Node.js (Express.js)**
- **MongoDB (Mongoose)**
- **JWT** – Authentication
- **bcrypt** – Password hashing

---
