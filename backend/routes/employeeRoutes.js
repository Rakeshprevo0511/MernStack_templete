//routes/employeeRoutes

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/authMiddleware');


 router.use(authenticateToken);
router.get('/', employeeController.getEmployees);
router.get('/:id',  employeeController.getEmployeeById);
router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
router.get('/empcourse', employeeController.getcourses);
router.get('/Course', employeeController.courses);
router.get('/employee-course-details', employeeController.getEmployeeCourseCompletionDetails);

module.exports = router; 