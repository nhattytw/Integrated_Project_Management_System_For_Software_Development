const mongoose = require('mongoose');

const Item = mongoose.Schema(
    {
        task:[{title:String,tasks:[]}],    
        EstimatedCompletionTime:Date,//ECT
        taskStatus:String

    }
)
const Items = mongoose.model('Item',ItemSchema);
// When building a route for this model its best to accpet the tasks array,Title,ECT,Task status separetly and posting the database separetly,
// this comment is vague be sure to ask a question before messing with it !! 