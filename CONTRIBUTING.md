# Contributing to JobHuntr

Thank you for taking the time to contribute to **JobHuntr**! We welcome bug fixes, feature enhancements, documentation improvements, and feedback.

---

## 🚀 How to Contribute

### 1. Fork & Clone the Repository

```bash
git clone https://github.com/nick2726/Job_Huntr.git
cd Job_Huntr
```

### 2. Create a Feature Branch

Follow standard branch naming conventions:
- `feat/feature-name` (For new features)
- `fix/bug-name` (For bug fixes)
- `docs/documentation-update` (For documentation changes)

```bash
git checkout -b feat/add-new-scraper
```

### 3. Local Development Setup

You can run the project using **Docker Compose** or **npm**:

```bash
# Option A: Docker Compose
docker compose up --build

# Option B: Manual Setup
cd backend && npm install && npm run dev
cd ../frontend && npm install && npm run dev
```

### 4. Code Standards & Quality Checks

Before committing your changes, ensure:
- Frontend code passes Oxlint (`cd frontend && npm run lint`)
- Frontend production build succeeds (`cd frontend && npm run build`)
- Backend code has no syntax errors (`cd backend && node --check server.js`)

### 5. Commit & Push

Write clear, descriptive commit messages using [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(scrapers): add new job scraper for Indeed API"
git push origin feat/add-new-scraper
```

### 6. Submit a Pull Request

Open a Pull Request against the `main` branch. Fill out the PR template with details of your changes.

---

## 📜 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.
