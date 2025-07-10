import Button from "@mui/material/Button";
import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const SalaryEstimate = () => {
    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h1>
                Estimate your salary.
            </h1>
            <label>
                Warning: This is only an estimate.
            </label>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={role}
                        label="Role"
                        onChange={(event) => setRole()}
                    >
                        <MenuItem value={"Admin"}>Admin</MenuItem>
                        <MenuItem value={"HR"}>HR</MenuItem>
                        <MenuItem value={"LDP Participant"}>LDP Participant</MenuItem>
                        <MenuItem value={"Manager"}>Manager</MenuItem>
                        <MenuItem value={"Support"}>Support</MenuItem>

                    </Select>
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default SalaryEstimate;