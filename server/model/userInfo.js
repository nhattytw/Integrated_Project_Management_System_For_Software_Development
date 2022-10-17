const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
      fullName: {
            type: String,
            // required: true
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
      created: {
            type: Date,
            default: Date.now
      },
})

module.exports = mongoose.model('userInfo', userSchema)