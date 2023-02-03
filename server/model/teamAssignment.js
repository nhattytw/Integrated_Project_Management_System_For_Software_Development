const mongoose = require('mongoose');

const teamAssignmentSchema = mongoose.Schema({
      teamName: {
            type: String,
      },

      members: [],
      assignedProject: {
            type: String,
            ref: 'projectInfo'
      },
      projectManager: {
            type: String,
            ref: 'userInfo'
      },
}, { timestamps: true })

module.exports = mongoose.model('teamAssignment', teamAssignmentSchema)

