const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    projectRepository: {
        type: String,
    },
    budget: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["active", "completed", "canceled"],
        default: "active"
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    },
    duration: {
        type: Number,
    },
    wbs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WBS'
    },
    descripion:{
        type:String
    },
    isAssignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teamAssignment'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('projectInfo', projectSchema)