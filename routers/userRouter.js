const express = require('express');
const userRouter = express.Router();

const signinHandler = function (req, res) {
    res.send("user singin handler");
}

const signupHandler = function (req, res) {
    res.send("user singup handler");
}

userRouter.post("/signin", signinHandler);
userRouter.post('/signup', signupHandler);



module.exports = { userRouter: userRouter };