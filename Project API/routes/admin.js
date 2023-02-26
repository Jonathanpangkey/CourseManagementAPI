const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Admin = require("../models/Admin");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const newUser = new Admin({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const savedUser = await newUser.save();
    res.send(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message: err,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: info,
      });
    }
    return res.status(200).json({
      message: "Login Successful",
    });
  })(req, res, next);
});

module.exports = router;
