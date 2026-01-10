// const express = require("express");
// const router = express.Router();
// const Registration = require("../models/Registration");

// router.post("/register", async (req, res) => {
//   try {
//     console.log("Received:", req.body);

//     const data = new Registration(req.body);
//     await data.save();

//     res.json({ message: "Registered successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Registration failed" });
//   }
// });

// module.exports = router;
