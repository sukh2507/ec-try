const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    stream: {
      type: String,
      enum: ["Sciences", "Humanities", "Commerce"],
      required: true,
    },
    subjects: {
      type: [
        {
          type: String,
          enum: [
            "Physics",
            "Chemistry",
            "Biology",
            "History",
            "Geography",
            "Psychology",
            "Economics",
            "Business Studies",
            "Accountancy",
          ],
        },
      ],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "Subjects array must have at least one subject.",
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", teacherSchema);
