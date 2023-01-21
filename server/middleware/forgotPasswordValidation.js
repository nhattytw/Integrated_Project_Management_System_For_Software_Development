const Joi = require('joi')
const messageFunction = require('../utils/messageFunction')

const validation = Joi.object({
      userName: Joi
            .string()
            .alphanum()
            .trim(true)
            .required(),
      password: Joi
            .string()
            .min(8)
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
            .required(),
      secret: Joi
            .string()
            .max(20)
            .required(),
})

const forgotPasswordValidation = async (req, res, next) => {
      const payload = {
            userName: req.body.userName,
            password: req.body.password,
            secret: req.body.secret,
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

module.exports = forgotPasswordValidation