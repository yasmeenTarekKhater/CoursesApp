// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Courses = require("../models/courses.model");
const asyncWrapper = require("../middlewares/asyncMiddleWare");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText");
const appError = require("../utils/appErrors");

const getAllCourses = asyncWrapper(async (req, res) => {
  //=====================pagination====================
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  //=====================pagination====================

  const courses = await Courses.find({}, { __v: 0 }).limit(limit).skip(skip); //acsess data base
  res.json({ status: SUCCESS, data: { courses } }); //jsend standard
  // res.json(courses); static data
});
const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Courses.findById({ _id: courseId }, { __v: 0 });
  if (!course) {
    appError.create("Course Not Found", 404, FAIL);
    // const error = new Error();
    // error.message = "Course Not Found";
    // error.statusCode = 404;
    return next(appError);

    // return res
    //   .status(404)
    //   .json({ status: FAIL, data: { course: "Course Not Found" } });
  }
  return res.json({ status: SUCCESS, data: { course } });
  // try {

  // } catch (err) {
  //   return res.status(400).json({ status: ERROR, msg: err.message });
  // }

  // const course = courses.find((course) => course.id === courseId);
  // if (!course) {
  //   //status 404 beacuse not return 200 ok when course not found
  //   return res.status(404).json({ msg: "course Not Found" });
  // }
  // res.json(course);
});
const addCourse = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    appError.create(errors.array(), 400, FAIL);
    return next(appError);
    // return res.status(400).json({ status: FAIL, msg: errors.array() });
  }
  const newCourse = await Courses.insertMany(req.body);
  res.status(201).json({ status: SUCCESS, data: { course: newCourse } });
  // const newCourse = { id: courses.length + 1, ...req.body };
  // courses.push(newCourse);
  // res.status(201).json(newCourse);
  // if(!req.body.title)return res.status(400).json({msg:"title should be entered"});
  // if(!req.body.price)return res.status(400).json({msg:"price should be entered"});
});
const updateCourse = asyncWrapper(async (req, res, next) => {
  const requestId = req.params.id;
  const updatedCourse = await Courses.findByIdAndUpdate(
    { _id: requestId },
    req.body
  );
  return res.json({ status: SUCCESS, data: { course: updatedCourse } });
  // try {

  // } catch (err) {
  //   return res.status(400).json({ status: ERROR, msg: err.message });
  // }

  // const requestId = +req.params.id;
  // let course = courses.find((course) => course.id === requestId);
  // if (course) {
  //   course = { ...course, ...req.body };
  //   res.send(course);
  // } else {
  //   res.status(404).json({ msg: "Not Found" });
  // }
});
const deleteCourse = asyncWrapper(async (req, res,next) => {
   const requestId = req.params.id;
    await Courses.findByIdAndDelete({ _id: requestId });
    return res.json({ status: SUCCESS, data: null });
  //   try {
   
  // } catch (err) {
  //   return res.status(400).json({ status: ERROR, msg: err.message });
  // }

  // const requestId = +req.params.id;
  // let course = courses.find((course) => course.id === requestId);
  // if (course) {
  //   courses = courses.filter((course) => course.id !== requestId);
  //   res.json({ msg: "deleted sussesfuly" });
  // } else {
  //   res.status(404).json({ msg: "Not Found" });
  // }
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
