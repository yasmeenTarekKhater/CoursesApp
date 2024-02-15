const express = require("express");
const router = express.Router();
const {
  getCourse,
  getAllCourses,
  updateCourse,
  addCourse,
  deleteCourse,
} = require("../controllers/courses.controller");
const {validationSchema} = require("../middlewares/coursesValidationShema");
const verifyToken = require("../middlewares/veritfyToken");
const userRole = require("../utils/userRole");
const allowTo = require("../middlewares/allowTo");

//______________________CRUD OPERATION____________________________
//Route === Resource
router.route("/")
  .get(getAllCourses)
  .post(
    verifyToken,
    allowTo(userRole.ADMIN),
    validationSchema(),
    addCourse
  );
router.route("/:id")
    .get(getCourse)
    .patch(updateCourse)
    .delete(verifyToken,allowTo(userRole.ADMIN,userRole.MANAGER),deleteCourse);
//______________________END CRUD OPERATION____________________________
module.exports = router;
