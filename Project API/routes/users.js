const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Create user/peserta
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.send({ savedUser });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Read semua user/peserta
router.get("/", async (req, res) => {
  try {
    const allusers = await User.find({});
    res.send({ allusers });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Read user/peserta berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update user/peserta berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name, email, password: hashedPassword } },
      { new: true }
    );
    if (!userUpdate) return res.status(404).send({ message: "User not found" });
    res.send({ userUpdate });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Menghapus user/peserta berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const userDelete = await User.findOneAndRemove({ _id: req.params.id });
    if (!userDelete) return res.status(404).send({ message: "User not found" });
    res.send({ userDelete });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
