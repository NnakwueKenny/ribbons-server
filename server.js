const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const {logger} = require('./middleware/logEvents');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// import routes
// const registerRoute = require('./routes/register');
// const authRoute = require('./routes/auth');
// const usersRoute = require('./routes/users');
const userChatRoute = require('./routes/userChat');
const adminRegisterRoute = require('./routes/adminRegister');
const adminLoginRoute = require('./routes/adminLogin');

const connectDB = require('./config/dbConnection');
connectDB();

const DB = mongoose.connection;

const server = express();

DB.once('open', () => {
    const PORT = process.env.PORT || 3500;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
});

server.use(logger);
server.use(cors(corsOptions));

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// To access public files
server.use('/uploads', express.static('uploads'))

// server.use('/user', registerRoute);
// server.use('/user', authRoute);
// server.use('/user', usersRoute);
// server.use('/employee', employeeRoute);

// User Routes
server.use('/user', userChatRoute);

// Admin Routes
server.use('/admin', adminRegisterRoute);
server.use('/admin', adminLoginRoute);