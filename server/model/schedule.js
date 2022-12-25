const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    name: {
        type: String,
    },
    wbs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WBS'
    }],
    projectEstimatedComplitionTime: {
        type: Number,
    },
}, { timestamps: true })

module.exports = mongoose.model('scheduleInfo', scheduleSchema)