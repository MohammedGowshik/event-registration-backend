const express = require("express");
const ExcelJS = require("exceljs");
const Registration = require("../models/Registration");

const router = express.Router();

router.get("/export", async (req, res) => {
  const users = await Registration.find();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Participants");

  sheet.columns = [
    { header: "Name", key: "name" },
    { header: "Age", key: "age" },
    { header: "Phone", key: "phone" },
    { header: "Gender", key: "gender" },
    { header: "City", key: "city" }
  ];

  users.forEach(u => sheet.addRow(u));

  res.setHeader("Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition",
    "attachment; filename=participants.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
