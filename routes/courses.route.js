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

//______________________CRUD OPERATION____________________________
//Route === Resource
router.route("/")
  .get(getAllCourses)
  .post(
    validationSchema(),
    addCourse
  );
router.route("/:id")
    .get(getCourse)
    .patch(updateCourse)
    .delete(deleteCourse);
//______________________END CRUD OPERATION____________________________
module.exports = router;
