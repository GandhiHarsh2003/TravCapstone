const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  workLocation: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
