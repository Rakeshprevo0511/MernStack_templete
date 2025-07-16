
import '../style.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const tabs = ['Dashboard', 'Employees', 'Reports', 'Settings'];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
   const handlelogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token"); // remove JWT if used
        sessionStorage.clear(); // optional: clear session data
        window.location.href = "/"; // redirect to login page
    }

};
 const handleTabClick = (tab) => {
    switch (tab) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Employees':
        navigate('/employees');
        break;
      case 'Reports':
        navigate('/reports');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };
    return (
        <div className="d-flex min-vh-100">
            {/* Sidebar */}
            <div
                className={`bg-dark text-white p-2 d-flex flex-column align-items-center transition`}
                style={{
                    width: sidebarOpen ? '200px' : '50px',
                    transition: 'width 0.3s',
                    position: 'relative'
                }}
                onMouseEnter={() => setSidebarOpen(true)}
                onMouseLeave={() => setSidebarOpen(false)}
            >
                {/* Three-dot button */}
                <button
                    className="btn btn-dark border-0 mb-3 mt-2"
                    style={{ fontSize: '24px', lineHeight: '0' }}
                >
                    ⋮
                </button>

                {/* Tabs */}
                {sidebarOpen && (
                    <ul className="nav flex-column w-100">
                         {tabs.map((tab, index) => (
              <li className="nav-item" key={tab}>
                <button
                  className="nav-link text-white text-start w-100"
                  style={{ padding: '8px 16px', background: 'transparent', border: 'none' }}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
                        <li className="nav-item mt-auto">
                            <button
                                onClick={handlelogout}
                                className="btn btn-danger w-100 mt-3"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-fill d-flex flex-column">
                {/* Header */}
                <header className="bg-dark text-white text-center p-3">
                    <h2 className="mb-0">Employee Portal</h2>
                </header>

                {/* Content */}
                <main className="flex-fill p-4 bg-light">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-dark text-white text-center p-2">
                    &copy; {new Date().getFullYear()} RCS
                </footer>
            </div>
        </div>
    );
};


export default Layout;