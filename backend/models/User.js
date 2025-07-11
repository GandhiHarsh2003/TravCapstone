const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'hr'],
    default: 'employee'
  }
});

module.exports = mongoose.model('User', UserSchema);
