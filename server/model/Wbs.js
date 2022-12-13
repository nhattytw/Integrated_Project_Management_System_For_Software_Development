const mongoose = require('mongoose');

const WbsSchema = mongoose.Schema(
    {
        item:[{type:mongoose.Schema.Types.ObjectId,ref:'Item'}]
    }
)
const WBS = mongoose.model("WBS",WbsSchema)
