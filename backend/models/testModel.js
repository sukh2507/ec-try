const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      min: [1, "Time must be at least 1 minute"],
      max: [180, "Time must not exceed 180 minutes"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    questions: [
      {
        title: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: true,
          validate: {
            validator: (arr) => arr.length === 4,
            message: "There must be exactly 4 options",
          },
        },
        solution: {
          type: Number,
          required: true,
          validate: {
            validator: (index) => index >= 0 && index < 4,
            message: "Solution must be a valid index between 0 and 3",
          },
        },
      },
    ],
    purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    requestedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Test", testSchema);
