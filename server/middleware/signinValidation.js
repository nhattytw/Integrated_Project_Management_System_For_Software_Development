const Joi = require('joi')
const messageFunction = require('../utils/messageFunction')

const validation = Joi.object({
      userName: Joi
            .string()
            .alphanum()
            .min(5)
            .max(10)
            .trim(true)
            .required(),
      password: Joi
            .string()
            .min(8)
            .required(),
})

const signinValidation = async (req, res, next) => {
      const { userName, password } = req.body

      const payload = {
            userName: userName,
            password: password,
      }

      const { error } = validation.validate(payload)
      if (error)
            return res
                  .status(406)
                  .json(
                        messageFunction(
                              true,
                              `Error in User Input Data: , ${error.message}`)
                  )
      else
            next()
}

module.exports = signinValidation