
//server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const employeeRoutes = require('./routes/employeeRoutes');
const authroute =require('./routes/AuthRoutes')
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();
// Enable CORS only once
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true // if you are using cookies/auth, keep this
}));

// This handles preflight OPTIONS requests for all routes
app.options('*', cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
connectDB();

app.use('/api/employees', employeeRoutes);
app.use('/Auth',authroute);
// Ensure 'uploads' folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads folder
app.use('/uploads', express.static(uploadsDir));

// Multer storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        message: 'File uploaded successfully',
        filePath: `/uploads/${req.file.filename}`
    });
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
