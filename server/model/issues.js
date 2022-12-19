const { string } = require("joi")
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
        enum:['Active','Resolved','pending'],
        default:"Acti"
    },
    notify:{
        type:String,
        enum:['All','Team'],
        default:"All"
        
    }

})
// const Issues = mongoose.model('issues', issuesSchema);
//status is updated not inserted
module.exports = mongoose.model('issues', issuesSchema)