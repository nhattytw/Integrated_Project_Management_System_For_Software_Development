const mongoose = require('mongoose')

const MeetingsSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    frequency: {
        type: String,
    },
    Status: {
        type: String,
    },
    Title: {
        type: String,
    },
    Description: {
        type: String,
    },
    Mettinglink: {
        type: String,
    },
})
// If frequency is set to weekly the system is required to compute the next meeting date and give cancelation option, Status can be active,canceled and resheduled. 
// frequency is weekly,daily or one time

module.exports = mongoose.model("Meeting", MeetingsSchema);
