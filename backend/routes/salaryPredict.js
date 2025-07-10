const express = require('express');
const { PythonShell } = require('python-shell');
const router = express.Router();

router.post('/predict', (req, res) => {
    const { jobRole, location } = req.body;
    const input = JSON.stringify({ jobRole, location});

    const shell = new PythonShell('backend/scripts/model.py');
    let output = ''

    shell.on('message', message => output += message);

    shell.send(input).end((err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ salary: parseFloat(output)});
    });
});

module.exports = router;
