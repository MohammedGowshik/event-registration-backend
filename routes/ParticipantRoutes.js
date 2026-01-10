// const express = require("express");
// const router = express.Router();
// const Participant = require("../models/Participant");

// router.post("/register", async (req, res) => {
//   try {
//     console.log("Received:", req.body);

//     const participant = new Participant({
//       name: req.body.name,
//       age: req.body.age,
//       phone: req.body.phone,
//       gender: req.body.gender,
//       city: req.body.city,
//       numPeople: req.body.numPeople
//     });

//     await participant.save();

//     res.status(201).json({ message: "Registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// module.exports = router;
