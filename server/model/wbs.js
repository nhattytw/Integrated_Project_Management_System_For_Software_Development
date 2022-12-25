const mongoose = require('mongoose');

const wbsSchema = mongoose.Schema(
    {
        
            task:[{title:String,tasks:[],alottedTime:Date,taskStatus:String}],    
            StartingDate:{
                type:Date
            },
            EstimatedCompletionTime:
            {
                type:Date
            },// ECT project manager enters the this for every task and the  system adds it up and stores the date
            
    
        
    }
)
// const WBS = mongoose.model("WBS",WbsSchema)
module.exports = mongoose.model('WBS', wbsSchema)