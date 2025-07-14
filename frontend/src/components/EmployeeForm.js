import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // For edit mode

    const [employee, setEmployee] = useState({
        EmpName: '',
        Position: '',
        Location: '',
        Age: '',
        Salary: '',
        Email: '',
        PhoneNumber: ''
    });

    const token = localStorage.getItem("token"); // Retrieve token
 
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setEmployee(res.data))
            .catch(err => {
                console.error(err);
                alert('Error fetching employee data. Please ensure you are logged in.');
                navigate('/employees');
            });
        }
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!token) {
            toast.error('Authentication token missing. Please log in again.');
            return;
        }

        if (id) {
            axios.put(`http://localhost:5000/api/employees/${id}`, employee, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success('Employee updated successfully.');
                navigate('/employees');
            })
            .catch(err => {
                console.error(err);
               toast.error('Error updating employee. Please ensure you have permission.');
            });
        } else {
            axios.post('http://localhost:5000/api/employees', employee, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success('Employee added successfully.');
                navigate('/employees');
            })
            .catch(err => {
                console.error(err);
                toast.error('Error adding employee. Please ensure you have permission.');
            });
        }
    };

    return (
        <div className="container mt-4">
            <h3>{id ? 'Edit Employee' : 'Add Employee'}</h3>
            <form onSubmit={handleSubmit}>
    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
                type="text"
                className="form-control"
                name="EmpName"
                value={employee.EmpName}
                onChange={handleChange}
                required
            />
        </div>
        <div className="col-md-6">
            <label className="form-label">Position</label>
            <input
                type="text"
                className="form-control"
                name="Position"
                value={employee.Position}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
                type="text"
                className="form-control"
                name="Location"
                value={employee.Location}
                onChange={handleChange}
                required
            />
        </div>
        <div className="col-md-3">
            <label className="form-label">Age</label>
            <input
                type="number"
                className="form-control"
                name="Age"
                value={employee.Age}
                onChange={handleChange}
                required
            />
        </div>
        <div className="col-md-3">
            <label className="form-label">Salary</label>
            <input
                type="number"
                className="form-control"
                name="Salary"
                value={employee.Salary}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                name="Email"
                value={employee.Email}
                onChange={handleChange}
                required
            />
        </div>
        <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input
                type="text"
                className="form-control"
                name="PhoneNumber"
                value={employee.PhoneNumber}
                onChange={handleChange}
                required
            />
        </div>
    </div>

    <button type="submit" className="btn btn-primary me-2">
        {id ? 'Update' : 'Add'}
    </button>
    <button
        type="button"
        className="btn btn-secondary"
        onClick={() => navigate('/employees')}
    >
        Cancel
    </button>
</form>

        </div>
    );
};

export default EmployeeForm;
