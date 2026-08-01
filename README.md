# 💰 Expense Tracker - Full Stack Web Application

A beginner-friendly full stack web application for tracking personal expenses. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Authentication** - Register, Login, Logout with JWT (JSON Web Tokens)
- **CRUD Operations** - Create, Read, Update, Delete expenses
- **Protected Routes** - Dashboard and forms require login
- **Responsive UI** - Works on desktop and mobile
- **Dashboard** - View all expenses in a table with category badges
- **Add/Edit Forms** - Simple forms with validation
- **Delete with Confirmation** - Prevents accidental deletion

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React, React Router, Axios, CSS |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB + Mongoose      |
| Auth      | JWT + bcrypt            |

## 📁 Folder Structure

```
expense-tracker/
├── backend/                  # Express API server
│   ├── controllers/          # Route handler logic
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API route definitions
│   ├── middleware/            # Auth middleware
│   ├── server.js             # Entry point
│   ├── .env                  # Environment variables
│   └── package.json
├── frontend/                 # React app (Vite)
│   ├── src/
│   │   ├── components/       # Navbar, ProtectedRoute
│   │   ├── pages/            # Login, Register, Dashboard, AddExpense, EditExpense
│   │   ├── App.jsx           # Main app with routing
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # All styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .github/workflows/ci.yml  # GitHub Actions CI
├── .gitignore
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier) OR local MongoDB

### 1. Clone the repository
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/expense-tracker
JWT_SECRET=your_super_secret_key_change_this
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

### 4. Run the Application

Start backend (from `backend/` folder):
```bash
npm run dev
```

Start frontend (from `frontend/` folder):
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description          | Auth Required |
|--------|----------------------|----------------------|---------------|
| POST   | /api/auth/register   | Create new account   | No            |
| POST   | /api/auth/login      | Login to account     | No            |
| GET    | /api/auth/user       | Get current user     | Yes           |

### Expenses (All require JWT token in Authorization header)

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | /api/expenses          | Get all expenses     |
| GET    | /api/expenses/:id      | Get single expense   |
| POST   | /api/expenses          | Create expense       |
| PUT    | /api/expenses/:id      | Update expense       |
| DELETE | /api/expenses/:id      | Delete expense       |

## 🔐 Authentication Flow

1. User registers or logs in → Backend returns a JWT token
2. Token is stored in `localStorage` on the browser
3. Every protected API request includes `Authorization: Bearer <token>` header
4. Backend verifies the token before processing the request
5. When user logs out, the token is removed from `localStorage`

## 📸 Screenshots

*(Add screenshots here after running the app)*

- Login Page
- Register Page
- Dashboard with expense table
- Add Expense form
- Edit Expense form

## 🌐 Deployment

### Backend on Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (MONGO_URI, JWT_SECRET)
6. Deploy

### Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable: `VITE_API_URL` = your Render URL
5. Deploy

### Database on MongoDB Atlas
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` in your `.env` file

## 🧪 Testing with Postman

1. **Register**: POST http://localhost:5000/api/auth/register with JSON body `{ "name": "Test", "email": "test@test.com", "password": "123456" }`
2. **Login**: POST http://localhost:5000/api/auth/login with `{ "email": "test@test.com", "password": "123456" }`
3. Copy the `token` from the response
4. **Create Expense**: POST http://localhost:5000/api/expenses with `Authorization: Bearer <token>` and body `{ "title": "Lunch", "amount": 15, "category": "Food" }`
5. **Get Expenses**: GET http://localhost:5000/api/expenses with `Authorization: Bearer <token>`

## 🔄 CI/CD Pipeline

Three GitHub Actions workflows in `.github/workflows/` run automatically:

| Workflow                | Trigger                            | Action                                    |
|-------------------------|------------------------------------|-------------------------------------------|
| `ci.yml`                | Every push / PR to `main`          | Install + syntax-check backend, build frontend |
| `vercel-deploy.yml`     | Push to `main` (frontend changes)  | Build & deploy frontend to Vercel (`--prod`) |
| `render-deploy.yml`     | Push to `main` (backend changes)   | POST to the Render deploy hook            |

### Required GitHub Secrets

Add these under **repo → Settings → Secrets and variables → Actions**:

