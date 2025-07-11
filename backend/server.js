const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const employeeRoutes = require('./routes/employees');
const authRoutes = require('./routes/auth.routes');
const salaryRoutes = require('./routes/salaryPredict');

app.use('/api/predict', salaryRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Employee Directory API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
