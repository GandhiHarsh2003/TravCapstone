import Button from "@mui/material/Button";
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SalaryEstimate = () => {
    const [role, setRole] = React.useState("Admin");
    const [location, setLocation] = React.useState("CA");
    const route = "";

    const handleSubmit = async () => {
        e.preventDefault();
        const submission = {
            role: role,
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
            console.log(data);
            // Handle post submission logic (like showing a success message)
        } catch (error) {
            console.error("Error posting data", error);
            // Handle errors here
        }
    };

    return (
        <div className="salary-page-padding">
            <h1>
                Estimate your salary.
            </h1>
            <label>
                Warning: This is only an estimate.
            </label>
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
                <InputLabel id="role-label">Location</InputLabel>
                <Select
                    labelId="role-label"
                    id="location"
                    value={location}
                    label="Location"
                    onChange={(event) => setLocation(event.target.value)}
                >
                    ['NY', 'CA', 'MN', 'TX', "CT"]
                    <MenuItem value={"CA"}>California</MenuItem>
                    <MenuItem value={"CT"}>Conneticut</MenuItem>
                    <MenuItem value={"MN"}>Minnesota</MenuItem>
                    <MenuItem value={"NY"}>New York</MenuItem>
                    <MenuItem value={"T"}>Texas</MenuItem>
                </Select>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
};

export default SalaryEstimate;