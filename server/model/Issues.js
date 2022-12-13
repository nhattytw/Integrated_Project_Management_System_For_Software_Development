const mongoose = require("mongoose")

const IssuesSchema = mongoose.Schema({
    issue:String,
    postedBy:String,
    status:String,
    
})
const Issues = mongoose.model('Issues',IssuesSchema);
