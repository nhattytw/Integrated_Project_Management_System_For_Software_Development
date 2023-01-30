const mongoose = require('mongoose');
//date format yy/mm/dd
const wbsSchema = mongoose.Schema({

    task: [{
        title: {
            type: String,
        },
        tasks: [],
  
        StartingDate: {
            type: Date
        },
        EndingDate: {
            type: Date
        },
        completedTasks:[]
    }],
    EstimatedCompletionTime:
    {
        type: Date
    },// ECT project manager enters the this for every task and the  system adds it up and stores the date
    taskStatus: {
        type: String,
    },
    progress:{
        type:Number,
        default:0
    },
    workload:{
        type:Number,
        
    }
    


}, { timestamps: true })
// const WBS = mongoose.model("WBS",WbsSchema)
module.exports = mongoose.model('WBS', wbsSchema)