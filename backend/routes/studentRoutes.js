import express from "express";
const router = express.Router();
import protect from "../middlewares/authMiddleware.js";
import verify from "../middlewares/verifyMiddleware.js";
import {
  getAllTests,
  requestATest,
  getTestsByPaymentStatus,
  addMarks,
  getTest,
} from "../controllers/studentControllers.js";

router.use(protect(["student"]));
router.use(verify);

router.get("/test", getAllTests);

router.get("/test/:testId/details", getTest);

router.post("/test/:testId", requestATest);

router.get("/test/query", getTestsByPaymentStatus);

router.post("/test/:testId/marks", addMarks);

export default router;
