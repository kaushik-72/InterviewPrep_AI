# Interview Prep AI

An AI-powered interview preparation app that generates role-specific questions and explains concepts using Google Gemini.

🔗 Live Demo: https://interview-prep-ai-puce.vercel.app/


## Features
- JWT-based authentication (register/login)
- Create interview sessions by role and experience
- AI-generated questions using Google Gemini
- Markdown-rendered answers
- Pin important questions
- Concept explanation for any question

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Axios
- React Router v6
- React Markdown
- React Hot Toast

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Google Gemini API (`@google/genai`)
- JWT Authentication
- bcryptjs

## Local Setup

### Backend
```bash
cd backend
npm install
```
Create a `.env` file in `backend/`:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
```
```bash
node index.js
```

### Frontend
```bash
cd frontend
npm install
```
Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:8000
```
```bash
npm run dev
```

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `PORT` | backend | Server port |
| `MONGODB_URI` | backend | MongoDB Atlas connection string |
| `JWT_SECRET` | backend | Secret for signing JWT tokens |
| `GEMINI_API_KEY` | backend | Google Gemini API key |
| `VITE_API_BASE_URL` | frontend | Backend base URL |

## Folder Structure
```
NIGHT-CODING-MARATHON/
├── backend/
│   ├── config/
│   ├── controller/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── utils/
    └── index.html
```