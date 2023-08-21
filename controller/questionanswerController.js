const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");
const User = require("../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
exports.getAllQuestions = async (req, res) => {
  try {
    // console.log(req.cookies.jwt);
    // token = req.cookies.jwt;
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded.id);
    const questions = await Question.find();
    res.status(200).json({
      status: "success",
      data: {
        questions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const questions = await Question.findById(req.params.id).populate("answers");
    res.status(200).json({
      status: "success",
      data: {
        questions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.postQuestion = async (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = decoded.id;
    const tags = req.body.tags;
    const newQuestion = await Question.create({ title, body, user, tags });
    newQuestion
      .save()
      .then((newQuestion) => {
        User.findOneAndUpdate(
          { _id: newQuestion.user },
          { $push: { questions: newQuestion._id }, new: true }
        )
          .then((user) => {
            res.status(201).json({
              status: "success",
              data: {
                question: newQuestion,
              },
            });
          })
          .catch((err) => {
            res.status(400).json({
              status: "fail",
              message: err,
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          message: err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        question: updateQuestion,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const deleteQuestion = await Question.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: "Question deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.writeanswer = async (req, res) => {
  try {
    const body = req.body.body;
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = decoded.id;
    const question = req.params.id;
    const answer = await Answer.create({ body, user, question });
    await Question.findOneAndUpdate(
      { _id: answer.question },
      { $push: { answers: answer._id } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: answer.user },
      { $push: { answers: answer._id } },
      { new: true }
    );
    res.status(201).json({
      status: "success",
      data: {
        answer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const key= req.params.key;
    const questions = await Question.find({
      $or:[
        {title:{$regex:key,$options:'i'}},
        {body:{$regex:key,$options:'i'}},
        {tags:{$regex:key,$options:'i'}}
      ]
    },{ _id: 0 }).populate("answers");
    res.status(200).json({
      status: "success",
      data: {
        questions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}
