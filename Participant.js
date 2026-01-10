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
  name: { type: String, required: true },
  age: Number,
  email: String,
  phone: { type: String, required: true, unique: true }, // prevent duplicates
  gender: String,
  city: String,
  numPeople: { type: Number, default: 1 } // NEW FIELD
}, { timestamps: true, versionKey: false }); // remove __v

module.exports = mongoose.model("Participant", participantSchema);
