const mongoose = require('mongoose');

const teamAssignmentSchema = mongoose.Schema({
      teamName: {
            type: String,
      },
      // projectManager:{
      //       type: mongoose.Schema.Types.ObjectId,
      //       ref: 'userInfo'
      //   },
      members: [],
      assignedProject: {
            type: mongoose.Schema.Types.String,
            ref: 'projectInfo'
      },
      projectManager: {
            type: mongoose.Schema.Types.String,
            ref: 'userInfo'
      },
}, { timestamps: true })

module.exports = mongoose.model('teamAssignment', teamAssignmentSchema)

