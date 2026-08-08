# 🚀 JobHuntr (InternshipHub) - AI-Powered Internship & Job Platform

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v8-646CFF.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6%2B-47A248.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-LangChain-412991.svg)](https://openai.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Containers%20Ready-2496ED.svg)](https://www.docker.com/)
[![CI/CD Pipeline](https://github.com/nick2726/Job_Huntr/actions/workflows/ci.yml/badge.svg)](https://github.com/nick2726/Job_Huntr/actions)
[![Swagger Docs](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D.svg)](http://localhost:5000/api-docs)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

**JobHuntr** is a production-grade, full-stack job and internship discovery platform built with **Node.js, Express, MongoDB, React 19, Vite, and Tailwind CSS**. It features intelligent job aggregation scrapers, AI-powered ATS resume matching, interactive Swagger API documentation, enterprise security protection, containerized Docker support, and an automated GitHub Actions CI/CD pipeline.

---

## 🌟 Key Features

- **📄 AI ATS Resume Scanner**: Upload PDF resumes or paste resume text to calculate real-time ATS match scores (0-100%), skill gap analysis, and AI optimization recommendations.
- **📚 Interactive Swagger API Docs**: Explore and test REST API endpoints live at `/api-docs` using OpenAPI 3.0 specs.
- **🛡️ Enterprise Security Suite**: Protected with **Helmet** HTTP security headers, **Express-Rate-Limit** protection against brute-force attacks, and **Mongo-Sanitize** NoSQL injection protection.
- **🐳 Docker & Docker Compose Support**: Spin up the entire stack (Frontend Nginx, Backend Express, and MongoDB) with a single command: `docker compose up --build`.
- **⚙️ GitHub Actions CI/CD**: Automated integration pipeline executing syntax checks, Oxlint linting, production Vite compilation, and Docker build validations on every push.
- **🎯 Smart Search & Filtering**: Discover internships by location, job type (Remote/On-site/Hybrid), category, and stipend range.
- **🤖 AI Career Assistant**: Built-in AI Chatbot powered by LangChain and OpenAI to provide resume feedback, career guidance, and interview prep.
- **🕷️ Multi-Source Job Aggregator**: Automated scrapers fetching live job feeds from RemoteOK, Arbeitnow, LinkedIn, and SerpApi.
- **🔐 Secure Authentication**: JWT authentication with HTTP-only cookies and bcrypt password hashing supporting Student & Recruiter roles.
- **⭐ Bookmarks & Application Tracker**: Save favorite internships and track application statuses.
- **🌓 Modern Responsive UI**: Tailored with Tailwind CSS v4, dark/light theme support, and fluid micro-animations.

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Description |
| :--- | :--- |
| **React 19** | Modern UI Component Library |
| **Vite** | Next-generation fast frontend tooling |
| **Tailwind CSS v4** | Utility-first responsive styling framework |
| **TanStack Query** | Server-state management & caching |
| **React Router v7** | Declarative client-side routing |
| **Lucide Icons** | Clean & modern icon set |

### **Backend & DevOps**
| Technology | Description |
| :--- | :--- |
| **Node.js & Express** | Scalable RESTful API server framework |
| **MongoDB & Mongoose** | NoSQL database & Object Data Modeling (ODM) |
| **LangChain & OpenAI** | AI Agent framework for intelligent chat responses & ATS match analysis |
| **PDF-Parse** | Extraction engine for candidate PDF resumes |
| **Swagger UI & JSDoc** | Interactive OpenAPI 3.0 interactive documentation |
| **Helmet & Rate Limit** | Enterprise HTTP header security & anti-brute-force rate limiting |
| **Docker & Nginx** | Multi-stage containerization & reverse proxy |
| **GitHub Actions** | Automated CI/CD pipeline |

---

## 📂 Project Architecture

```
Job_Huntr/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI/CD Pipeline
├── backend/
│   ├── adapters/              # Data adapters (MongoDB & Internship adapters)
│   ├── ai/                    # LangChain & OpenAI AI agent logic
│   ├── config/
│   │   ├── db.js              # Database connection configuration
│   │   └── swagger.js         # OpenAPI 3.0 Swagger configuration
│   ├── controllers/           # Route controllers (Auth, Jobs, Companies, AI, Users)
│   ├── middleware/            # Auth, rate-limiting & security middleware
│   ├── models/                # Mongoose schemas (User, Internship, Company)
│   ├── routes/                # Express route definitions with Swagger annotations
│   ├── scripts/               # DB seeding & web scraping scripts
│   ├── services/              # Job aggregator & external web scrapers
│   ├── utils/                 # Helper functions (Email sender, validators)
│   ├── Dockerfile             # Backend Node 20 Docker configuration
│   └── server.js              # Entry point for backend Express server
│
├── frontend/
│   ├── public/                # Static assets & icons
│   ├── src/
│   │   ├── components/        # UI components (Navbar, AIChatBot, ATSMatcher)
│   │   ├── context/           # React Context (ThemeContext)
│   │   ├── layouts/           # Main layout wrapper
│   │   ├── pages/             # Page components (Home, Internships, ATSScanner, Login, Profile)
│   │   ├── services/          # Axios API configuration
│   │   └── App.jsx            # Application router
│   ├── nginx.conf             # Nginx reverse-proxy configuration
│   ├── Dockerfile             # Multi-stage Nginx Docker configuration
│   └── vite.config.js         # Vite build configuration
│
├── docker-compose.yml         # Container orchestration (Frontend + Backend + MongoDB)
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### **Prerequisites**
Make sure you have the following installed:
- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** *(Optional, recommended)*
- **[MongoDB](https://www.mongodb.com/try/download/community)** *(If running locally without Docker)*

---

### 🐳 **Option 1: Quickstart with Docker (Recommended for Recruiters)**

Launch the entire stack (**Frontend, Backend, and MongoDB Database**) with a single command:

```bash
docker compose up --build
```

- 🌐 **Frontend Web App**: [http://localhost](http://localhost)
- ⚙️ **Backend API**: [http://localhost:5000](http://localhost:5000)
- 📚 **Swagger API Docs**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- 🗄️ **MongoDB**: Listening on `localhost:27017`

---

### 💻 **Option 2: Manual Local Setup**

#### **1. Clone the Repository**

```bash
git clone https://github.com/nick2726/Job_Huntr.git
cd Job_Huntr
```

#### **2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (copied from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internshiphub
JWT_SECRET=supersecretjwtkey12345
JWT_EXPIRE=30d
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
```

##### **Seed Initial Database Data**
```bash
node scripts/seed.js
# Or seed India specific listings:
node scripts/seedIndiaJobs.js
```

##### **Start Backend Server**
```bash
npm run dev
```
*Backend server will start on `http://localhost:5000` with Swagger Docs at `/api-docs`*

---

#### **3. Frontend Setup**

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
*Frontend dev server will start on `http://localhost:5173`*

---

## 📡 API Reference Summary

Explore interactive documentation live at **`/api-docs`** or refer to the table below:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Server health check endpoint | ❌ |
| `GET` | `/api-docs` | Interactive Swagger OpenAPI documentation | ❌ |
| `POST` | `/api/auth/register` | Register a new user (Student or Recruiter) | ❌ |
| `POST` | `/api/auth/login` | Login user & return JWT token | ❌ |
| `GET` | `/api/auth/profile` | Get current logged-in user profile | ✅ |
| `POST` | `/api/ai/match-resume` | Analyze PDF/text resume ATS match score against job | ✅ |
| `POST` | `/api/ai/chat` | Send career prompt to AI Assistant | ✅ |
| `GET` | `/api/internships` | List internships with search & filters | ❌ |
| `GET` | `/api/internships/:id` | Get detailed internship information | ❌ |
| `POST` | `/api/internships` | Post a new internship listing (Recruiter) | ✅ |
| `POST` | `/api/bookmarks/:id` | Bookmark / Save an internship | ✅ |
| `GET` | `/api/bookmarks` | Fetch user's saved bookmarks | ✅ |
| `GET` | `/api/companies` | List featured hiring companies | ❌ |

---

## 🛡️ Security & Quality Assurance

- **Rate Limiting**: Protects against brute-force attacks (`30 requests/15m` on Auth, `200 requests/15m` on general API).
- **Security Headers**: Managed via **Helmet** HTTP header middleware.
- **Injection Defense**: Query parameters sanitized via **Express-Mongo-Sanitize**.
- **Automated CI**: GitHub Actions validates syntax, Oxlint linting, Vite production build, and Docker compilation on every PR.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
