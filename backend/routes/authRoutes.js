const router = require("express").Router();
const protect = require("../middlewares/authMiddleware");
const userVerify = require("../middlewares/verifyMiddleware");

const {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
  changePassword,
  changeEmail,
  verifyChangeEmail,
  forgetPasswordInitiate,
  verifyForgetPasswordRequest,
} = require("../controllers/authControllers");

router.get("/", (req, res) => {
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

module.exports = router;
