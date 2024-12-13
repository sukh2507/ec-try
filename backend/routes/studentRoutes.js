const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { verify } = require("jsonwebtoken");
const {
  getAllTests,
  requestATest,
} = require("../controllers/studentControllers");

router.use(protect(["student"]));
router.use(verify);

router.get("/test", getAllTests);

router.post("/test/:testId", requestATest);

module.exports = router;
