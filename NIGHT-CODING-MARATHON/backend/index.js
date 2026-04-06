import dotenv from "dotenv";
dotenv.config();

import path from "node:path";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/database-config.js";
import {
  generateConceptExplanation,
  generateInterviewQuestions,
} from "./controller/ai-controller.js";
import { protect } from "./middlewares/auth-middleware.js";
import authRoutes from "./routes/auth-route.js";
import authSessions from "./routes/session-route.js";

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://interview-prep-ai-git-main-kaushik72s-projects.vercel.app/",
  "https://interview-prep-g6ujhnjp3-kaushik72s-projects.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sessions", authSessions);
// ✅ removed authQuestions (not defined anywhere)

// ✅ changed app.use → app.post for AI routes
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server running at port", process.env.PORT);
});
