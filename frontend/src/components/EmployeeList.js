// src/components/EmployeeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : employees.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Location</th>
              <th>Age</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.EmpName}</td>
                <td>{emp.Position}</td>
                <td>{emp.Location}</td>
                <td>{emp.Age}</td>
                <td>{emp.Salary}</td>
                <td>{emp.Email}</td>
                <td>{emp.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
}

export default EmployeeList;