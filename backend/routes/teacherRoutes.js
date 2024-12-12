const express = require("express");
const protect = require("../middlewares/authMiddleware");
const verify = require("../middlewares/verifyMiddleware");
const {
  teacherHome,
  createTest,
  updateTest,
  getAllTests,
} = require("../controllers/teacherControllers");
const router = express.Router();

router.use(protect(["teacher"]));
router.use(verify);

router.get("/", teacherHome);

router.post("/test", createTest);

router.put("/test/:id", updateTest);

router.get("/test", getAllTests);

module.exports = router;
