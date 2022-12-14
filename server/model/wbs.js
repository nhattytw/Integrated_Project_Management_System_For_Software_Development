const mongoose = require('mongoose');

const wbsSchema = mongoose.Schema(
    {
        item: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item'
        }]
    }
)
// const WBS = mongoose.model("WBS",WbsSchema)
module.exports = mongoose.model('wbs', wbsSchema)