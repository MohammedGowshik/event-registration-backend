const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  phone: String,
  gender: String,
  city: String
}, { timestamps: true });

module.exports = mongoose.model("Participant", participantSchema);
