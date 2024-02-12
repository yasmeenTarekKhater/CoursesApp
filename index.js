const { ERROR } = require("./utils/httpStatusText");
const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const courseRouter = require("./routes/courses.route");
const userRouter = require("./routes/users.route");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("conect to server .........");
  })
  .catch(() => console.log("Canot connect to server!!!"));

//handle cors error (different origin between front and back)
app.use(cors());
//middleware enable me to read data in body request
app.use(express.json());
// app.use(bodyParser.json());
app.use("/api/courses", courseRouter);//====>courses routes
app.use("/api/users", userRouter);//===>users routes
//handle not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({ status: ERROR, message: "NOT FOUND" });
});
//async middleware Errors
app.use((error, req, res, next) => {
  res
    .status(error.statusCode || 500)
    .json({
      status: error.statusText || ERROR,
      message: error.message,
      code: error.statusCode,
      data: null,
    });
});
//listening port
app.listen(process.env.PORT || 4000, () => {
  console.log("listentig to pore 5000");
});
