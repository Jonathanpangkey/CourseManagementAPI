const express = require("express");
const Class = require("../models/Class");
const ClassCategory = require("../models/ClassCategory");
const router = express.Router();

// Create a new class
router.post("/", async (req, res) => {
  try {
    const { title, classCategoryId } = req.body;
    const classCategory = await ClassCategory.findById(classCategoryId);
    if (!classCategory) {
      return res
        .status(404)
        .json({ message: "Class category with that id not found" });
    }
    const newClass = new Class({
      title,
      classCategory: classCategory._id,
    });
    const savedClass = await newClass.save();
    res.status(201).json({
      message: "Class created successfully",
      classData: savedClass,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Read all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find().populate("classCategory");
    res.status(200).json({ classes });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// Read class by ID
router.get("/:id", async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id).populate(
      "classCategory"
    );
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ classData });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});


// Update kelas berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const { title, classCategory } = req.body;
    const classUpdate = await Class.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, classCategory } },
      { new: true }
    );
    if (!classUpdate) {
      return res.status(404).send({message : "Course not found"});
    }
    res.send({ classUpdate });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Menghapus kelas berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const classDelete = await Class.findOneAndRemove({ _id: req.params.id });
    if (!classDelete) {
      return res.status(404).send({ message: "Class not found" });
    }
    res.send({ classDelete });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
