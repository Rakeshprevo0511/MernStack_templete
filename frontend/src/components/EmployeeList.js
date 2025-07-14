// src/components/EmployeeList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchEmployees();
  }, []);
const handleEdit = (id) => {
    console.log("Edit", id);
    // Navigate to edit page or open modal
     navigate(`/employees/edit/${id}`);
};
 const handleAddEmployee = () => {
        navigate('/employees/add'); // must match your route in App.js
    };


const handleView = (id) => {
    console.log("View", id);
    // Navigate to view page or open modal
};
  const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/employees/', {
                headers: {
    Authorization: `Bearer ${token}`
  }
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };
const handleDelete = async (id) => {
    console.log('Deleting employee with ID:', id);
     const confirmed = window.confirm('Are you sure you want to delete this employee?');
  if (!confirmed) return;  // if user cancels, exit
    try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
        toast.success('Employee deleted successfully');
        fetchEmployees(); // re-fetch list after deletion
    } catch (error) {
        console.error('Error deleting employee:', error);
        toast.error('Error deleting employee');
    }
};
    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading employees...</div>;
    }


  return (
    <div className="container mt-4">
    <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center">Employee List</h1>
                <button
                    onClick={handleAddEmployee}
                    className="bg-green-500  px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Employee
                </button>
            </div>
    {loading ? (
        <div className="text-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading employees...</p>
        </div>
    ) : employees.length > 0 ? (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="table-dark text-center">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
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
                             <td className="text-center">
                        <button
                            className="btn btn-sm btn-primary me-1"
                            onClick={() => handleEdit(emp._id)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                            className="btn btn-sm btn-danger me-1"
                            onClick={() => handleDelete(emp._id)}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleView(emp._id)}
                        >
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <p className="text-center text-muted">No employees found.</p>
    )}
</div>
  );
}

export default EmployeeList;