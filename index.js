const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import routes
const authRoute = require('./routes/auth');
const contactsRoute = require('./routes/contacts');

dotenv.config();

//Connect to DataBase
mongoose.connect(
        process.env.DB_CONNECTION,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log('Database connection successful')
    );

//Middleware
app.use(express.json());
//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/contacts', contactsRoute);


app.listen(3001, () => console.log('Server is running'));