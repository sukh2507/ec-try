const Student = require("../models/studentModel");
const Test = require("../models/testModel");

const getAllTests = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user._id });
    const tests = await Test.find()
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
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
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

module.exports = {
  getAllTests,
  requestATest,
};
