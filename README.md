# 📋 Project Management System

A modern **Project Management System** built with the **MERN Stack**. This application allows users to manage projects and tasks with secure authentication, task status updates, and a clean responsive dashboard.

---

## 🚀 Features

- 🔐 User Registration & Login (JWT Authentication)
- 📁 Create, View & Delete Projects
- ✅ Create, View & Delete Tasks
- 🔄 Update Task Status (Todo, In Progress, Done)
- 👤 Protected Routes
- 📱 Responsive Dashboard
- 🎨 Clean & Professional UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

```
Project-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone  https://github.com/jigyasha30/Codealpha_projectMangement.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=5000
MONGO_URI=mongodb+srv://jigyasha:%23%40%23%40%23%40pinci3026@cluster0.ltwzttr.mongodb.net/projectmanagement?retryWrites=true&w=majority
JWT_SECRET=codealpha_project_secret
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Projects

| Method | Endpoint |
|---------|----------|
| GET | /api/projects |
| POST | /api/projects |
| PUT | /api/projects/:id |
| DELETE | /api/projects/:id |

### Tasks

| Method | Endpoint |
|---------|----------|
| GET | /api/tasks/project/:projectId |
| POST | /api/tasks |
| PUT | /api/tasks/:id/status |
| DELETE | /api/tasks/:id |

---

## 🌟 Future Improvements

- Edit Projects
- Edit Tasks
- Due Dates
- Search & Filter
- Dark Mode
- Team Collaboration
- File Uploads
- Notifications

---

## 👩‍💻 Author

**Jigyasha Yaduvanshi**

GitHub: https://github.com/jigyasha30/Codealpha_projectMangement.git

LinkedIn: https://www.linkedin.com/in/jigyasha-%E2%9C%A8-12072637b/

---

## 📄 License

This project is developed for the **CodeAlpha Internship Program** and is available for learning and educational purposes.

---

⭐ If you like this project, don't forget to **Star** the repository!