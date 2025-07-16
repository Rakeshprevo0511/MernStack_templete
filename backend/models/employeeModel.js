const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    Id:Number,
  EmpName: String,
  Position: String,
  Location: String,
  Age: Number,
  Salary: Number,
  Email: String,
  PhoneNumber: String,
  Password: String,
  Username: String,
  JoiningDate: Date,
  ImagePath: String,
}, { collection: 'Empoyee' }); // Correct collection name

const employeeCourseSchema = new mongoose.Schema({
  EmployeeCourseId: Number,
  EmployeeId: Number,
  CourseId: Number,
  CompletionDate: Date,
  Status: String,
}, { collection: 'EmployeeCourse' });
const courseSchema = new mongoose.Schema({
  CourseId: {
    type: Number,
    required: true,
    unique: true
  },
  CourseName: {
    type: String,
    required: true
  },
  CourseDescription: {
    type: String,
    required: true
  }
}, {
  collection: 'Courses' // ensure it matches your collection name
});
const Employee = mongoose.model('Employee', employeeSchema);
const EmployeeCourses = mongoose.model('EmployeeCourse', employeeCourseSchema);
const Courses = mongoose.model('Course', courseSchema);

module.exports = {
  Employee,
  EmployeeCourses,
  Courses
};