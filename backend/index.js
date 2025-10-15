import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables
dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Determine environment
const isProduction = process.env.NODE_ENV === "production";

// CORS setup for development
if (!isProduction) {
  const corsOptions = {
    origin: "http://localhost:5173", // frontend dev server
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Connect to database
connectDB();

// ---------------- API ROUTES ---------------- //
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ---------------- TEST ROUTE ---------------- //
// Optional: quick test to check API
app.get("/api/test", (req, res) => {
  res.json({ message: "API is running!" });
});

// ----------------- FRONTEND SERVING ----------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (isProduction) {
  // Serve static frontend files
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for all unknown routes
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running in development mode");
  });
}

// ----------------- START SERVER ----------------- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
