const express = require('express');

const adminRouter = express.Router();


const signinHandler = function (req, res) {
    res.json({
        message: "Admin signup handler"
    })
}

const signupHandler = function (req, res) {
    res.json({
        message: "admin singup handler"
    });
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

adminRouter.post("/signin", signinHandler);
adminRouter.post('/signup', signupHandler);
adminRouter.post("/courses", uploadCourseHandler);
adminRouter.put("/courses/", updateCourseHandler);

module.exports = { adminRouter: adminRouter };