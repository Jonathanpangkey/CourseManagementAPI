const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");


const router = express.Router();

// Create user/peserta
router.post("/", (req, res) => {
  const {  name, email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((savedUser) => {
          res.send({ savedUser });
        })
        .catch((error) => {
          res.status(500).send({ message: error.message });
        });
    }
  });
});

// Read semua user/peserta
router.get("/", (req, res) => {
  User.find({})
    .then((allusers) => {
      res.send({ allusers });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

// Read user/peserta berdasarkan ID
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send({ user });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

// Update user/peserta berdasarkan ID
router.put("/:id", (req, res) => {
  const { name, email, password } = req.body;
//   hash atau enskripsi password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name, email, password: hashedPassword } },
        { new: true }
      )
        .then((userUpdate) => {
          if (!userUpdate)
            return res.status(404).send({ message: "User not found" });
          res.send({ userUpdate });
        })
        .catch((error) => {
          res.status(500).send({ message: error.message });
        });
    }
  });
});

// Menghapus user/peserta berdasarkan ID
router.delete("/:id", (req, res) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then((userDelete) => {
      if (!userDelete)
        return res.status(404).send({ message: "User not found" });
      res.send({ userDelete });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

module.exports = router;
