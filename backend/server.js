const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://ccheng:jZREdOAK4r16GRnq@trav-enterprise-directo.vl64bl0.mongodb.net/Directory-Database?retryWrites=true&w=majority&appName=Trav-Enterprise-Directory";
mongoose.connect(uri)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const employeeRoutes = require('./routes/employees');
const authRoutes = require('./routes/auth.routes');

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('Employee Directory API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
