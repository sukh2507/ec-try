import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import "./jobs/cleanup.js";
import connectDB from "./config/db.js";
import homeRoutes from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors'
import protectRoutes from "./routes/protectRoutes.js";

import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
// import {crossOrigin } from "./middlewares/cosrsMiddleware.js";
import path from "path";
import userModel from "./models/userModel.js";
import studentModel from "./models/studentModel.js";
import teacherModel from "./models/teacherModel.js";
import testModel from "./models/testModel.js";
import submissionModel from "./models/submissionModel.js";

const app = express();
app.use(cors())
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const ADMIN = {
  email: "admin@example.com",
  password: "1234",
};

const admin = new AdminJS({
  resources: [
    {
      resource: userModel,
      options: {
        navigation: { name: "User Management" },
      },
    },
    {
      resource: studentModel,
      options: {
        navigation: { name: "Student Management" },
      },
    },
    {
      resource: teacherModel,
      options: {
        navigation: { name: "Teacher Management" },
      },
    },
    {
      resource: testModel,
      options: {
        navigation: { name: "Test Management" },
      },
    },
    {
      resource: submissionModel,
      options: {
        navigation: { name: "Submission Management" },
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "ExamChamp",
    logo: "https://your-logo-url.com/logo.png",
    favicon: "https://your-favicon-url.com/favicon.ico",
    styles: {
      ".adminjs_LoggedInFooter": { display: "none" },
    },
    // theme: {
    //   colors: {
    //     primary100: "#f0f4ff",
    //     primary500: "#1e90ff",
    //     accent: "#ffd700",
    //   },
    // },
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: "supersecretpassword", // Change this to a secure password
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: "anotherSuperSecret", // Change this to a secure key
  },
);

app.use(admin.options.rootPath, adminRouter);


//!Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// crossOrigin(app);
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protect", protectRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);

const __dirname1 = path.resolve();

app.get("*", (req, res) => res.redirect("/api"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Started on Port: " + PORT);
  connectDB();
});
