# 🚀 Anupam Kumar - Full-Stack Dynamic Developer Portfolio & Admin System

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/Node.js-25-green?style=for-the-badge&logo=nodedotjs" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-4-lightgrey?style=for-the-badge&logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-blue?style=for-the-badge&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-ORM-indigo?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-cyan?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JWT-Auth-orange?style=for-the-badge&logo=jsonwebtokens" alt="JWT Auth" />
</p>

A complete, production-ready, highly interactive full-stack developer portfolio and admin management application built for **Anupam Kumar** (*Web Developer | AI/ML Learner | Database Learner*).

---

## 🌟 Key Highlights & Features

- **🌐 Dynamic Database Architecture**: Every piece of portfolio content (projects, skills, experience, education, achievements, bio, social links, contact messages) is stored in **PostgreSQL / SQLite** via **Prisma ORM** and fetched dynamically via REST APIs.
- **🔐 Admin Management Dashboard (`/admin`)**: Built-in protected panel with JWT authentication for full CRUD operations on projects, skills, timeline entries, profile details, image uploads, and contact form messages.
- **📄 Official PDF Resume Download**: Direct one-click PDF resume download (`Anupam_Kumar_Resume.pdf`) and interactive web format viewer.
- **🎨 Premium Developer Aesthetic**: Vercel/GitHub/Linear dark and light themes, code terminal simulator, floating tech pills, smooth glassmorphism cards, and particle canvas FX.
- **🚀 Interactive Project Showcase**: Filter by category, live instant search, featured project badges, tech stack pills, and dedicated case study detail pages (`/projects/:slug`).
- **📬 Real Contact System & Analytics**: Message submission with backend rate-limiting, email notification hooks, and privacy-focused visitor tracking.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
- **Framework**: React 18 (Vite SPA)
- **Styling**: Tailwind CSS + Custom Glassmorphism Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM (v7)
- **SEO**: React Helmet Async

### Backend (`/server`)
- **Runtime**: Node.js & Express.js
- **Database ORM**: Prisma ORM
- **Database**: PostgreSQL (Production) & SQLite (Zero-config local development)
- **Authentication**: JWT (`jsonwebtoken`) & `bcryptjs`
- **File Uploads**: Cloudinary API with local disk storage fallback
- **Security & Rate Limiting**: `helmet`, `cors`, `express-rate-limit`

---

## 📁 Project Architecture

```
portfolio/
├── client/                     # Vite React Frontend
│   ├── public/
│   │   └── Anupam_Kumar_Resume.pdf # Official Resume PDF
│   ├── src/
│   │   ├── components/         # Hero, Navbar, About, Skills, Projects, CodeTerminal, ResumeSection, etc.
│   │   ├── context/            # AuthContext, ThemeContext, ToastContext
│   │   ├── pages/              # HomePage, ProjectDetailPage, AdminLoginPage, AdminDashboardPage
│   │   ├── services/           # Axios API Client & Endpoints
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Express REST API Backend
│   ├── controllers/            # Profile, Projects, Skills, Contact, Analytics, Auth
│   ├── middleware/             # Auth, Rate Limit, Analytics, Error Handler
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma Database Schema (SQLite / PostgreSQL)
│   │   ├── schema.postgresql.prisma
│   │   └── seed.js             # Anupam Kumar Portfolio Database Seed Script
│   ├── routes/                 # Express API Endpoint Routers
│   ├── services/               # Cloudinary & Upload Handlers
│   ├── uploads/                # Local Uploads Fallback Directory
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .env.example
├── .gitignore
├── README.md
└── package.json                # Root Monorepo Scripts
```

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```

### 3. Install Monorepo Dependencies
From the root directory:
```bash
npm run install:all
```

### 4. Database Setup & Seeding
Generate Prisma Client, sync schema, and seed initial portfolio data:
```bash
cd server
npm run prisma:generate
npx prisma db push
node prisma/seed.js
```

### 5. Run Development Server
Start backend REST API (Port 5000) and React frontend (Port 5173) concurrently:
```bash
# From root directory:
npm run dev
```

- **Public Portfolio**: http://localhost:5173
- **Direct PDF Resume**: http://localhost:5173/Anupam_Kumar_Resume.pdf
- **Admin Portal**: http://localhost:5173/admin/login
- **REST API Health**: http://localhost:5000/api/health

---

## 🔐 Admin Dashboard Credentials

Log into `/admin/login` using the seeded credentials:

- **Admin Email**: `anupamkr2307@gmail.com`
- **Admin Password**: `AdminPassword123!`

---

## 📡 REST API Documentation

| Endpoint | Method | Access | Description |
| :--- | :--- | :--- | :--- |
| `/api/profile` | GET | Public | Fetch portfolio bio, stats, and links |
| `/api/profile` | PUT | Protected | Update profile information |
| `/api/projects` | GET | Public | Fetch all projects with search/filters |
| `/api/projects/:slug` | GET | Public | Fetch single project case study |
| `/api/projects` | POST | Protected | Create new project |
| `/api/projects/:id` | PUT | Protected | Update project details |
| `/api/projects/:id` | DELETE | Protected | Delete project |
| `/api/skills` | GET | Public | Fetch skills grouped by category |
| `/api/contact` | POST | Public | Submit contact message (rate-limited) |
| `/api/contact` | GET | Protected | View all contact messages |
| `/api/auth/login` | POST | Public | Authenticate admin & return JWT token |
| `/api/analytics/stats` | GET | Protected | Fetch visitor & view analytics |

---

## 📦 Production Deployment Guide

### Deploying Frontend to Vercel
1. Set Root Directory to `client`
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Environment Variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`

### Deploying Backend to Render / Railway
1. Set Root Directory to `server`
2. Build Command: `npm run prisma:generate`
3. Start Command: `npm start`
4. Environment Variables:
   - `DATABASE_URL` (Neon / Supabase PostgreSQL URL)
   - `JWT_SECRET`
   - `CLIENT_URL`

---

## 👤 Personal Information
- **Name**: Anupam Kumar
- **Headline**: Web Developer | AI/ML Learner | Database Learner
- **Education**: Jaypee University of Engineering and Technology, Guna (2023–2027)
- **GitHub**: https://github.com/anupamkr2307
- **LinkedIn**: https://www.linkedin.com/in/anupam-kumar-7305a8280
- **Email**: anupamkr2307@gmail.com
- **Phone**: 9142090166
