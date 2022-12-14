const mongoose = require('mongoose')

const MeetingsSchema = mongoose.Schema({
    date:Date,
    frequency:String,
    Status:String,
    Title:String,
    Description:String,
    Mettinglink:String
})
// If frequency is set to weekly the system is required to compute the next meeting date and give cancelation option, Status can be active,canceled and resheduled. 
// frequency is weekly,daily or one time
const Meeting = mongoose.model("Meeting",MeetingsSchema)
