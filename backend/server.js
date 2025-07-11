
//server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const employeeRoutes = require('./routes/employeeRoutes');
const app = express();


// Enable CORS only once
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
connectDB();

app.use('/api/employees', employeeRoutes);
app.use('/api/employeescourse', employeeRoutes);
app.use('/api', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
