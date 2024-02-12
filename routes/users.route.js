const express = require("express");
const {
  getAllUsers,
  login,
  register,
} = require("../controllers/users.controller");
const verifyToken = require("../middlewares/veritfyToken");
const router = express.Router();

router.route("/").get(verifyToken,getAllUsers);
router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;
