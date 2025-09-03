const express = require('express');

const courseRouter = express.Router();


const getCourseDetailsHandler = function (req, res) {
    res.send("getcourseDetails handler");
}

const getCoursesHandler = function (req, res) {
    res.send("get courses handler");
}

const uploadCourseHandler = function (req, res) {
    res.send("upload course handler");
}

courseRouter.get("/", getCoursesHandler);
courseRouter.post("/upload", uploadCourseHandler);
courseRouter.get('/:id', getCourseDetailsHandler);


module.exports = { courseRouter: courseRouter };