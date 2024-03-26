const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  classCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassCategory",
    required: true,
  },
});

module.exports = mongoose.model("Class", ClassSchema);