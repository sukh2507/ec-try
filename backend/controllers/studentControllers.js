const Student = require("../models/studentModel");
const Test = require("../models/testModel");
const Submission = require("../models/submissionModel");

const getAllTests = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const tests = await Test.find({
      isVerified: true,
      requestedBy: { $nin: [student._id] },
      purchasedBy: { $nin: [student._id] },
    })
      .populate({
        path: "createdBy",
        populate: { path: "userId", select: "name email" },
        select: "stream subjects",
      })
      .select("-__v -questions -isVerified");
    res.status(200).send({ tests: tests });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const requestATest = async (req, res) => {
  try {
    const { testId } = req.params;
    const student = await Student.findOne({ userId: req.user._id });
    const updatedTest = await Test.findOneAndUpdate(
      { isVerified: true, _id: testId },
      { $push: { requestedBy: student._id } },
      { new: true },
    )
      .populate({
        path: "createdBy",
        populate: { path: "userId", select: "name email" },
        select: "stream subjects",
      })
      .select("-__v -questions -isVerified");

    res.status(200).send({
      msg: {
        title: "📸 Send Payment Screenshot on WhatsApp 📲",
        desc: "✅ After verification, you will be allowed to solve the test. 📝",
      },
      test: updatedTest,
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const getTestsByPaymentStatus = async (req, res) => {
  try {
    const { paid } = req.query;

    if (paid === undefined || !["0", "1"].includes(paid)) {
      throw new Error(
        "❌ Invalid or missing 'paid' query parameter. Use '0' for unpaid or '1' for paid.",
      );
    }

    const isPaid = paid === "1";

    const student = await Student.findOne({ userId: req.user._id });
    let tests;
    if (isPaid) {
      tests = await Test.find({
        isVerified: true,
        purchasedBy: { $in: [student._id] },
      })
        .populate({
          path: "createdBy",
          populate: { path: "userId", select: "name email" },
          select: "stream subjects",
        })
        .select("-__v -questions -isVerified");
    } else {
      tests = await Test.find({
        isVerified: true,
        requestedBy: { $in: [student._id] },
      })
        .populate({
          path: "createdBy",
          populate: { path: "userId", select: "name email" },
          select: "stream subjects",
        })
        .select("-__v -questions -isVerified");
    }

    res.status(200).json({
      tests: tests,
    });
  } catch (error) {
    res.status(400).json({ msg: { title: error.message } });
  }
};

const addMarks = async (req, res) => {
  try {
    const { marks } = req.body;

    const student = await Student.findOne({ userId: req.user._id });
    const studentId = student._id;

    const { testId } = req.params;

    if (!testId || !marks) {
      throw new Error(
        "❌ All fields are required! Please provide testId and marks.",
      );
    }

    const timeOfSubmission = new Date();

    let submission = await Submission.findOne({ testId, studentId });

    if (submission) {
      submission.marks.push({ timeOfSubmission, marks });
      await submission.save();
      return res.status(200).json({
        msg: { title: "✅ Marks entry added successfully! 🎉" },
        submission,
      });
    } else {
      submission = new Submission({
        testId,
        studentId,
        marks: [{ timeOfSubmission, marks }],
      });
      await submission.save();
      return res.status(201).json({
        message: "🆕 Submission created and marks added successfully! 🚀",
        submission,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      msg: {
        title:
          "⚠️ An error occurred while adding marks. Please try again later.",
      },
    });
  }
};

module.exports = {
  getAllTests,
  requestATest,
  getTestsByPaymentStatus,
  addMarks,
};
