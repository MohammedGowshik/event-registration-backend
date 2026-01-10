
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












const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const exportRouter = require("./routes/export");
const Participant = require("./Participant");

const ADMIN_PASSWORD = "admin123";

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

// Register API
app.post('/api/register', async (req, res) => {
  try {
    const { name, age, email, phone, gender, city, numPeople } = req.body;

    // Check duplicate phone
    const exists = await Participant.findOne({ phone });
    if (exists) return res.status(400).json({ message: "Phone number already registered!" });

    const participant = new Participant({
      name,
      age: Number(age),
      email,
      phone,
      gender,
      city,
      numPeople: Number(numPeople) || 1
    });

    await participant.save();
    res.status(201).json({ message: `Registered successfully for ${participant.numPeople} people!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration Failed" });
  }
});

// Use export router
app.use("/api", exportRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

