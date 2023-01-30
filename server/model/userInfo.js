const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
      firstName: {
            type: String,
      },
      lastName: {
            type: String,
      },
      dob: {
            type: Date
      },
      phoneNumber: {
            type: Number,
      },
      email: {
            type: String,
      },
      userName: {
            type: String,
      },
      password: {
            type: String,
      },
      secret: {
            type: String,
      },
      position: {
            type: String,
      },
      gitHubAccount: {
            type: String,
      },
      assignedTeam:{
            type:String
            }
      
            
            
      
      
}, { timestamps: true })

module.exports = mongoose.model('userInfo', userSchema)