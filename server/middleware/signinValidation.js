const Joi = require('joi')
const errorFunction = require('../utils/errorFunction')

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
                        errorFunction(
                              true,
                              `Error in User Input Data: , ${error.message}`)
                  )
      else
            next()
}

module.exports = signinValidation 