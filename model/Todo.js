// import mongoose from 'mongoose'
const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    tasks: [],
})

module.exports = mongoose.model( "Todo", TodoSchema);
