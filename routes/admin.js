const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");

const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  await adminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.json({
    message: "SignUp success",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect cred",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, prince } = req.body;
  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    createId: adminId,
  });
  res.json({
    message: " Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      createId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course update",
    courseId: course._id,
  });
  adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
      creatorId: adminId,
    });

    res.json({
      message: "Course updated",
      courses,
    });
  });

  module.exports = {
    adminRouter: adminRouter,
  };
});
