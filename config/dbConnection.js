const mongoose = require('mongoose');
// console.log(process.env.port)
const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB CONNECTED')
    })
    .catch(err => {
        console.log(`DB CONNECTION ERROR`, err)
    })
}

module.exports = connectDB;