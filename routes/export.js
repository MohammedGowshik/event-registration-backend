// const express = require("express");
// const ExcelJS = require("exceljs");
// const Registration = require("../models/Registration");

// const router = express.Router();

// router.get("/export", async (req, res) => {
//   const users = await Registration.find();

//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("Participants");

//   sheet.columns = [
//     { header: "Name", key: "name" },
//     { header: "Age", key: "age" },
//     { header: "Phone", key: "phone" },
//     { header: "Gender", key: "gender" },
//     { header: "City", key: "city" },
//     { header: "Number of People", key: "numPeople"}
//   ];

//   users.forEach(u => sheet.addRow(u));

//   res.setHeader("Content-Type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//   res.setHeader("Content-Disposition",
//     "attachment; filename=participants.xlsx");

//   await workbook.xlsx.write(res);
//   res.end();
// });

// module.exports = router;









const express = require("express");
const ExcelJS = require("exceljs");
const Participant = require("../Participant"); // use correct model path

const router = express.Router();

router.get("/export", async (req, res) => {
  const password = req.query.password;
  if (password !== "admin123") return res.status(401).send("Unauthorized");

  const participants = await Participant.find();
  if (!participants.length) return res.status(404).send("No data available");

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Participants");

  // HEADER row
  sheet.addRow(["Name", "Age", "Email", "Phone", "Gender", "City", "Number of People"]);

  // DATA rows
  participants.forEach(p => {
    sheet.addRow([
      p.name,
      p.age,
      p.email || "",  // optional email
      p.phone,
      p.gender,
      p.city,
      p.numPeople
    ]);
  });

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", "attachment; filename=participants.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
