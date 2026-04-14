require ('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const app = require('./src/app');
const PORT = process.env.PORT; 
connectDB();
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});