require("dotenv").config();

const express = require("express")
const connectDB = require("./config/db")

const app = express()
const UserRoutes = require("./routes/userRoutes")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB()
app.use("/", UserRoutes)

module.exports = app;