# EchoBlog

## Description

EchoBlog is a MERN stack application. It utilizes MongoDB for the database, Express.js for the server, React.js for the client, and Node.js as the runtime environment.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or use a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/) (optional, for version control)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd echoblog
```

### 2. Install server dependencies

```bash
cd server
npm install dotenv bcrypt body-parser nodemailer cors
```

### 3. Install client side dependencies
npm install axios
npm install react-router-dom


### 3. Configure environment variables

```bash
PORT=<your-port-number>
MONGO_URL=<your-mongo-db-connection-string>
EMAIL=<Your_email>
PASSWORD=<APP_PASSWORD>
```

