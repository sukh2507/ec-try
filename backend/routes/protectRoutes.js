import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import verify from "../middlewares/verifyMiddleware.js ";
import { checkLogin } from "../controllers/protectControllers.js";

router.get("/", protect(["student", "teacher"]), verify, checkLogin);
export default router;
