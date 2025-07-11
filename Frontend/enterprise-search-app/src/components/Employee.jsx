import { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));

                if (!userData || !userData.id || !userData.employeeId) {
                    console.error('User data not found in localStorage or missing employeeId');
                    setError('User data not found. Please log in again.');
                    setLoading(false);
                    return;
                }

                console.log('Fetching employee data with ID:', userData.employeeId);

                const response = await axios.get(
                    `http://localhost:5000/api/employees/${userData.employeeId}?userId=${userData.id}`
                );

                setEmployee(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setError('Failed to load employee data. Please try again later.');
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    return (
        <div className="home-container">
            <div className="employees-section">
                <h2>My Profile</h2>
                {loading ? (
                    <p>Loading profile data...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : employee ? (
                    <div className="employee-cards">
                        <div className="employee-card">
                            <div className="profile-image">
                                <div className="image-placeholder">
                                    {employee.name.charAt(0)}
                                </div>
                            </div>
                            <div className="employee-info">
                                <h3>{employee.name}</h3>
                                <p className="employee-status">Employee</p>
                                <p className="employee-role">${employee.salary}</p>
                                <p className="employee-role">{employee.jobRole}</p>
                                <p className="employee-location">{employee.workLocation}</p>
                                <p className="employee-phone">{employee.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No employee data found.</p>
                )}
            </div>
        </div>
    );
};

export default Employee;
