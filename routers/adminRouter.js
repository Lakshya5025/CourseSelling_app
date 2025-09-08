const express = require('express');
const jwt = require("jsonwebtoken");
const adminRouter = express.Router();
const { signinHandler, signupHandler } = require("../controllers/signController");
const { userModel } = require('../db');

const setUserType = function (req, res, next) {
    req.userType = "admin"
    next();
}
const uploadCourseHandler = function (req, res) {
    res.json({
        message: "upload course handler"
    });
}

const updateCourseHandler = function (req, res) {
    res.json({
        message: "upload course handler"
    });
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
        console.log(user);
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
    next();
}
adminRouter.post("/signin", setUserType, signinHandler);
adminRouter.post('/signup', auth, setUserType, signupHandler);
adminRouter.post("/courses", auth, uploadCourseHandler);
adminRouter.put("/courses/", auth, updateCourseHandler);

module.exports = { adminRouter: adminRouter };