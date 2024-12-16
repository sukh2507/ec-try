const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    marks: [
      {
        timeOfSubmission: {
          type: Date,
          required: true,
        },
        marks: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

submissionSchema.index({ testId: 1, studentId: 1 }, { unique: true });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
