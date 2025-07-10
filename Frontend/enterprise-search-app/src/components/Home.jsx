import { useState, useEffect } from 'react';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const userData = JSON.parse(localStorage.getItem('user'));

const Home = () => {
    const [name, setName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {                
                if (!userData || !userData.id) {
                    console.error('User data not found in localStorage');
                    setLoading(false);
                    return;
                }
                console.log(userData)
                const response = await axios.get(`http://localhost:5000/api/employees?userId=${userData.id}`);
                setEmployees(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        navigate('/SearchResults', { state: { person: name } });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div className="home-container">
            <div className="search-section">
                <form onSubmit={handleSearch}>
                    <FormLabel>Search</FormLabel>
                    <TextField 
                        size="medium" 
                        id="outlined-basic" 
                        variant="outlined" 
                        placeholder="Start Searching..." 
                        value={name} 
                        onChange={handleNameChange}
                    />
                </form>
            </div>

            <div className="employees-section">
                <h2>Employees</h2>
                {loading ? (
                    <p>Loading employees...</p>
                ) : (
                    <div className="employee-cards">
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
                                    {userData.role === "hr" && <p className="employee-role">${employee.salary}</p>}
                                    <p className="employee-role">{employee.jobRole}</p>
                                    <p className="employee-location">{employee.workLocation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
