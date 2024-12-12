const Test = require("../models/testModel");
const Teacher = require("../models/teacherModel");

const teacherHome = async (req, res) => {
  res.send({ msg: "Hello teacher" });
};

const createTest = async (req, res) => {
  try {
    const { name, description, price, questions } = req.body;
    if (!name || !description || !price || !questions)
      throw new Error("Please give all details");

    const teacher = await Teacher.findOne({ userId: req.user._id });

    const test = new Test({
      name: name,
      description: description,
      price: price,
      questions: questions,
      createdBy: teacher._id,
    });

    const testRes = await test.save();

    res.status(200).send({
      test: testRes,
      msg: {
        title: "Test Created Successfully! 🎉",
        desc: "The test will be live when the admin approves it. ✅",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, questions } = req.body;

    if (!name && !description && !price && !questions) {
      throw new Error("Please provide at least one field to update");
    }

    const test = await Test.findById(id);

    if (!test) {
      throw new Error("Test not found");
    }

    test.name = name || test.name;
    test.description = description || test.description;
    test.price = price || test.price;
    test.questions = questions || test.questions;

    const updatedTest = await test.save();

    res.status(200).send({
      test: updatedTest,
      msg: {
        title: "Test Updated Successfully! 🎉",
        desc: "The test has been successfully updated. ✅",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

module.exports = {
  teacherHome,
  createTest,
  updateTest,
};
