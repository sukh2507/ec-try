const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
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
          enum: ["JEE", "NEET", "CUET"],
        },
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Student", studentSchema);
