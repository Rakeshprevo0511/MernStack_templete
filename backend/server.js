
//server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const employeeRoutes = require('./routes/employeeRoutes');
const authroute =require('./routes/AuthRoutes')
const app = express();


// Enable CORS only once
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
connectDB();

app.use('/api/employees', employeeRoutes);
app.use('/Auth',authroute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
