import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // ✅ Try cookie first, then Authorization header
    const token =
      req.cookies?.token ||
      (req.headers?.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        message: "Authentication token missing",
        success: false,
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ Attach user ID (and maybe role/email if needed later)
    req.id = decoded.userId;
    // req.role = decoded.role; // optional if you ever store it in token

    next();
  } catch (error) {
    console.error("❌ JWT Authentication Error:", error.message);

    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Invalid or expired authentication token",
      success: false,
    });
  }
};

export default isAuthenticated;
