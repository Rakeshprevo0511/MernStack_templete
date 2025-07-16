//controllers/employeeController
const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '', location, position } = req.query;

        const query = {};

        if (search) {
            query.EmpName = { $regex: search, $options: 'i' }; // case-insensitive name search
        }
        if (location) {
            query.Location = location;
        }
        if (position) {
            query.Position = position;
        }

        const skip = (page - 1) * limit;

        const [employees, total] = await Promise.all([
            employeeService.getEmployeesWithQuery(query, skip, parseInt(limit)),
            employeeService.countEmployees(query),
        ]);

        res.json({
            data: employees,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
        });
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        console.error('Error fetching employee:', err);
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
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeData = req.body;
    const updatedEmployee = await employeeService.updateEmployee(id, employeeData);
    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await employeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const getDashDetails = async (req, res) => {
  try {
    const employeeCount = await employeeService.getEmployeeCount();
    const courseCount = await employeeService.getCourseCount();

    res.json({
      employeeCount,
      courseCount
    });
  } catch (err) {
    console.error('Error fetching dashboard details:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  getcourses,
  courses,
  getEmployeeCourseCompletionDetails,
  updateEmployee,
  getEmployeeById,
  deleteEmployee,
  getDashDetails,

};