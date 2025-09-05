const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const { userModel } = require("../db");
const { z } = require("zod");
const signinHandler = function (req, res) {
    res.json({
        message: "user singin handler"
    });
}
const userInpuValidator = z.object({
    email: z.email("provide valid email address"),
    password: z.string("provide password as string"),
    firstName: z.string("provide first name as string"),
    lastName: z.string("provide last name as string"),
})
const signupHandler = async function (req, res) {
    console.log(req.body);
    const isCorrectInputs = userInpuValidator.safeParse(req.body);
    console.log(isCorrectInputs);
    if (isCorrectInputs.success) {
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
    else {
        res.json({
            message: "Input validation failed"
        })
    }
}

userRouter.post("/signin", signinHandler);
userRouter.post('/signup', signupHandler);



module.exports = { userRouter: userRouter };