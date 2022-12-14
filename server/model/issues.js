const mongoose = require("mongoose")

const issuesSchema = mongoose.Schema({
    issue: {
        type: String,
    },
    postedBy: {
        type: String,
    },
    status: {
        type: String,
    },

})
// const Issues = mongoose.model('issues', issuesSchema);

module.exports = mongoose.model('issues', issuesSchema)