const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find({}, 'name jobRole workLocation phoneNumber');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// GET employee by ID 
router.get('/:id', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(403).send({ message: "User ID not provided!" });
        }

        const requestingUser = await User.findById(userId);
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (requestingUser.role === 'hr') {
            return res.json(employee);
        }

        if (requestingUser.employeeId &&
            requestingUser.employeeId.toString() === req.params.id) {
            return res.json(employee);
        }

        if (requestingUser.role === 'manager' &&
            requestingUser.employeeId &&
            employee.managerId &&
            employee.managerId.toString() === requestingUser.employeeId.toString()) {
            return res.json(employee);
        }

        const limitedInfo = {
            _id: employee._id,
            name: employee.name,
            jobRole: employee.jobRole,
            workLocation: employee.workLocation,
            phoneNumber: employee.phoneNumber
        };

        res.json(limitedInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// http://localhost:5000/api/employees/search/criteria?name=John&jobRole=Developer&workLocation=Hartford&userId=686ec6826b4e842acb82d81e
router.get('/search/criteria', async (req, res) => {
    const { name, jobRole, workLocation, userId } = req.query;

    try {
        if (!userId) {
            return res.status(403).send({ message: "User ID not provided!" });
        }

        const requestingUser = await User.findById(userId);
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        let query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (jobRole) {
            query.jobRole = { $regex: jobRole, $options: 'i' };
        }

        if (workLocation) {
            query.workLocation = { $regex: workLocation, $options: 'i' };
        }

        if (requestingUser.role === 'hr') {
            const employees = await Employee.find(query);
            return res.json(employees);
        }

        const employees = await Employee.find(query).select('-salary');
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// http://localhost:5000/api/employees/manager/:managerId?userId=<valid-user-id>
router.get('/manager/:managerId', async (req, res) => {
    try {
        const managerId = req.params.managerId;
        const { userId } = req.query;

        if (!userId) {
            return res.status(403).send({ message: "User ID not provided!" });
        }

        const requestingUser = await User.findById(userId);
        if (!requestingUser) {
            return res.status(404).json({ message: 'Requesting user not found' });
        }

        const mongoose = require('mongoose');
        const objectId = new mongoose.Types.ObjectId(managerId);

        const isAuthorized = (requestingUser.employeeId &&
            requestingUser.employeeId.toString() === managerId) ||
            requestingUser.role === 'hr';

        const employees = await Employee.find({ managerId: objectId })
            .select(isAuthorized ? '' : '-salary');

        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