| Secret                     | How to get it |
|----------------------------|---------------|
| `VERCEL_TOKEN`             | [vercel.com/account/tokens](https://vercel.com/account/tokens) → Create Token |
| `VERCEL_ORG_ID`            | Run `npx vercel link` in `frontend/`, then copy `orgId` from `.vercel/project.json` |
| `VERCEL_PROJECT_ID`        | Same `projectId` from `.vercel/project.json` |
| `RENDER_DEPLOY_HOOK_URL`   | Render → Service → Settings → Deploy Hooks → Create Hook (URL like `https://api.render.com/deploy/srv-xxx?key=yyy`) |

### Environment Variables

- **Backend (Render)**: `JWT_SECRET` is auto-generated by `render.yaml`. Override it in the Render dashboard if you like.
- **Frontend (Vercel)**: set `VITE_API_URL=https://expense-tracker-api-olhn.onrender.com` (already configured on the project).

### Live URLs

- Frontend: https://expense-teacker.vercel.app
- Backend:  https://expense-tracker-api-olhn.onrender.com/api/health

> ⚠️ **Data persistence**: the backend stores data in `backend/data/*.json`. Render free instances have an
> ephemeral filesystem, so data is lost whenever the service restarts or redeploys. For a persistent database,
> migrate the models to MongoDB Atlas (the `MONGO_URI` env var) — see the README architecture diagram.

## 📚 Viva Questions & Answers

**Q1: What is JWT and why is it used?**
A: JWT (JSON Web Token) is a compact, URL-safe token used for authentication. It contains encoded user information and is signed with a secret key. We use it so users don't have to send their password on every request.

**Q2: How does bcrypt work?**
A: bcrypt is a password hashing function. It adds a random "salt" to the password before hashing, making it resistant to rainbow table attacks. We store only the hashed version, never the plain text password.

**Q3: What is middleware in Express?**
A: Middleware are functions that execute during the request-response cycle. Our `authMiddleware` runs before protected route handlers to verify the JWT token.

**Q4: What is the difference between SQL and NoSQL?**
A: SQL databases (like MySQL) use tables with fixed schemas. NoSQL databases (like MongoDB) use flexible documents. MongoDB is easier for beginners because you can store JSON-like data without predefined schemas.

**Q5: How does React Router work?**
A: React Router is a library that enables navigation between different components without page refresh. It uses `Routes` and `Route` components to map URLs to components.

**Q6: What is CORS?**
A: CORS (Cross-Origin Resource Sharing) is a security mechanism that allows a web page from one domain to access resources on another domain. We enable it in Express so our React frontend can call the backend API.

**Q7: Explain the flow when a user logs in.**
A: User enters email/password → Frontend sends POST to `/api/auth/login` → Backend finds user, compares hashed password → If match, generates JWT token → Frontend stores token in localStorage → User is redirected to Dashboard.

**Q8: What is the purpose of the `.env` file?**
A: The `.env` file stores sensitive configuration like database URLs and secret keys. It keeps secrets out of the codebase and is listed in `.gitignore` so it's never committed to GitHub.

## 🏗 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (React)                        │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────────┐  │
│  │  Login    │  │ Register │  │  Dashboard / Add / Edit   │  │
│  │  Page     │  │  Page    │  │  (Protected Routes)       │  │
│  └─────┬────┘  └─────┬────┘  └──────────┬────────────────┘  │
│        │              │                  │                  │
│        └──────────────┴──────────────────┘                  │
│                          │   axios (HTTP requests)          │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    ┌──────┴───────┐
                    │   CORS       │
                    └──────┬───────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    Express Server                            │
│  ┌──────────┐   ┌───────┴────────┐   ┌──────────────────┐  │
│  │   Auth   │   │  Auth Middleware│   │   Expense Routes │  │
│  │  Routes  │──▶│ (JWT Verify)   │──▶│   (CRUD)         │  │
│  └────┬─────┘   └────────────────┘   └────────┬─────────┘  │
│       │                                       │            │
│  ┌────┴─────┐                          ┌──────┴───────┐   │
│  │  Auth    │                          │   Expense    │   │
│  │Controller│                          │  Controller  │   │
│  └────┬─────┘                          └──────┬───────┘   │
│       │                                       │            │
│  ┌────┴─────┐                          ┌──────┴───────┐   │
│  │  User    │                          │   Expense    │   │
│  │  Model   │                          │   Model      │   │
│  └────┬─────┘                          └──────┬───────┘   │
│       │                                       │            │
└───────┼───────────────────────────────────────┼────────────┘
        │                                       │
        └───────────────┬───────────────────────┘
                        │
                 ┌──────┴──────┐
                 │   MongoDB   │
                 │   (Atlas)   │
                 └─────────────┘
```

## 💡 Future Improvements

- Add pagination for large numbers of expenses
- Add charts/visualizations (Chart.js or Recharts)
- Add search and filter by category/date
- Add budget limits and notifications
- Dark mode toggle
- Export expenses to CSV/PDF
- Password reset via email
- Unit and integration tests

## 📄 License

This project is for educational purposes as a college mini project.
