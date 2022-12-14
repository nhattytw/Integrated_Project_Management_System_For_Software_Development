const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
    {
        task: [{
            title: String,
            tasks: []
        }],
        estimatedCompletionTime: Date, //ECT
        taskStatus: {
            type: String,
        },

    }
)
// const Items = mongoose.model('item', itemSchema);

// When building a route for this model its best to accpet the tasks array,Title,ECT,Task status separetly and posting the database separetly,
// this comment is vague be sure to ask a question before messing with it !! 

module.exports = mongoose.model('item', itemSchema);