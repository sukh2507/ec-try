const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        throw new Error();
      }

      const now = new Date();
      const decoded = jwt.verify(token, process.env.TOKEN);
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new Error();
      }

      if (user.verificationTokenExpires < now) {
        throw new Error();
      }

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).send({
          msg: {
            title: "Access Denied! 🚫",
            details: "You do not have permission to access this resource.",
          },
        });
      }

      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      };

      next();
    } catch (error) {
      res.status(401).send({
        msg: {
          title: "Authentication Failed! 🧑🏻‍💻",
        },
      });
    }
  };
};

module.exports = protect;
