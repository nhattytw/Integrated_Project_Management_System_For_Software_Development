const Joi = require('joi')
const messageFunction = require('../utils/messageFunction')

const validation = Joi.object({
      topic: Joi
            .string()
            .min(2)
            .max(50)
            .trim(true)
            .required(),
      start_time: Joi
            .date()
            .required(),
      duration: Joi
            .number()
            .required(),
      userName: Joi
            .string()
            .alphanum()
            .min(5)
            .max(10)
            .trim(true)
            .required()
})

const meetingValidation = async (req, res, next) => {
      const payload = {
            topic: req.body.topic,
            duration: req.body.duration,
            start_time: req.body.start_time,
            userName: req.body.userName,
      }
      const { error } = validation.validate(payload)

      if (error)
            return res
                  .status(406)
                  .json(
                        messageFunction(true, `Error in User Input Data: , ${error.message}`)
                  )
      else
            next()
}

module.exports = meetingValidation