const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Class Category model
const ClassCategory = require("../models/ClassCategory");

// Read semua kategori
router.get("/", (req, res) => {
  ClassCategory.find()
    .then((classCategories) => res.json(classCategories))
    .catch((err) =>
      res.status(404).json({ message: "No class categories found" })
    );
});

// Read salah satu kategori berdasarkan ID
router.get("/:id", (req, res) => {
  ClassCategory.findById(req.params.id)
    .then((classCategory) => res.json(classCategory))
    .catch((err) =>
      res.status(404).json({ message: "Class category not found" })
    );
});

// Menambahkan kategori
router.post("/add", (req, res) => {
  const newClassCategory = new ClassCategory({
    name: req.body.name,
  });

  newClassCategory
    .save()
    .then((classCategory) => res.json(classCategory))
    .catch((err) =>
      res.status(400).json({ message: err })
    );
});

// Mengupdate kategori
router.put("/:id", (req, res) => {
  ClassCategory.findById(req.params.id)
    .then((classCategory) => {
      classCategory.name = req.body.name;
      classCategory
        .save()
        .then((updatedClassCategory) => res.json(updatedClassCategory))
        .catch((err) =>
          res.status(400).json({ message: err })
        );
    })
    .catch((err) =>
      res.status(404).json({ message: "Class category not found" })
    );
});

// Menghapus kategori
router.delete("/:id", (req, res) => {
  ClassCategory.findById(req.params.id)
    .then((classCategory) => {
      classCategory
        .remove()
        .then(() => res.json({ message: "Class category deleted" }))
        .catch((err) =>
          res.status(400).json({ message: err})
        );
    })
    .catch((err) =>
      res.status(404).json({ message: "Class category not found" })
    );
});

module.exports = router;
