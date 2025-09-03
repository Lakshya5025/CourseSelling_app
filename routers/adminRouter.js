const express = require('express');

const adminRouter = express.Router();


const signinHandler = function (req, res) {
    res.send("admin singin handler");
}

const signupHandler = function (req, res) {
    res.send("admin singup handler");
}

adminRouter.post("/signin", signinHandler);
adminRouter.post('/signup', signupHandler);

module.exports = { adminRouter: adminRouter };