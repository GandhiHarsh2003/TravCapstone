import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DirectReports() {
    const [directReports, setDirectReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDirectReports = async () => {
            try {
                if (!userData || !userData.id || !userData.employeeId) {
                    console.error('User data not found in localStorage or missing employeeId');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/employees/manager/${userData.employeeId}?userId=${userData.id}`);
                setDirectReports(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching direct reports:', error);
                setLoading(false);
            }
        };

        fetchDirectReports();
    }, [userData]);

    return (
        <div className="home-container">
            <div className="employees-section">
                <h2>My Direct Reports</h2>
                {loading ? (
                    <p>Loading direct reports...</p>
                ) : directReports.length === 0 ? (
                    <p>You don't have any direct reports.</p>
                ) : (
                    <div className="employee-cards">
                        {directReports.map(employee => (
                            <div className="employee-card" key={employee._id}>
                                <div className="profile-image">
                                    <div className="image-placeholder">
                                        {employee.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="employee-info">
                                    <h3>{employee.name}</h3>
                                    <p className="employee-status">Employee</p>
                                    <p className="employee-salary">${employee.salary.toLocaleString()}</p>
                                    <p className="employee-role">{employee.jobRole}</p>
                                    <p className="employee-location">{employee.workLocation}</p>
                                    <p className="employee-phone">{employee.phoneNumber}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
