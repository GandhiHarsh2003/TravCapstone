import Button from "@mui/material/Button";
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const SalaryEstimate = () => {
    const [role, setRole] = useState("Admin");
    const [location, setLocation] = useState("CA");
    const [salary, setSalary] = useState(0);
    const [loading, setLoading] = useState(false);
    const route = "http://localhost:5000/api/predict/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSalary(0);

        const submission = {
            jobRole: role,
            location: location
        };

        try {
            const response = await fetch(route, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submission),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSalary(data.salary);
        } catch (error) {
            console.error("Error posting data", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="salary-page-padding">
            <h1>Estimate your salary.</h1>
            <label>Warning: This is only an estimate.</label>
            <form className="form" onSubmit={handleSubmit}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    label="Role"
                    onChange={(event) => setRole(event.target.value)}
                >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"LDP Participant"}>LDP Participant</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Support"}>Support</MenuItem>
                </Select>

                <InputLabel id="location-label">Location</InputLabel>
                <Select
                    labelId="location-label"
                    id="location"
                    value={location}
                    label="Location"
                    onChange={(event) => setLocation(event.target.value)}
                >
                    <MenuItem value={"CA"}>California</MenuItem>
                    <MenuItem value={"CT"}>Connecticut</MenuItem>
                    <MenuItem value={"MN"}>Minnesota</MenuItem>
                    <MenuItem value={"NY"}>New York</MenuItem>
                    <MenuItem value={"TX"}>Texas</MenuItem>
                </Select>

                <Button type="submit">Submit</Button>
            </form>

            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress sx={{ color: 'black' }} />
                </div>
            )}

            {!loading && salary > 0 && (
                <Typography variant="h4" align="center" fontWeight="bold" color="black" sx={{ mt: 4 }}>
                    Your predicted salary is ${Math.round(salary).toLocaleString()}.
                </Typography>
            )}
        </div>
    );
};

export default SalaryEstimate;