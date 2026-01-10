// const mongoose = require("mongoose");

// const participantSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   phone: String,
//   gender: String,
//   city: String,
//   numPeople: Number
// }, { timestamps: true });

// module.exports = mongoose.model("Participant", participantSchema);








const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: { type: String, required: true, unique: true },
  gender: String,
  city: String,
  numPeople: { type: Number, default: 1 }
}, { timestamps: true, versionKey: false }); // <--- disables __v


module.exports = mongoose.model("Participant", participantSchema);
