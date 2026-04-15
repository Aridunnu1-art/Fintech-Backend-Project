require ('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const app = require('./src/app');
const PORT = process.env.PORT; 

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server running on port ${PORT}`);
});