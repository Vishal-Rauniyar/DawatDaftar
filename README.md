# 🍽️ Dawat Daftar – MERN Stack Restaurant Website

A full-stack restaurant web application built using the **MERN stack** (MongoDB, Express, React, Node.js). Dawat Daftar allows users to browse a digital menu, manage their cart, place orders, and more — with an intuitive and responsive interface.

---


## 🛠️ Tech Stack

| Frontend      | Backend         | Database | 
|---------------|-----------------|----------|
| React.js      | Node.js         | MongoDB  | 
| HTML5, CSS3   | Express.js      | MongoDB  | 
| Bootstrap     | REST API |      | 

---

## 💡 Features


- ✅ User registration and login with JWT auth
- 🍲 Browse dishes by categories (starter, main, dessert, etc.)
- 🛒 Add to cart, update quantity, and remove items
- 📦 Place orders with a summary
- 📱 Fully responsive design



## 📁 Folder Structure

📦 Dawat-Daftar
├── client # React frontend
│ ├── public
│ └── src
│ ├── components
│ ├── pages
│ ├── App.js
│ └── ...
├── server # Node.js backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js
└── README.md



## 🔐 Authentication

- JWT token-based login/signup
- Protected routes for dashboard and cart


---

## 🧪 API Endpoints

| Method | Route              | Description            |
|--------|--------------------|------------------------|
| POST   | /api/auth/register | Register new user      |
| POST   | /api/auth/login    | Login existing user    |
| GET    | /api/menu          | Fetch all dishes       |
| POST   | /api/cart          | Add to cart            |
| POST   | /api/order         | Place an order         |
| GET    | /api/admin/orders  | View all orders (admin)|

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/dawat-daftar.git
cd dawat-daftar

# Start backend
cd server
npm install
npm start

# Start frontend
cd ../client
npm install
npm start

Create a .env file in the server directory for backend secrets like:

MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
