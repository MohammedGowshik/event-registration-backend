const Participant = require("../Backend/Participant");

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
    { header: "City", key: "city" },
    { header: "Number of People", key: "numPeople"}
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









// const express = require("express");
// const router = express.Router();
// const XLSX = require("xlsx");
// const path = require("path");
// const Participant = require("../models/Participant");

// const ADMIN_PASSWORD = "admin123";

// router.get("/download", async (req, res) => {
//   try {
//     const { password } = req.query;

//     if (password !== ADMIN_PASSWORD) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const participants = await Participant.find().lean();

//     if (participants.length === 0) {
//       return res.status(404).json({ message: "No data available" });
//     }

//     const data = participants.map((p, index) => ({
//       "S.No": index + 1,
//       Name: p.name,
//       Age: p.age,
//       Email: p.email,
//       Phone: p.phone,
//       Gender: p.gender,
//       City: p.city,
//       "No of People": p.numPeople
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

//     const filePath = path.join(__dirname, "participants.xlsx");
//     XLSX.writeFile(workbook, filePath);

//     res.download(filePath, "participants.xlsx");
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Excel download failed" });
//   }
// });

// module.exports = router;

