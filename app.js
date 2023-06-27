require("dotenv").config();

const express = require("express")
const connectDB = require("./config/db")
const cors = require('cors');

const app = express()
const UserRoutes = require("./routes/userRoutes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

connectDB()
app.use("/", UserRoutes)

module.exports = app;