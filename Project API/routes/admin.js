const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load Admin model/skema
const Admin = require("../models/Admin");

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Admin.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(400).json({ message: "Email already exists." });
    } else {
      const newUser = new Admin({
        name,
        email,
        password,
      });
      // meng enksripsi password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              res.send(user);
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // jika terjadi error
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

    //   jika success
    return res.status(200).json({
      message: "Login Successful",
    });
  })(req, res, next);
});

module.exports = router;
