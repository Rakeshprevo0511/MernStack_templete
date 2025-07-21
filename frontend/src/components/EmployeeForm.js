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
        PhoneNumber: '',
        ImagePath: '' 
    });

    const token = localStorage.getItem("token"); // Retrieve token
 
    const [selectedFile, setSelectedFile] = useState(null);
     const [previewUrl, setPreviewUrl] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState('');

     const handleFileSelection = (file) => {
    if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // only preview
    }
};
    useEffect(() => {
        if (id) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
             .then(res => {
            setEmployee(res.data);
            // If there is an existing image, set it for preview
            if (res.data.ImagePath) {
                setPreviewUrl(`${process.env.REACT_APP_API_URL}${res.data.ImagePath}`);
            }
        })
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

const uploadFile = async () => {
    if (!selectedFile) {
        toast.error('Please select a file before uploading.');
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        setUploadedFilePath(res.data.filePath);
        setEmployee(prev => ({
    ...prev,
    ImagePath: res.data.filePath
}));
        toast.success('File uploaded successfully.');
    } catch (error) {
        console.error(error);
        toast.error('Error uploading file.');
    }
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
        <div className='main-panel'>
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
       <div className="row  mb-3">
    <label className="form-label">Upload Image</label>
    <input
        type="file"
        className="form-control"
        onChange={(e) => handleFileSelection(e.target.files[0])}
    />
</div>

{previewUrl && (
    <div className="row mb-3">
        <img
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
        />
    </div>
)}

{selectedFile && !uploadedFilePath && (
    <button
        type="button"
        className="btn btn-info mb-3"
        onClick={uploadFile}
    >
        Upload
    </button>
)}

{uploadedFilePath && (
    <div className="mb-3">
        <p className="text-success">File uploaded: {uploadedFilePath}</p>
    </div>
)}
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
<div id="map" style={{ height: "400px", width: "100%" }}></div>
        </div>
        </div>
    );
};

export default EmployeeForm;
