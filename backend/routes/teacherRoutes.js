import express from "express";
import protect from "../middlewares/authMiddleware.js";
import verify from "../middlewares/verifyMiddleware.js";
import {
  teacherHome,
  createTest,
  updateTest,
  getAllTests,
} from "../controllers/teacherControllers.js";

const router = express.Router();

router.use(protect(["teacher"]));
router.use(verify);

router.get("/", teacherHome);

router.post("/test", createTest);

router.put("/test/:id", updateTest);

router.get("/test", getAllTests);

export default router;
