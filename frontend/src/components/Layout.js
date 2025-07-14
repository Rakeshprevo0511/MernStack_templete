import React from 'react';
import '../style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
    return (
        <div className="container">
            <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
                <h2 className='text-center'>Employee Portal</h2>
            </header>

            <main style={{ padding: '20px' }}>
                {children}
            </main>

            <footer style={{ background: '#333', color: '#fff', padding: '10px', textAlign: 'center' }}>
                &copy; {new Date().getFullYear()} RCS
            </footer>
        </div>
    );
};

export default Layout;