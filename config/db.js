const mongoose = require("mongoose")

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {
        console.log(`Successfully connected to host ${conn.connection.host}`)
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1)
    })
}

module.exports = connectDB