// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const Courses = require("../models/courses.model");
const {SUCCESS,FAIL,ERROR}=require("../utils/httpStatusText");

const getAllCourses = async (req, res) => {
  const courses = await Courses.find({},{__v:0}); //acsess data base
  res.json({status:SUCCESS,data:{courses}}); //jsend standard
  // res.json(courses); static data
};

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Courses.findById({_id:courseId},{__v:0});
    if (!course) {
      return res.status(404).json({status:FAIL,data:{course:"Course Not Found"}});
    }
    return res.json({status:SUCCESS,data:{course}});
  } catch(err) {
    return res.status(400).json({status:ERROR,msg:err.message});
  }

  // const course = courses.find((course) => course.id === courseId);
  // if (!course) {
  //   //status 404 beacuse not return 200 ok when course not found
  //   return res.status(404).json({ msg: "course Not Found" });
  // }
  // res.json(course);
};

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({status:FAIL,msg:errors.array()});
  }
  const newCourse = await Courses.insertMany(req.body);
  res.status(201).json({status:SUCCESS,data:{course:newCourse}});
  // const newCourse = { id: courses.length + 1, ...req.body };
  // courses.push(newCourse);
  // res.status(201).json(newCourse);
  // if(!req.body.title)return res.status(400).json({msg:"title should be entered"});
  // if(!req.body.price)return res.status(400).json({msg:"price should be entered"});
};

const updateCourse = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedCourse = await Courses.findByIdAndUpdate({_id:requestId}, req.body);
    return res.json({status:SUCCESS,data:{course:updatedCourse}});
  } catch (err) {
    return res.status(400).json({status:ERROR,msg:err.message});
  }

  // const requestId = +req.params.id;
  // let course = courses.find((course) => course.id === requestId);
  // if (course) {
  //   course = { ...course, ...req.body };
  //   res.send(course);
  // } else {
  //   res.status(404).json({ msg: "Not Found" });
  // }
};

const deleteCourse = async (req, res) => {
  try{
    const requestId = req.params.id;
    await Courses.findByIdAndDelete({_id:requestId});
    return res.json({status:SUCCESS,data:null});
  }catch(err){
    return res.status(400).json({status:ERROR,msg:err.message});
  }
  
  // const requestId = +req.params.id;
  // let course = courses.find((course) => course.id === requestId);
  // if (course) {
  //   courses = courses.filter((course) => course.id !== requestId);
  //   res.json({ msg: "deleted sussesfuly" });
  // } else {
  //   res.status(404).json({ msg: "Not Found" });
  // }
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
