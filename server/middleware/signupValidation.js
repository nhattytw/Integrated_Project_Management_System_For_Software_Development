const Joi = require('joi')
const errorFunction = require('../utils/errorFunction')

const validation = Joi.object({
      fullName: Joi
            .string()
            .min(5)
            .max(70)
            .trim(true)
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
})

const signupValidation = async (req, res, next) => {
      const payload = {
            fullName: req.body.fullName,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
      }

      const { error } = validation.validate(payload)
      if (error)
            return res
                  .status(406)
                  .json(
                        errorFunction(true, `Error in User Input Data: , ${error.message}`)
                  )
      else
            next()
}

module.exports = signupValidation