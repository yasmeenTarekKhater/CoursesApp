let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    //status 404 beacuse not return 200 ok when course not found
    return res.status(404).json({ msg: "course Not Found" });
  }
  res.json(course);
};

const addCourse = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const newCourse = { id: courses.length + 1, ...req.body };
    courses.push(newCourse);
    res.status(201).json(newCourse);
  } else {
    res.status(400).json(errors.array());
  }
  // if(!req.body.title)return res.status(400).json({msg:"title should be entered"});
  // if(!req.body.price)return res.status(400).json({msg:"price should be entered"});
};

const updateCourse = (req, res) => {
  const requestId = +req.params.id;
  let course = courses.find((course) => course.id === requestId);
  if (course) {
    course = { ...course, ...req.body };
    res.send(course);
  } else {
    res.status(404).json({ msg: "Not Found" });
  }
};

const deleteCourse = (req, res) => {
  const requestId = +req.params.id;
  let course = courses.find((course) => course.id === requestId);
  if (course) {
    courses = courses.filter((course) => course.id !== requestId);
    res.json({ msg: "deleted sussesfuly" });
  } else {
    res.status(404).json({ msg: "Not Found" });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
