const express = require('express');

const courseRouter = express.Router();


const getCourseDetailsHandler = function (req, res) {
    res.json({
        message: "getcourseDetails handler"
    });
}

const getCoursesHandler = function (req, res) {
    res.json({
        message: "get courses handler"
    });
}



courseRouter.get("/", getCoursesHandler);
courseRouter.get('/:id', getCourseDetailsHandler);


module.exports = { courseRouter: courseRouter };