# 🚀 JobHuntr (InternshipHub) - AI-Powered Internship & Job Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v6-646CFF.svg)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v6%2B-47A248.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-LangChain-412991.svg)](https://openai.com/)
[![CI/CD Pipeline](https://github.com/nick2726/Job_Huntr/actions/workflows/ci.yml/badge.svg)](https://github.com/nick2726/Job_Huntr/actions)
[![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

**JobHuntr** (InternshipHub) is a production-ready, full-stack job and internship discovery platform built with **Node.js, Express, MongoDB, React 19, Vite, and Tailwind CSS**. It features intelligent job aggregation scrapers, AI-powered career counseling via **LangChain & OpenAI**, real-time bookmarking, resume management, and role-based access control.

---

## 🌟 Key Features

- **🎯 Smart Search & Filtering**: Discover internships by location, job type (Remote/On-site/Hybrid), category, and stipend range.
- **🤖 AI Career Assistant**: Built-in AI Chatbot powered by LangChain and OpenAI to provide resume feedback, career guidance, and interview prep.
- **🕷️ Multi-Source Job Aggregator**: Automated scrapers fetching live job feeds from RemoteOK, Arbeitnow, LinkedIn, and SerpApi.
- **🔐 Secure Authentication**: JWT authentication with HTTP-only cookies and bcrypt password hashing supporting Student & Recruiter roles.
- **📄 Resume Management**: Built-in resume file upload (Multer) and applicant tracking.
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

### **Backend**
| Technology | Description |
| :--- | :--- |
| **Node.js & Express** | Scalable RESTful API server framework |
| **MongoDB & Mongoose** | NoSQL database & Object Data Modeling (ODM) |
| **LangChain & OpenAI** | AI Agent framework for intelligent chat responses |
| **JWT & Cookie Parser** | Token-based secure session handling |
| **Multer** | Multipart/form-data handling for file uploads |
| **Nodemailer** | Email notification service |

---

## 📂 Project Architecture

```
InternshipHub/
├── backend/
│   ├── adapters/          # Data adapters (MongoDB & Internship adapters)
│   ├── ai/                # LangChain & OpenAI AI agent logic
│   ├── config/            # Database connection configuration
│   ├── controllers/       # Route controllers (Auth, Jobs, Companies, AI, Users)
│   ├── middleware/        # Authentication & file upload middleware
│   ├── models/            # Mongoose schemas (User, Internship, Company)
│   ├── routes/            # Express route definitions
│   ├── scripts/           # DB seeding & web scraping scripts
│   ├── services/          # Job aggregator & external web scrapers
│   ├── utils/             # Helper functions (Email sender, validators)
│   └── server.js          # Entry point for backend Express server
│
├── frontend/
│   ├── public/            # Static assets & icons
│   ├── src/
│   │   ├── assets/        # Visual assets & images
│   │   ├── components/    # Reusable UI components (Navbar, AIChatBot, etc.)
│   │   ├── context/       # React Context (ThemeContext)
│   │   ├── layouts/       # Main layout wrapper
│   │   ├── pages/         # Page components (Home, Internships, Login, Profile)
│   │   ├── services/      # Axios API configuration
│   │   └── main.jsx       # React application root
│   └── vite.config.js     # Vite configuration
│
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### **Prerequisites**
Make sure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/)** (v18.0.0 or higher)
- **[npm](https://www.npmjs.com/)** (v9.0.0 or higher)
- **[MongoDB](https://www.mongodb.com/try/download/community)** (Running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

---

### 🐳 **Option 1: Quickstart with Docker (Recommended)**

You can launch the entire stack (**Frontend, Backend, and MongoDB Database**) in a single command using Docker:

```bash
docker compose up --build
```

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **MongoDB**: Listening on `localhost:27017`

---

### **Option 2: Manual Local Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/nick2726/Job_Huntr.git
cd Job_Huntr
```

---

### **2. Backend Setup**

Navigate to the `backend` folder, install dependencies, and set up your `.env` file:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (or copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/internshiphub
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key
```

#### **Seed Initial Database Data**
To populate your local MongoDB with sample internship data:

```bash
node scripts/seed.js
# Or seed India specific listings:
node scripts/seedIndiaJobs.js
```

#### **Start Backend Server**

```bash
# Development mode (with auto-reload via nodemon)
npm run dev

# Production mode
npm start
```
*Backend server will start on `http://localhost:5000`*

---

### **3. Frontend Setup**

Open a new terminal window, navigate to the `frontend` directory, and install dependencies:

```bash
cd frontend
npm install
```

#### **Start Frontend Dev Server**

```bash
npm run dev
```
*Frontend app will be available at `http://localhost:5173`*

---

## 📡 API Reference Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login user & return JWT token | ❌ |
| `GET` | `/api/auth/me` | Get current logged-in user details | ✅ |
| `GET` | `/api/internships` | List internships with search & filters | ❌ |
| `GET` | `/api/internships/:id` | Get detailed internship information | ❌ |
| `POST` | `/api/internships` | Post a new internship listing (Recruiter) | ✅ |
| `POST` | `/api/bookmarks/:id` | Bookmark / Save an internship | ✅ |
| `GET` | `/api/bookmarks` | Fetch user's saved bookmarks | ✅ |
| `POST` | `/api/ai/chat` | Send prompt to AI Career Assistant | ✅ |
| `GET` | `/api/companies` | List featured hiring companies | ❌ |

---

## 🛡️ Environment & Security Best Practices

- Secret keys, database credentials, and OpenAI API keys are kept strictly in `.env`.
- `.env` files are ignored via `.gitignore` to prevent accidental credential leaks.
- Role-based authorization middleware ensures recruiters and students have strict access scopes.

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
