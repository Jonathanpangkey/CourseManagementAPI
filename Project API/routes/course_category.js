const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Class Category model
const ClassCategory = require("../models/ClassCategory");

// Read semua kategori
router.get("/", async (req, res) => {
  try {
    const classCategories = await ClassCategory.find();
    res.json(classCategories);
  } catch (err) {
    res.status(404).json({ message: "No class categories found" });
  }
});

// Read salah satu kategori berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const classCategory = await ClassCategory.findById(req.params.id);
    if (classCategory) {
      res.json(classCategory);
    } else {
      res.status(404).json({ message: "Class category not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Menambahkan kategori
router.post("/add", async (req, res) => {
  const newClassCategory = new ClassCategory({
    name: req.body.name,
  });

  try {
    const classCategory = await newClassCategory.save();
    res.json(classCategory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Mengupdate kategori
router.put("/:id", async (req, res) => {
  try {
    const classCategory = await ClassCategory.findById(req.params.id);
    classCategory.name = req.body.name;
    const updatedClassCategory = await classCategory.save();
    res.json(updatedClassCategory);
  } catch (err) {
    res.status(404).json({ message: "Class category not found" });
  }
});

// Menghapus kategori
router.delete("/:id", async (req, res) => {
  try {
    const classCategory = await ClassCategory.findById(req.params.id);
    await classCategory.remove();
    res.json({ message: "Class category deleted" });
  } catch (err) {
    res.status(404).json({ message: "Class category not found" });
  }
});

module.exports = router;
