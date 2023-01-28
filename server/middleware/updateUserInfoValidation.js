const Joi = require('joi')
const messageFunction = require('../utils/messageFunction')

const validation = Joi.object({
      phoneNumber: Joi
            .number()
            .required(),
      email: Joi
            .string()
            .email()
            .trim(true)
            .required(),
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
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
            .required(),
      position: Joi
            .string()
            .max(25)
            .trim(true)
            .required(),
      gitHubAccount: Joi
            .string()
            .max(100)
            .trim(true)
            .required()
})

const updateUserInfoValidation = async (req, res, next) => {
      const payload = {
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            position: req.body.position,
            gitHubAccount: req.body.gitHubAccount
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

module.exports = updateUserInfoValidation