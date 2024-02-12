const mongoose = require("mongoose");
var validator = require('validator');
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
  }
});
const usersModel = mongoose.model("User", userSchema);
module.exports = usersModel;
