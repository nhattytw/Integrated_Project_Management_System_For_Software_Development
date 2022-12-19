const mongoose = require('mongoose');


const itemSchema = mongoose.Schema(
    {
        task:[{title:String,tasks:[],alottedTime:Date}],    
        StartingDate:{
            type:Date
        },
        EstimatedCompletionTime:
        {
            type:Date
        },// ECT project manager enters the this for every task and the  system adds it up and stores the date
        taskStatus:String

    }
)

module.exports=mongoose.model("Item",itemSchema);
// When building a route for this model its best to accpet the tasks array,Title,ECT,Task status separetly and posting the database separetly,
// this comment is vague be sure to ask a question before messing with it !! 