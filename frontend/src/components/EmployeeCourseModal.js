import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmployeeCourseModal = ({ show, handleClose, employee }) => {
    if (!employee) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Employee Course Completion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Employee Name:</strong> {employee.EmployeeName}</p>
                <p><strong>Completed Courses Count:</strong> {employee.CompletedCoursesCount}</p>
                <p><strong>Courses:</strong></p>
                <ul>
                    {employee.Courses.map((course, idx) => (
                        <li key={idx}>{course}</li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EmployeeCourseModal;
