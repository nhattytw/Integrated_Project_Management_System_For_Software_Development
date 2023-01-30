const mongoose = require("mongoose")

const issuesSchema = mongoose.Schema({
    title:{
        type:String
    },
    body: {
        type: String,
    },
    postedBy: {
        type: String,
    },
    comment:{
        type:[]
    },
    status: {
        type: String,
        enum: ['Active', 'Resolved', 'Pending'],
        default: "Active"
    },
    notify: {
        type: String,
        enum: ['All', 'Team'],
        default: "All"

    }
}, { timestamps: true })
// const Issues = mongoose.model('issues', issuesSchema);
//status is updated not inserted

module.exports = mongoose.model('issues', issuesSchema)