# 📝 Task Manager API

A full-featured RESTful API for task management built with **Node.js**, **Express.js**, and **MongoDB**. It supports user authentication, JWT authorization, and task CRUD operations. The project is fully Dockerized for easy deployment.

## 📦 Features

- User registration and login with JWT authentication
- Secure route access: users can only access their own tasks
- CRUD operations on tasks
- Input validation using `express-validator`
- Modular and scalable folder structure
- Basic tests with `Jest` and `supertest`
- Dockerized setup using `Dockerfile` and `docker-compose`
- Optional frontend: Vue.js or simple HTML (not included)

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint     | Description         |
|--------|--------------|---------------------|
| POST   | /api/auth/signup | Register a new user |
| POST   | /api/auth/login  | Login and get JWT   |

### Tasks *(Protected)*
| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | /api/tasks       | Get user's tasks       |
| POST   | /api/tasks       | Create a task          |
| PUT    | /api/tasks/:id   | Update a task          |
| DELETE | /api/tasks/:id   | Delete a task          |

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- Docker & Docker Compose
- Jest & Supertest (for tests)

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
