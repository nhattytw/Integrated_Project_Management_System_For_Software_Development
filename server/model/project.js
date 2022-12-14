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
    },
    projectManager: {
        type: String,
    },
    duration: {
        type: Number,
    },
    wbs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wbs'
    }]
    // Schedule:
})

module.exports = mongoose.model('projectInfo', projectSchema)