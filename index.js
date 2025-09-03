const express = require('express');
const { userRouter } = require("./routers/userRouter.js");
const { adminRouter } = require("./routers/adminRouter.js");
const { courseRouter } = require("./routers/courseRouter.js");

require('dotenv').config({ path: ".env" });

const app = express();


app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log(`serving on http://localhost:${process.env.PORT}`);
})