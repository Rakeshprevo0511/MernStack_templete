import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({
    employeeCount: 0,
    CourseCount: 0,
    pendingTasks: 0,
    messages: 0,
  });
 const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees/dashboardetails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // assuming API returns: { employeeCount, projectCount, pendingTasks, messages }
        setData({
          employeeCount: response.data.employeeCount || 0,
          CourseCount: response.data.courseCount || 0,
          pendingTasks: response.data.pendingTasks || 0,
          messages: response.data.messages || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
       
      } finally {
        setLoading(false);
         
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const cards = [
    { title: 'Total Employees', value: data.employeeCount, bg: 'primary' },
    { title: 'Courses', value: data.CourseCount, bg: 'success' },
    { title: 'Pending Tasks', value: data.pendingTasks, bg: 'warning' },
    { title: 'Messages', value: data.messages, bg: 'info' },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Welcome to the Dashboard</h2>
      <div className="row">
        {cards.map((card, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className={`card text-white bg-${card.bg} h-100`}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">{card.title}</h5>
                <h2 className="card-text">{card.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;