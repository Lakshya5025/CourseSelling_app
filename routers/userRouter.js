const express = require("express");
const userRouter = express.Router();
const { signinHandler, signupHandler } = require("../controllers/signController");

const setUserType = function (req, res, next) {
    req.userType = "user"
    next();
}

userRouter.post("/signin", setUserType, signinHandler);
userRouter.post('/signup', setUserType, signupHandler);
module.exports = { userRouter: userRouter };