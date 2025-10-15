import express from "express";
import multer from "multer";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Register route with file upload
router.post("/register", upload.single("file"), register);

// Login & logout
router.post("/login", login);
router.get("/logout", logout);

// ✅ Profile update route with file upload and auth
router.post(
  "/profile/update",
  isAuthenticated,
  upload.single("file"), // multer parses multipart/form-data
  updateProfile
);

export default router;
