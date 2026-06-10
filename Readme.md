# Employee Leave Management System
A role-based MERN app for managing employee leaves, built with React, Express, MongoDB, and Material UI.

## ✨ Features
- Employee login/register
- Apply for leave
- View leave history
- Manager leave approvals
- Role-based access


## 🛠️ Tech Stack
- Frontend: React, React Router, Vite, Material UI,Formik
- Backend: Node.js, Express, MongoDB, Mongoose, bcryptjs, JWT
- State Management: Context API


## 📁 Folder Structure
LeaveManagement System/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── server.js
│   └── package.json
└── frontend/
    └── frontend/
        ├── src/
        │   ├── components/
        │   ├── context/
        │   ├── hooks/
        │   ├── pages/
        │   ├── services/
        │   └── utils/
        ├── index.html
        └── package.json


## Database Setup
1. Download and install **MongoDB Community Server** from https://www.mongodb.com/try/download/community
2. Run MongoDB as a Windows service:
   ```
   net start MongoDB
   ```
3. The database `leaveapp` will be created automatically when the backend starts.

**To create the first Manager account:**
- Register a normal account via the app
- Open **MongoDB Compass** → connect to `mongodb://localhost:27017`
- Open `leaveapp` → `users` collection
- Find your user and change `role` from `"employee"` to `"manager"`



## ⚙️ Getting Started

### Backend

cd backend
npm install
node server.js


### Frontend
cd frontend/frontend
npm install
npm run dev


## 🔐 Environment Variables

In backend add .env file which contain three rows
PORT=5000 
MONGO_URI=mongodb://localhost:27017/leaveapp
JWT_SECRET=my_secret_key


