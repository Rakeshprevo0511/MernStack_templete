// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import Layout from './components/Layout';
import Layout_new from './components/Layout_New';
import EmployeeForm from './components/EmployeeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
               {/* Place outside Routes for correct rendering */}
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<LoginForm />} />

                          <Route path="/employees" element={<Layout><EmployeeList /></Layout>} />
                          <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
                          <Route path="/employees/add" element={<Layout_new><EmployeeForm /></Layout_new>} />
                          <Route path="/employees/edit/:id" element={<Layout><EmployeeForm /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
