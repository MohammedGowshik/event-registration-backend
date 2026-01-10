const express = require('express');
const fs = require('fs');
const ExcelJS = require('exceljs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const filePath = './participants.xlsx';
const ADMIN_PASSWORD = "admin123";

// Make sure Excel exists
if(!fs.existsSync(filePath)){
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Participants');
  sheet.addRow(['Name','Age','Email','Phone','Gender','City']);
  workbook.xlsx.writeFile(filePath);
}

// Registration endpoint
app.post('/api/register', async (req,res)=>{
  try {
    const { name, age, email, phone, gender, city } = req.body;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet('Participants');

    sheet.addRow([name,age,email,phone,gender,city]);
    await workbook.xlsx.writeFile(filePath);

    res.json({ message:'Registration Successful' });
  } catch(err){
    console.error(err);
    res.status(500).json({ message:'Registration Failed' });
  }
});

// Download endpoint with password
app.get('/api/download', (req,res)=>{
  const password = req.query.password;
  if(password !== ADMIN_PASSWORD) return res.status(401).send("Unauthorized");
  if(!fs.existsSync(filePath)) return res.status(404).send("No data available");
  res.download(filePath,'participants.xlsx');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

