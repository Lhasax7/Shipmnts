const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {promisify} = require('util');
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const sendCookie = (token, res) => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);
    sendCookie(token, res)
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email: email }).select("+password");
    const correct = await user.correctPassword(password, user.password);
    console.log(correct);
    if (!user || !correct) {
      res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    const token = signToken(user._id);
    console.log(correct);
    sendCookie(token, res)
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {}
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() ),
    httpOnly: true,
  });
  res.status(200).json(
    {
      status: "success"
    }
  );
};
exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    if(!token){
        res.status(401).json({
            status: 'fail',
            message: 'You are not logged in'
        });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log("abc"+decoded.id);
    const currentUser = await User.findById(decoded.id);
    if(!currentUser){
        res.status(401).json({
            status: 'fail',
            message: 'The user belonging to this token does no longer exist'
        });
    }
    next();
};