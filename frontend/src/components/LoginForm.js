import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [loginName, setLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

     const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/Auth/Login', {
                login_name: loginName,
                login_pass: password,
            });

            console.log(response.data); // View the full response for debugging

            if (response.data.token) {
                // Save token and user details to localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
toast.success("Welcome To Portal")
                setMessage(response.data.message || 'Login successful!');
                 navigate('/employees');
                // You may redirect or load EmployeeList here:
                // window.location.href = '/employees';
            } else {
                toast.error('Invalid credentials.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your credentials or server.');
        }
    };

      return (
        <div className="d-flex justify-content-center align-items-center vh-100 light-grey-texture">
            <div className="card shadow p-4" style={{ width: '350px' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={loginName}
                            onChange={(e) => setLoginName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;