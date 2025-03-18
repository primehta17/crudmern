const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
// const itemRoutes = require('./routes/itemRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
// app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT,console.log(`Server running on port ${PORT}`));