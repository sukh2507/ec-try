import protect from "../middlewares/authMiddleware.js";
import userVerify from "../middlewares/verifyMiddleware.js";
import express from "express";
import {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
  changePassword,
  changeEmail,
  verifyChangeEmail,
  forgetPasswordInitiate,
  verifyForgetPasswordRequest,
} from "../controllers/authControllers.js";

const router = express.Router();
router.get("/", (_, res) => {
  res.send("Auth Routes");
});

router.post("/register", registerUser);

router.get(
  "/token/verify/:token",
  protect(["student", "teacher"]),
  verifyToken,
);

router.get(
  "/token/regenerate",
  protect(["student", "teacher"]),
  regenerateToken,
);

router.post("/login", login);

router.put(
  "/password",
  protect(["student", "teacher"]),
  userVerify,
  changePassword,
);

router.put("/email", protect(["student", "teacher"]), userVerify, changeEmail);

router.get(
  "/email/verify/:token",
  protect(["student", "teacher"]),
  userVerify,
  verifyChangeEmail,
);

router.put("/password/forget", forgetPasswordInitiate);

router.put("/password/verify/:email/:token", verifyForgetPasswordRequest);

export default router;
