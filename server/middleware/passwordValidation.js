const Joi = require('joi')
const errorFunction = require('../utils/errorFunction')

const validations = Joi.object({
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
      newPassword: Joi
            .string()
            .min(8)
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
            .required(),
})

const passValidation = async (req, res, next) => {
      const { userName, password, newPassword } = req.body

      const payload = {
            userName: userName,
            password: password,
            newPassword: newPassword,
      }

      const { error } = validations.validate(payload)
      if (error)
            return res
                  .status(406)
                  .json(
                        errorFunction(
                              true,
                              `Error in User Input Data: , ${error.message}`)
                  )
      else
            next()
}

module.exports = passValidation