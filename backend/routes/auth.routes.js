const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (req.body.password !== user.password) {
      return res.status(401).send({
        message: "Invalid password!"
      });
    }

    res.status(200).send({
      id: user._id,
      username: user.username,
      role: user.role,
      employeeId: user.employeeId
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
