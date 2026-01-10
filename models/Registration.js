const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  phone: String,
  gender: String,
  city: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", RegistrationSchema);
