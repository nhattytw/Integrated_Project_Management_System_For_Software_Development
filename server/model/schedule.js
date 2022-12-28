const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    titles:[],
    expectedCompletionTime:{
        type:Date
    }



}, { timestamps: true })

module.exports = mongoose.model('scheduleInfo', scheduleSchema)