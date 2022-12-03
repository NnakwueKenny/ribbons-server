const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const {logger} = require('./middleware/logEvents');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// import routes
const userChatRoute = require('./routes/userChat');
// const allChatsRoute = require('./routes/allChats');

const adminRoute = require('./routes/admin');
const adminRegisterRoute = require('./routes/adminRegister');
const adminLoginRoute = require('./routes/adminLogin');
const adminChatRoute = require('./routes/adminChat');

const agentRoute = require('./routes/agent');
const agentRegisterRoute = require('./routes/agentRegister');
const agentLoginRoute = require('./routes/agentLogin');
// const agentChatRoute = require('./routes');

const getAllDraftsRoute = require('./routes/getAllDrafts');
const sendDraftRoute = require('./routes/sendDraft');
const deleteDraftRoute = require('./routes/deleteDraft');

const getAllSupportRoute = require('./routes/getAllSupport');
const sendSupportRoute = require('./routes/sendSupport');
const deleteSupportRoute = require('./routes/deleteSupport');

const sendComplaintRoute = require('./routes/sendComplaint');
const updateComplaintRoute = require('./routes/updateComplaint');
const getAllComplaintsRoute = require('./routes/getAllComplaints');
const getOneComplaintRoute = require('./routes/getOneComplaint');

const chatRoute = require('./routes/chat');
const myChatsRoute = require('./routes/myChats');

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

// User Routes
server.use('/user', userChatRoute);

// Admin Routes
server.use('/admin', adminRoute);
server.use('/admin', adminRegisterRoute);
server.use('/admin', adminLoginRoute);
server.use('/admin', adminChatRoute);

// Agent Routes
server.use('/agent', agentRoute);
server.use('/agent', agentRegisterRoute);
server.use('/agent', agentLoginRoute);

// AllChats Route
// server.use('/all-chats', allChatsRoute);

// Draft Routes
server.use('/draft', getAllDraftsRoute);
server.use('/draft', sendDraftRoute);
server.use('/draft', deleteDraftRoute);

// Support Routes
server.use('/support', getAllSupportRoute);
server.use('/support', sendSupportRoute);
server.use('/support', deleteSupportRoute);

// Chats Routes
server.use('/chat', chatRoute);
server.use('/chat', myChatsRoute);

// Complaints Routes
server.use('/complaint', sendComplaintRoute);
server.use('/complaint', updateComplaintRoute);
server.use('/complaint', getAllComplaintsRoute);
server.use('/complaint', getOneComplaintRoute);