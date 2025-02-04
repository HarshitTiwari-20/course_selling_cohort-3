const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/users");
const { CourseRouter } = require("./routes/course");

const app = express();

app.use("/user", userRouter);
app.use("/course", CourseRouter);
//createCourseRoutes(app);
//createUserRoutes(app);

app.listen(3000);
