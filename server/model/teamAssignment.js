const mongoose = require('mongoose');

const teamAssignmentSchema = mongoose.Schema({
      teamName: {
            type: String,
      },
      members: [{
            type: String
      }],
      assignedProject: {
            type: mongoose.Schema.Types.String,
            ref: 'projectInfo'
      }
}, { timestamps: true })

module.exports = mongoose.model('teamAssignment', teamAssignmentSchema)

