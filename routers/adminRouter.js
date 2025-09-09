const express = require('express');
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const { signinHandler, signupHandler } = require("../controllers/signController");
const { userModel, courseModel } = require('../db');
const setUserType = function (req, res, next) {
    req.userType = "admin"
    next();
}

const auth = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.json({
            message: "please login"
        })
    }
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log(user);
        const { userId } = user;
        const findInDB = await userModel.findOne({
            _id: userId
        })
        if (findInDB && findInDB.type == 'admin') {
            req.user = { ...user, type: "admin" };
            next();
        }
        else {
            res.json({
                message: "unautharize"
            })
        }
    } catch (err) {
        return res.json({
            message: err.message
        })
    }
}



const uploadCourseHandler = async function (req, res) {
    const { title, imageUrl, price, description } = req.body;
    if (!title || !imageUrl || !price || !description) {
        return res.json({
            message: "provide (title, imageUrl, price, description)"
        })
    }
    // console.log(req.user.userId);
    let createrId = req.user.userId;
    // console.log("hi");
    const newCourse = new courseModel({
        title, imageUrl, price, description, createrId
    });
    // console.log("after course model");
    try {
        await newCourse.save();
        res.json({
            message: "New course added"
        })
    }
    catch (err) {
        res.json({
            message: "Database error"
        })
    }
}

const updateCourseHandler = function (req, res) {
    res.json({
        message: "upload course handler"
    });
}




adminRouter.post("/signin", setUserType, signinHandler);
adminRouter.post('/signup', setUserType, signupHandler);
adminRouter.post("/courses", auth, uploadCourseHandler);
adminRouter.put("/courses/", auth, updateCourseHandler);

module.exports = { adminRouter: adminRouter };