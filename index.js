const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const { userRouter } = require("./routers/userRouter.js");
const { adminRouter } = require("./routers/adminRouter.js");
const { courseRouter } = require("./routers/courseRouter.js");

require('dotenv').config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected")
}

main();

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log(`serving on http://localhost:${process.env.PORT}`);
})