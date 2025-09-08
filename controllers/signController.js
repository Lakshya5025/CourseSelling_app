const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const { z } = require("zod");
const signupSchema = z.object({
    email: z.email("provide valid email address"),
    password: z.string("provide password as string"),
    firstName: z.string("provide first name as string"),
    lastName: z.string("provide last name as string"),
})
const signinSchema = z.object({
    email: z.email("Provide valid email address"),
    password: z.string("provide password as string")
})
const signinHandler = async function (req, res) {
    const isCorrectInputs = signinSchema.safeParse(req.body);
    if (isCorrectInputs.success) {
        const { email, password } = req.body;
        try {
            console.log(req.userType);
            const findUser = await userModel.findOne({
                email: email,
                type: req.userType
            })
            if (findUser) {
                let passmatch = await bcrypt.compare(password, findUser.password);
                if (passmatch) {
                    const userId = findUser._id;
                    const { firstName, email } = findUser;
                    const payload = { userId, firstName, email };
                    const token = await jwt.sign(payload, process.env.JWT_SECRET);
                    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
                    res.cookie('token', token, {
                        maxAge: oneDayInMilliseconds,
                        httpOnly: true,
                        secure: true,
                        path: '/'
                    });
                    res.json({
                        message: "Signed in successfully",
                        user: {
                            firstName: findUser.firstName,
                            email: findUser.email
                        }
                    });
                }
                else {
                    res.json({
                        message: "Incorrect email/password"
                    })
                }
            }
            else {
                res.json({
                    message: "Incorrect email/password"
                })
            }
        } catch (er) {
            res.json({
                message: "Database error"
            })
        }

    }
}
const signupHandler = async function (req, res) {
    console.log(req.body);
    const isCorrectInputs = signupSchema.safeParse(req.body);
    console.log(isCorrectInputs);
    if (isCorrectInputs.success) {
        let { email, password, firstName, lastName } = req.body;
        password = await bcrypt.hash(password, 10);
        let type = req.userType;
        const newUser = new userModel({
            email, password, firstName, lastName, type
        })
        try {
            await newUser.save();
            res.json({
                message: "added successfully"
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


module.exports = { signinHandler, signupHandler };