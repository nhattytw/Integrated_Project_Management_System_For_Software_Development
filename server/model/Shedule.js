const mongoose = require("mongoose")

const ScheduleSchema = mongoose.Schema(
    {
        Name:String,
        wbs:[{type:mongoose.Schema.Types.ObjectId,ref:'WBS'}],
        ProjectEstimatedComplitionTime:Number
    }
)