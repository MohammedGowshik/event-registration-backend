
// const express = require('express');
// const cors = require('cors');
// const ExcelJS = require('exceljs');
// const mongoose = require('mongoose');

// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const ADMIN_PASSWORD = "admin123";

// console.log("Mongo URI:", process.env.MONGO_URI);



// /* =======================
//    MongoDB Connection
// ======================= */
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB error:", err));

// /* =======================
//    Schema & Model
// ======================= */
// const participantSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
//   phone: String,
//   gender: String,
//   city: String
// });

// const Participant = mongoose.model("Participant", participantSchema);

// /* =======================
//    Register API
// ======================= */
// app.post('/api/register', async (req, res) => {
//   try {
//     const participant = new Participant(req.body);
//     await participant.save();
//     res.json({ message: "Registration Successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Registration Failed" });
//   }
// });

// /* =======================
//    Download Excel (Admin)
// ======================= */
// app.get('/api/download', async (req, res) => {
//   if (req.query.password !== ADMIN_PASSWORD)
//     return res.status(401).send("Unauthorized");

//   const participants = await Participant.find();

//   if (participants.length === 0)
//     return res.status(404).send("No data available");

//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("Participants");

//   sheet.addRow(["Name", "Age", "Email", "Phone", "Gender", "City"]);

//   participants.forEach(p => {
//     sheet.addRow([p.name, p.age, p.email, p.phone, p.gender, p.city]);
//   });

//   res.setHeader(
//     "Content-Type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   );
//   res.setHeader(
//     "Content-Disposition",
//     "attachment; filename=participants.xlsx"
//   );

//   await workbook.xlsx.write(res);
//   res.end();
// });

// /* =======================
//    Server Start
// ======================= */
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );









const express = require("express");
const ExcelJS = require("exceljs");
const Participant = require("../models/Participant"); // Make sure this path is correct
const router = express.Router();

const ADMIN_PASSWORD = "admin123"; // Same as in server.js

// Download Excel of participants
router.get("/download", async (req, res) => {
  try {
    if (req.query.password !== ADMIN_PASSWORD) {
      return res.status(401).send("Unauthorized");
    }

    const participants = await Participant.find();
    if (!participants.length) return res.send("No data available");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Participants");

    // Header row
    sheet.addRow([
      "Name",
      "Age",
      "Email",
      "Phone",
      "Gender",
      "City",
      "Number of People"
    ]);

    // Data rows
    participants.forEach(p => {
      sheet.addRow([
        p.name,
        p.age,
        p.email || "",
        p.phone,
        p.gender,
        p.city,
        p.numPeople
      ]);
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=participants.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating Excel file");
  }
});

module.exports = router;







