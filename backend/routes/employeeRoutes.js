//routes/employeeRoutes

const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/authMiddleware');


router.use(authenticateToken);

// Specific routes FIRST
router.get('/employee-course-details', employeeController.getEmployeeCourseCompletionDetails);
router.get('/empcourse', employeeController.getcourses);
router.get('/Course', employeeController.courses);
// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Upload endpoint (POST, not GET)
router.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: 'File uploaded successfully',
        filePath: req.file.path,
    });
});


// Standard CRUD
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
module.exports = router; 