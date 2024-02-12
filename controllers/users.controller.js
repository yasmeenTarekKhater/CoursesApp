const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const asyncWrapper = require("../middlewares/asyncMiddleWare");
const Users = require("../models/users.model");
const appErrors = require("../utils/appErrors");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");
const generateToken = require("../utils/generateToken");

const getAllUsers = asyncWrapper(async (req, res) => {
  //=====================pagination====================
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  //=====================pagination====================

  const users = await Users.find({}, { __v: 0, password: 0 })
    .limit(limit)
    .skip(skip); //acsess data base
  res.json({ status: SUCCESS, data: { users } }); //jsend standard
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    appErrors.create("Password and Email are required", 400, FAIL);
    return next(appErrors);
  }
  const user = await Users.findOne({ email });
  if (!user) {
    appErrors.create("User not found", 400, FAIL);
    return next(appErrors);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    const token = await generateToken({email:user.email,id:user._id});

    return res.json({ status: SUCCESS, data:{token} });
  } else {
    appErrors.create("password or email are wrong", 400, FAIL);
    return next(appErrors);
  }
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await Users.findOne({ email });
  if (oldUser) {
    appErrors.create("this user is already exists", 400, FAIL);
    return next(appErrors);
  }
  //hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new Users({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  //generate token
  const token = await generateToken({email:newUser.email,id:newUser._id});
  newUser.token = token;

  await newUser.save();
  res.json({ status: SUCCESS, data: { newUser: newUser } });
});

module.exports = {
  getAllUsers,
  login,
  register,
};
