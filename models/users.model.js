const mongoose = require("mongoose");
var validator = require('validator');
const userRole = require("../utils/userRole");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail,"feild must be email address"]
  },
  password: {
    type: String,
    required: true,
  },
  token:{
    type:String
  },
  role:{
    type:String,
    enum:[userRole.ADMIN,userRole.MANAGER,userRole.USER],
    default:userRole.USER 
  },
  avatar:{
    type:String,
    default:'uploads/avatar.jpg'
  }
});
const usersModel = mongoose.model("User", userSchema);
module.exports = usersModel;
