//config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/PracticeDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB; 


// for postgre sql 
// const { Client } = require('pg');

// const connectDB = async () => {
//     const client = new Client({
//         host: 'localhost',
//         port: 5432,
//         user: 'your_pg_username',
//         password: 'your_pg_password',
//         database: 'PracticeDB',
//     });

//     try {
//         await client.connect();
//         console.log('PostgreSQL connected successfully');
//         // You can return the client to use for queries elsewhere
//         return client;
//     } catch (err) {
//         console.error('PostgreSQL connection error:', err.message);
//         process.exit(1); // Exit on failure
//     }
// };

// module.exports = connectDB;