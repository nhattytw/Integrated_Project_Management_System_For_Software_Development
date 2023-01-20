const mongoose = require('mongoose')

const MeetingsSchema = mongoose.Schema({
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    meetingInfo: [{
        meetingId: {
            type: String,
        },
        meetingTopic: {
            type: String,
        },
        meetingDuration: {
            type: Number,
        },
        meetingStartTime: {
            type: String,
        },
        meetingStartUrl: {
            type: String,
        },
    }],
    // team must be input with topic and time
    // check start time before displaying
}, { timestamps: true })
// If frequency is set to weekly the system is required to compute the next meeting date and give cancelation option, 
// Status can be active, canceled and resheduled. ? 
// frequency is weekly,daily or one time

module.exports = mongoose.model("Meeting", MeetingsSchema);
