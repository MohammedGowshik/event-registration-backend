const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const participant = new Participant(req.body);
    await participant.save();

    res.json({ message: "Registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// EXPORT EXCEL
router.get("/export", async (req, res) => {
  const ExcelJS = require("exceljs");
  const data = await Participant.find();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Participants");

  sheet.columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Gender", key: "gender" },
    { header: "City", key: "city" }
  ];

  data.forEach(d => sheet.addRow(d));

  res.setHeader("Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
