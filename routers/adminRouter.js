const express = require('express');
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const { signinHandler, signupHandler } = require("../controllers/signController");
const { userModel, courseModel } = require('../db');
const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId;
const setUserType = function (req, res, next) {
    req.userType = "admin"
    next();
}

const auth = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "please login"
        })
    }
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        const { userId } = user;
        const findInDB = await userModel.findOne({
            _id: userId
        })
        if (findInDB && findInDB.type == 'admin') {
            req.user = { ...user, type: "admin" };
            next();
        }
        else {
            res.status(401).json({
                message: "unautharize"
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



const uploadCourseHandler = async function (req, res) {
    const { title, imageUrl, price, description } = req.body;
    if (!title || !imageUrl || !price || !description) {
        return res.status(400).json({
            message: "provide (title, imageUrl, price, description)"
        })
    }
    let createrId = req.user.userId;
    const newCourse = new courseModel({
        title, imageUrl, price, description, createrId
    });
    try {
        await newCourse.save();
        res.status(201).json({
            message: "New course added"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Database error"
        })
    }
}

const updateCourseHandler = async function (req, res) {
    const courseId = req.params.id;
    const { title, imageUrl, price, description } = req.body;
    try {
        const updatedCourse = await courseModel.findOneAndUpdate(
            {
                _id: courseId,
                createrId: req.user.userId
            },
            {
                $set: {
                    title,
                    imageUrl,
                    description,
                    price
                }
            },
            {
                new: true
            }
        );
        if (!updatedCourse) {
            return res.status(404).json({
                message: "no course found"
            })
        }
        res.status(200).json({
            message: "successfully updated"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Provide valid course id"
        })
    }

}

adminRouter.post("/signin", setUserType, signinHandler);
adminRouter.post('/signup', setUserType, signupHandler);
adminRouter.post("/courses", auth, uploadCourseHandler);
adminRouter.put("/courses/update/:id", auth, updateCourseHandler);

module.exports = { adminRouter: adminRouter };