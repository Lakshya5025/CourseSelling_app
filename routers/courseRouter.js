const express = require('express');
const courseRouter = express.Router();
const { courseModel, purchaseModel } = require("../db.js");
const jwt = require('jsonwebtoken');
const getCourseDetailsHandler = async function (req, res) {
    const courseId = req.params.id;
    try {
        const course = await courseModel.findOne({
            _Id: courseId
        })
        res.status(200).json({
            message: "Success",
            course
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Database error",
            error: err.message
        })
    }
}

const getCoursesHandler = async function (req, res) {
    try {
        const courses = await courseModel.find({});
        console.log(courses);
        res.status(200).json({
            courses: courses
        })
    }
    catch (err) {
        res.status(200).json({
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
        if (alreadyPurchased.length > 0) {
            return res.status(400).json({
                message: "Already purchased"
            })
        }
        const newPurchase = new purchaseModel({
            userId,
            courseId
        })
        await newPurchase.save();
        res.status(201).json({
            message: "Keep learning"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const auth = async function (req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "login to puchase"
            })
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = { ...user };
        next();
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



courseRouter.get("/", getCoursesHandler);
courseRouter.get('/:id', getCourseDetailsHandler);
courseRouter.post("/:id/purchase", auth, purchaseHandler);

module.exports = { courseRouter: courseRouter };