# 🚀 EchoBlog

## 📝 Description

EchoBlog is a **feature-rich** blogging platform built with the **MERN** stack (**MongoDB, Express.js, React.js, and Node.js**). It allows users to create and interact with blog posts while ensuring secure authentication and user verification.

## 📌 Features

✔️ **User Authentication** (🔑 Login & 🔓 Signup)  
✔️ **JWT-based Authentication** (🔐 Secure API access)  
✔️ **Email Verification** (📧 Using Nodemailer)  
✔️ **Blog Post Management** (📝 Create, Read, Update, Delete)  
✔️ **Like & Unlike Posts** (❤️ Interact with posts)  
✔️ **Commenting System** (💬 Add, edit, and delete comments)  
✔️ **User Profile Management** (👤 Update profile details)  

---

## 🛠 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)  
- [MongoDB](https://www.mongodb.com/) (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  
- [Git](https://git-scm.com/) (Optional for version control)  

---

## 📥 Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd echoblog
```

### 2️⃣ Install Server Dependencies

```bash
cd server
npm install dotenv bcrypt body-parser nodemailer cors jsonwebtoken express mongoose
```

### 3️⃣ Install Client Dependencies

```bash
cd client
npm install axios react-router-dom
```

### 4️⃣ Configure Environment Variables

```bash
PORT=<your-port-number>
MONGO_URL=<your-mongo-db-connection-string>
JWT_SECRET=<your-jwt-secret>
EMAIL=<your-email>
PASSWORD=<your-app-password>
```
---

## 📌 Tech Stack

**Frontend**: React.js, React Router  
**Backend**: Node.js, Express.js  
**Database**: MongoDB, Mongoose  
**Authentication**: JWT, Bcrypt  
**Email Services**: Nodemailer  

---

## 📧 Contact
For any queries, feel free to reach out:
✉️ Email: apekshashah029@gmail.com

🔗 Happy Coding! 🚀
