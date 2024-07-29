const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const authenticate = require('./middlewares/authMiddleware');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/expenses', authenticate, expenseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
