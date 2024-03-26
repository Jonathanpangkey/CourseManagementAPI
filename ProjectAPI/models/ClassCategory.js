const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Membuat skema admin
const CategorySchema = new Schema({
  // di mongoose id akan tergenerate secara otomatis
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('ClassCategory', CategorySchema);
