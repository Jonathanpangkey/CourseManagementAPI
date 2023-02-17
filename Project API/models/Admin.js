const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Membuat skema admin
const AdminSchema = new Schema({
  // di mongoose id akan tergenerate secara otomatis
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});




module.exports = mongoose.model('Admin', AdminSchema);
