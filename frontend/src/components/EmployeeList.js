import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EmployeeCourseModal from "./EmployeeCourseModal";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [availableLocations, setAvailableLocations] = useState([]);
  const [availablePositions, setAvailablePositions] = useState([]);

  const employeesPerPage = 5;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployees(currentPage, searchTerm, locationFilter, positionFilter);
  }, [currentPage, searchTerm, locationFilter, positionFilter]);

 const fetchEmployees = async (
  page = 1,
  search = "",
  location = "",
  position = ""
) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/employees?page=${page}&limit=${employeesPerPage}&search=${encodeURIComponent(
        search
      )}&location=${encodeURIComponent(location)}&position=${encodeURIComponent(
        position
      )}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Fix: data is inside response.data.data
    setEmployees(response.data.data || []);
     // Extract unique locations
    const locations = Array.from(new Set((response.data.data || []).map(emp => emp.Location).filter(Boolean)));
    setAvailableLocations(locations);

    // Extract unique positions
    const positions = Array.from(new Set((response.data.data || []).map(emp => emp.Position).filter(Boolean)));
    setAvailablePositions(positions);
    setCurrentPage(response.data.currentPage || 1);
    setTotalPages(response.data.totalPages || 1);
  } catch (error) {
    console.error("Error fetching employees:", error);
    toast.error("Error fetching employees");
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (id) => {
    navigate(`/employees/edit/${id}`);
  };

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleView = async (empId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/employees/employee-course-details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const employeeData = res.data.find((emp) => emp.EmployeeId === empId);
      if (employeeData) {
        setSelectedEmployee(employeeData);
        setShowModal(true);
      } else {
        toast.info("No completed courses found for this employee");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error("Error fetching course details");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Employee deleted successfully");
      // Refresh employees after delete
      fetchEmployees(currentPage, searchTerm, locationFilter, positionFilter);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee");
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
       
      </div>

      {/* Filters side-by-side */}
    <div className="container-fluid mb-3">
  <div className="d-flex flex-nowrap align-items-center gap-2">
    {/* Search Input */}
     <button
          onClick={handleAddEmployee}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 text-dark"
        >
          Add Employee
        </button>
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => {
        setCurrentPage(1);
        setSearchTerm(e.target.value);
      }}
      className="form-control w-auto"
      style={{ minWidth: '200px' }}
    />

    {/* Location Filter */}
    <select
      value={locationFilter}
      onChange={(e) => {
        setCurrentPage(1);
        setLocationFilter(e.target.value);
      }}
      className="form-select w-auto"
      style={{ minWidth: '150px' }}
    >
      <option value="">All Locations</option>
      {availableLocations.map((loc) => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>

    {/* Position Filter */}
    <select
      value={positionFilter}
      onChange={(e) => {
        setCurrentPage(1);
        setPositionFilter(e.target.value);
      }}
      className="form-select w-auto"
      style={{ minWidth: '150px' }}
    >
      <option value="">All Positions</option>
      {availablePositions.map((pos) => (
        <option key={pos} value={pos}>{pos}</option>
      ))}
    </select>
  </div>
</div>

      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length > 0 ? (
        <>
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
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit Employee</Tooltip>}
                      >
                        <button
                          className="btn btn-sm btn-primary me-1"
                          onClick={() => handleEdit(emp._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <button
                          className="btn btn-sm btn-danger me-1"
                          onClick={() => handleDelete(emp._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>View Completed Courses</Tooltip>}
                      >
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleView(emp.Id)}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <nav aria-label="Employee list pagination">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <li
                    key={pageNum}
                    className={`page-item ${
                      currentPage === pageNum ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                );
              })}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          <EmployeeCourseModal
            show={showModal}
            handleClose={handleCloseModal}
            employee={selectedEmployee}
          />
        </>
      ) : (
        <p className="text-center text-muted">No employees found.</p>
      )}
    </div>
  );
}

export default EmployeeList;
