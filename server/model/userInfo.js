const mongoose = require('mongoose')
const Joi = require('joi')
const { date } = require('joi')

const userSchema = new mongoose.Schema({
      firstName: {
            type: String,
            // required: true
      },
      lastName: {
            type: String,
            // required: true
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
            // required: true
      },
      password: {
            type: String,
            // required: true
      },
      position: {
            type: String,
      },
      gitHubAccount: {
            type: String,
      },
      created: {
            type: Date,
            default: Date.now
      },
})

module.exports = mongoose.model('userInfo', userSchema)