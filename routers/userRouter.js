const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const { userModel } = require("../db");
const signinHandler = function (req, res) {
    res.json({
        message: "user singin handler"
    });
}

const signupHandler = async function (req, res) {
    console.log(req.body);
    let { email, password, firstName, lastName } = req.body;
    password = await bcrypt.hash(password, 10);
    let type = "user";
    const newUser = new userModel({
        email, password, firstName, lastName, type
    })
    try {
        await newUser.save();
        res.json({
            message: "user addedd successfully"
        })
    } catch (err) {
        console.log("Error saving new user ", err);
        res.json({
            message: "failed in adding user"
        })
    }
}

userRouter.post("/signin", signinHandler);
userRouter.post('/signup', signupHandler);



module.exports = { userRouter: userRouter };