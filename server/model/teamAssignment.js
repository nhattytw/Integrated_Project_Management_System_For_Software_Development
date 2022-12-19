const mongoose = require('mongoose');

const teamAssignmentSchema = mongoose.Schema(
      {
            teamName:String,
            members:[{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:'userInfo'
            }]
      }
)

module.exports = mongoose.model('teamAssignment', teamAssignmentSchema)