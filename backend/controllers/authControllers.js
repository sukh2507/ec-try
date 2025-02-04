import User from "../models/userModel.js";
import Teacher from "../models/teacherModel.js";
import Student from "../models/studentModel.js";

import sendEmail from "../utils/sendEmail.js";

import {
  expiry,
  generatePwdToken,
  generateVerificationToken,
} from "../utils/verificationToken.js";

import generateToken from "../utils/generateToken.js";

import {
  emailVerificationMessage,
  changeEmailVerficationMessage,
  forgetPwdVerificationMessage,
} from "../emails/verificationMessages.js";

import {
  emailVerificationNotification,
  changeEmailVerificationNotification,
  changePasswordNotification,
} from "../emails/notificationMessages.js";

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    res.status(500).send({ msg: { title: error.message } });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, stream, subjects } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !password ||
      !role ||
      !stream ||
      !subjects
    ) {
      throw new Error("Please give all details. 🥸");
    }
    const now = new Date();
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists?.isVerified === true) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires > now) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires < now) {
      await User.findByIdAndDelete(userExists._id);
    }

    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300), //5 min
    });

    await user.save();
    if (user.role === "teacher") {
      const teacher = new Teacher({
        userId: user._id,
        stream: stream,
        subjects: subjects,
      });
      await teacher.save();
    } else {
      const student = new Student({
        userId: user._id,
        stream: stream,
        subjects: subjects,
      });
      await student.save();
    }

    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    return res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        role: user.role,
        token: generateToken(user._id),
      },
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Please verify your account to continue.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const verifyToken = async (req, res) => {
  try {
    if (req.user.isVerified >= 1) throw new Error("User already verified. 🤨");
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid or expired token. 😣");
    }

    user.isVerified = 1;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const message = emailVerificationNotification(user);
    sendEmailNotification(user.email, message.subject, message.body);

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const regenerateToken = async (req, res) => {
  try {
    if (req.user.isVerified >= 1) throw new Error("User already verified. 🤨");
    const user = await User.findById(req.user._id);
    user.verificationToken = generateVerificationToken();
    await user.save();

    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    res.status(200).send({
      msg: {
        title: "Verification code sent! 💥",
        desc: "Check your mailbox.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password)
      throw new Error("Please give email and password. 👀");
    const user = await User.findOne({ email: email });
    if (user) {
      const hehe = await user.matchPassword(password);
      if (hehe) {
        return res.status(200).send({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
            token: generateToken(user._id, rememberMe),
          },
          msg: {
            title: "Authentication successfull! 🤩",
            desc: "Welcome Back.",
          },
        });
      } else throw new Error("Incorrect password. ✋🏻");
    } else {
      throw new Error("The email you have provided doesn't exist. 🤪");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      const hehe = await user.matchPassword(oldPassword);
      if (hehe) {
        user.password = newPassword;
        await user.save();

        const message = changePasswordNotification(user);
        await sendEmailNotification(user.email, message.subject, message.body);

        res.status(200).send({
          msg: {
            title: "Password Changed! 🎉",
            desc: "Its a good idea to change your password once in a while.",
          },
        });
      } else {
        throw new Error("Old password doesn't match. 😱");
      }
    } else {
      throw new Error("User doesn't exist. 🤯");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    const user = await User.findById(req.user._id);
    const newUser = await User.findOne({ email: newEmail });
    if (newUser) throw new Error("Requested email is already registered. 🫢");

    if (!user)
      throw new Error("Login again and then initiate this request. 😴");
    else {
      const hehe = await user.matchPassword(password);
      if (hehe) {
        user.newEmail = newEmail;
        user.newEmailToken = generateVerificationToken();
        user.newEmailExpires = expiry(300); //5 mins

        await user.save();

        const message = changeEmailVerficationMessage(user);

        await sendEmailNotification(
          user.newEmail,
          message.subject,
          message.body,
        );

        res.status(200).send({
          msg: {
            title: "Email change request initiated! 🎊",
            desc: "Check your mailbox to continue.",
          },
        });
      } else {
        throw new Error("Password Incorrect. 🤡");
      }
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const verifyChangeEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      _id: req.user._id,
      newEmailExpires: { $gt: Date.now() },
    });
    if (user) {
      if (await User.findOne({ email: user.newEmail }))
        throw new Error("Requested email is already registered. 🤧");

      if (user.newEmailToken === token) {
        const message = changeEmailVerificationNotification(user);

        user.email = user.newEmail;
        user.newEmail = undefined;
        user.newEmailExpires = undefined;
        user.newEmailToken = undefined;

        await user.save();

        await sendEmailNotification(user.email, message.subject, message.body);

        res.status(200).send({
          msg: { title: "Your email is changed! 🥂" },
          newEmail: user.email,
        });
      } else {
        throw new Error("Incorrect or expired token! ✋🏻");
      }
    } else {
      throw new Error("Invalid link. 😔");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const forgetPasswordInitiate = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User does not exist in the database. 😛");
    else {
      user.forgetPasswordToken = generatePwdToken();
      user.forgetPasswordExpires = expiry(300);
      await user.save();

      const message = forgetPwdVerificationMessage(user);
      await sendEmailNotification(user.email, message.subject, message.body);

      res.status(200).send({
        msg: {
          title: "Password recovery request initiated! 🤨",
          desc: "Check your mailbox to continue.",
        },
      });
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const verifyForgetPasswordRequest = async (req, res) => {
  try {
    const email = req.params.email;
    const token = req.params.token;
    const { password } = req.body;
    const isTrue = await User.findOne({ email: email });
    if (isTrue && isTrue.forgetPasswordToken === token) {
      isTrue.password = password;
      isTrue.forgetPasswordExpires = undefined;
      isTrue.forgetPasswordToken = undefined;
      await isTrue.save();
      const message = changePasswordNotification(isTrue);
      await sendEmailNotification(isTrue.email, message.subject, message.body);
      res.status(200).send({
        msg: {
          title: "Password recovered! 😎",
          desc: "Please don't forget it again.",
        },
      });
    } else throw new Error("Invalid link! 🤧");
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};
