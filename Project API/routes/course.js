const express = require("express");

const Class = require("../models/Class");
const ClassCategory = require("../models/ClassCategory");

const router = express.Router();

// Membuat kelas baru
router.post("/", (req, res) => {
  const { title, classCategoryId } = req.body;
  ClassCategory.findById(classCategoryId)
    .then((classCategory) => {
      if (!classCategory) {
        return res
          .status(404)
          .json({ message: "Class category with that id not found" });
      }
      const newClass = new Class({
        title,
        classCategory: classCategory._id,
      });
      return newClass.save();
    })
    .then((classData) => {
      res.status(201).json({
        message: "Class created successfully",
        classData,
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Read semua kelas
router.get("/", (req, res) => {
  Class.find()
    .populate("classCategory")
    .then((classes) => {
      res.status(200).json({ classes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Read kelas berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Class.findById(id)
    .populate("classCategory")
    .then((classData) => {
      if (!classData) {
        return res.status(404).json({ message: "Class not found" });
      }
      res.status(200).json({ classData });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

// Update kelas berdasarkan ID
router.put("/:id", (req, res) => {
  const { title, classCategory } = req.body;
  Class.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { title, classCategory } },
    { new: true }
  )
    .then((classUpdate) => {
      res.send({ classUpdate });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

// Menghapus kelas berdasarkan ID
router.delete("/:id", (req, res) => {
  Class.findOneAndRemove({ _id: req.params.id })
    .then((classDelete) => {
      if (!classDelete)
        return res.status(404).send({ message: "Class not found" });
      res.send({ classDelete });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

module.exports = router;
