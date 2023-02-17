const express = require("express");
const router = express.Router();
const UserCourse = require("../models/UserCourse");

// Create kelas peserta baru
router.post("/", (req, res) => {
  const userCourse = new UserCourse({
    user_id: req.body.user_id,
    course_id: req.body.course_id,
  });
  userCourse
    .save()
    .then((result) => {
      res.status(201).json({
        message: "User course created successfully",
        userCourse: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Read semua kelas peserta
router.get("/", (req, res) => {
  UserCourse.find()
    .populate("user_id")
    .populate("course_id")
    .exec()
    .then((userCourses) => {
      res.status(200).json({
        userCourses: userCourses,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Read kelas peserta berdasarkan ID
router.get("/:userCourseId", (req, res) => {
  const id = req.params.userCourseId;
  UserCourse.findById(id)
    .populate("user_id")
    .populate("course_id")
    .exec()
    .then((userCourse) => {
      if (userCourse) {
        res.status(200).json({
          userCourse: userCourse,
        });
      } else {
        res.status(404).json({
          message: "User course not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Update kelas peserta berdasarkan ID
router.put("/:userCourseId", (req, res) => {
  const id = req.params.userCourseId;
  const updateOps = {};
  //   bisa mengupdate hanya user_id atau course id dan juga keduanya
  if (req.body.user_id) {
    updateOps["user_id"] = req.body.user_id;
  }
  if (req.body.course_id) {
    updateOps["course_id"] = req.body.course_id;
  }
  UserCourse.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(() => {
      return UserCourse.findById(id).exec();
    })
    .then((updatedUserCourse) => {
      res.status(200).json({
        message: "User course updated successfully",
        updatedUserCourse: updatedUserCourse,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Delete kelas peserta berdasarkan ID
router.delete("/:userCourseId", (req, res) => {
  const id = req.params.userCourseId;
  UserCourse.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User course deleted successfully",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
