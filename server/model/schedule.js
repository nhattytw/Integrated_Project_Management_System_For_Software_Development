const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    projectName:String,
    projectSchedule:[
        {
            task:String,
            start:Date,
            end:Date
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('scheduleInfo', scheduleSchema)