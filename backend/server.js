const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cors = require('cors')
dotenv.config();
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
  app.use(express.json());
  
app.use('/api/users', userRoutes);
 app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT,console.log(`Server running on port ${PORT}`));