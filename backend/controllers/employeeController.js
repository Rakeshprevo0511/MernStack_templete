//controllers/employeeController

const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getcourses = async (req, res) => {
  try {
    const courses = await employeeService.getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const courses = async (req, res) => {
  try {
    const courses = await employeeService.AllCourses();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const addEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    const newEmployee = await employeeService.createEmployee(employeeData);
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const getEmployeeCourseCompletionDetails = async (req, res) => {
  try {
    const data = await employeeService.getEmployeeCourseCompletionDetails();
    res.json(data);
  } catch (err) {
    console.error('Error fetching employee course completion details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  getEmployees,
  addEmployee,
  getcourses,
  courses,
  getEmployeeCourseCompletionDetails,
};