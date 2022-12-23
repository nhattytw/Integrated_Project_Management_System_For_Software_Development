const mongoose = require('mongoose');

const teamAssignmentSchema = mongoose.Schema(
      {
            teamName:String,
            members:[],
            assignedProject:[{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'projectInfo'
            }]
      }
)

module.exports = mongoose.model('teamAssignment', teamAssignmentSchema)