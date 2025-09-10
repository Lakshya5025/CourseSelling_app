const express = require('express');
const courseRouter = express.Router();
const { courseModel, purchaseModel } = require("../db.js");
const jwt = require('jsonwebtoken');
const getCourseDetailsHandler = async function (req, res) {
    const courseId = req.params.Id;
    try {
        const course = await courseModel.findOne({
            _Id: courseId
        })
        res.json({
            message: "Success",
            course
        })
    }
    catch (err) {
        res.json({
            message: "Database error",
            error: err.message
        })
    }
}

const getCoursesHandler = async function (req, res) {
    try {
        const courses = await courseModel.find({});
        console.log(courses);
        res.json({
            courses: courses
        })
    }
    catch (err) {
        res.json({
            message: "DB error",
            error: err.message
        })
    }
}

const purchaseHandler = async function (req, res) {
    const userId = req.user.userId;
    const courseId = req.params.id;
    try {
        const alreadyPurchased = await purchaseModel.find({
            userId,
            courseId
        })
        if (alreadyPurchased) {
            return res.json({
                message: "Already purchased"
            })
        }
        const newPurchase = new purchaseModel({
            userId,
            courseId
        })
        await newPurchase.save();
        res.json({
            message: "best of luck"
        })
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
    res.json({
        message: "purchase handler"
    })
}

const auth = async function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({
                message: "login to puchase"
            })
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = { ...user };
        next();
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}



courseRouter.get("/", getCoursesHandler);
courseRouter.get('/:id', getCourseDetailsHandler);
courseRouter.post("/:id/purchase", auth, purchaseHandler);

module.exports = { courseRouter: courseRouter };