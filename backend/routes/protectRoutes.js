const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const verify = require("../middlewares/verifyMiddleware");
const { checkLogin } = require("../controllers/protectControllers");

router.get("/", protect(["student", "teacher"]), verify, checkLogin);

module.exports = router;
