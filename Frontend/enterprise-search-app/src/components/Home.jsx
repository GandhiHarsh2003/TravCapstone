import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../components/Filter';
import { Box, Typography, CircularProgress } from '@mui/material';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async (filters = {}) => {
        try {
            setLoading(true);

            if (!userData || !userData.id) {
                console.error('User data not found in localStorage');
                setLoading(false);
                return;
            }

            let queryParams = `userId=${userData.id}`;

            if (filters && (filters.name || filters.jobRole || filters.workLocation)) {
                const endpoint = 'search/criteria';

                if (filters.name) {
                    queryParams += `&name=${encodeURIComponent(filters.name)}`;
                }

                if (filters.jobRole) {
                    queryParams += `&jobRole=${encodeURIComponent(filters.jobRole)}`;
                }

                if (filters.workLocation) {
                    queryParams += `&workLocation=${encodeURIComponent(filters.workLocation)}`;
                }

                const response = await axios.get(`http://localhost:5000/api/employees/${endpoint}?${queryParams}`);
                setEmployees(response.data);
            } else {
                const response = await axios.get(`http://localhost:5000/api/employees?${queryParams}`);
                setEmployees(response.data);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
        fetchEmployees(filters);
    };

    return (
        <div className="home-container">
            <div className="page-header">
                <h1>Employee Directory</h1>
            </div>
            
            <div className="main-content">
                <div className="filter-sidebar">
                    <Filter onFilterChange={handleFilterChange} />
                    <div className="results-count">
                        {employees.length} results found
                    </div>
                </div>

                <div className="employees-content">
                    {loading ? (
                        <div className="loading-container">
                            <CircularProgress />
                            <p>Loading employees...</p>
                        </div>
                    ) : employees.length > 0 ? (
                        <div className="employee-cards-container">
                            {employees.map(employee => (
                                <div className="employee-card" key={employee._id}>
                                    <div className="profile-image">
                                        <div className="image-placeholder">
                                            {employee.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="employee-info">
                                        <h3>{employee.name}</h3>
                                        <p className="employee-status">Employee</p>
                                        {userData.role === "hr" && employee.salary !== undefined && (
                                            <p className="employee-salary">${employee.salary.toLocaleString()}</p>
                                        )}
                                        <p className="employee-role">{employee.jobRole}</p>
                                        <p className="employee-location">{employee.workLocation}</p>
                                        {employee.phoneNumber && (
                                            <p className="employee-phone">{employee.phoneNumber}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <Typography variant="h6" color="textSecondary">
                                No employees found matching your criteria.
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;