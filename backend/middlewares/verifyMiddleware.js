const verify = async (req, res, next) => {
  if (req.user.role === "student") {
    if (req.user.isVerified === 1) return next();
    else {
      res.status(403).send({
        msg: {
          title: "Your account is not verified! 🤪",
        },
      });
    }
  } else if (req.user.role === "teacher")
    if (req.user.isVerified === 2) return next();
    else {
      if (req.user.isVerified === 1)
        res.status(403).send({
          msg: {
            title: "Please wait until admin allows you to use the app! 🤪",
          },
        });
      else {
        res.status(403).send({
          msg: {
            title: "Your account is not verified! 🤪",
          },
        });
      }
    }
};
export default verify;
