const mongoose = require("mongoose");


const Project = new mongoose.Schema({
    ProjectName:String,
    ProjectRepository:String,
    Budget:Number,
    Status:String,
    ProjectManager:String,
    Duration:Number,
    Wbs: [{type:mongoose.Schema.Types.ObjectId,ref:'WBS'}]
    // Schedule:
})