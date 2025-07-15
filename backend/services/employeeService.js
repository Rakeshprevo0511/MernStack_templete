
///services/employeeServices
const {Employee, EmployeeCourses,Courses } = require('../models/employeeModel');

const getAllEmployees = async () => {
  return await Employee.find();
};
const getEmployeeById = async (id) => {
    return await Employee.findById(id); // Mongoose's _id
};
const getAllCourses = async () => {
  return await EmployeeCourses.find();
};
const AllCourses = async () => {
  return await Courses.find();
};
const createEmployee = async (employeeData) => {
  const employee = new Employee(employeeData);
  return await employee.save();
};
const updateEmployee = async (id, employeeData) => {
  // Example using Mongoose:
  const updatedEmployee = await Employee.findByIdAndUpdate(id, employeeData, { new: true });
  return updatedEmployee;
};
const getEmployeeCourseCompletionDetails = async () => {
  return await EmployeeCourses.aggregate([
    {
      $match: { Status: 'Completed' }
    },
    {
      $lookup: {
        from: 'Courses', // collection for Course schema
        localField: 'CourseId',
        foreignField: 'CourseId',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $group: {
        _id: '$EmployeeId',
        CompletedCoursesCount: { $sum: 1 },
        Courses: { $push: '$course.CourseName' }
      }
    },
    {
      $lookup: {
        from: 'Empoyee', // ensure correct casing
        localField: '_id',
        foreignField: 'Id',
        as: 'employee'
      }
    },
    { $unwind: '$employee' },
    {
      $project: {
        _id: 0,
        EmployeeId: '$_id',
        EmployeeName: '$employee.EmpName',
        CompletedCoursesCount: 1,
        Courses: 1
      }
    }
  ]);
};

const deleteEmployee = async (id) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    return deletedEmployee;  // returns null if no document found
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllEmployees,
  createEmployee,
  getAllCourses,
  AllCourses,
  getEmployeeCourseCompletionDetails,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};