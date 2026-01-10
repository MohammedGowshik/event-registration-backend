const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  numPeople: {type: Number, required: true}       ///new added
}, { timestamps: true });

module.exports = mongoose.model("Participant", participantSchema);
