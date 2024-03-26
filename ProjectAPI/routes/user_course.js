const express = require("express");
const router = express.Router();
const UserCourse = require("../models/UserCourse");

// Create new user course
router.post("/", async (req, res) => {
  try {
    const userCourse = new UserCourse({
      user_id: req.body.user_id,
      course_id: req.body.course_id,
    });
    const result = await userCourse.save();
    res.status(201).json({
      message: "User course created successfully",
      userCourse: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all user courses
router.get("/", async (req, res) => {
  try {
    const userCourses = await UserCourse.find()
      .populate("user_id")
      .populate("course_id");
    res.status(200).json({
      userCourses: userCourses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read user course by ID
router.get("/:userCourseId", async (req, res) => {
  try {
    const id = req.params.userCourseId;
    const userCourse = await UserCourse.findById(id)
      .populate("user_id")
      .populate("course_id");
    if (userCourse) {
      res.status(200).json({
        userCourse: userCourse,
      });
    } else {
      res.status(404).json({
        message: "User course not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user course by ID
router.put("/:userCourseId", async (req, res) => {
  try {
    const id = req.params.userCourseId;
    const updateOps = {};
    //   can update only user_id or course_id or both
    if (req.body.user_id) {
      updateOps["user_id"] = req.body.user_id;
    }
    if (req.body.course_id) {
      updateOps["course_id"] = req.body.course_id;
    }
    await UserCourse.updateOne({ _id: id }, { $set: updateOps });
    const updatedUserCourse = await UserCourse.findById(id);
    if (!updatedUserCourse) {
      return res.status(404).send({message : "User course not found"})
    }
    res.status(200).json({
      message: "User course updated successfully",
      updatedUserCourse: updatedUserCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user course by ID
router.delete("/:userCourseId", async (req, res) => {
  try {
    const id = req.params.userCourseId;
    const result = await UserCourse.deleteOne({ _id: id });
    res.status(200).json({
      message: "User course deleted successfully",
      result: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
