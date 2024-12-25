import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "./jobs/cleanup.js";
import connectDB from "./config/db.js";
import homeRoutes from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";

import protectRoutes from "./routes/protectRoutes.js";

import teacherRoutes from "./routes/teacherRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import { crossOrigin } from "./middlewares/corsMiddleware.js";
import path from "path";

const app = express();

//!Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
crossOrigin(app);
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
