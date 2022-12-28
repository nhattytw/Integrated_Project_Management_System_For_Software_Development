const mongoose = require("mongoose")

const dependencySchema = mongoose.Schema({
    projectName:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'projectInfo'
        }
    ],
    parentTask:{
        type:String
    },//name of the task that needs to be completed before the 
    tasks:{
        type:[] //list of tasks that await the completion of the parent
    },
    type:{
        type:String,
        enum:["strong","Simulatnious","none"],
        default:"none"
    },

})

module.exports= mongoose.model("dependency",dependencySchema)