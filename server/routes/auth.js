const express = require('express')
const router = express.Router()
const { signup,
      signin,
      forgotPassword } = require('../controllers/userController')
const signupValidation = require('../middleware/signupValidation')
const forgotPasswordValidation = require('../middleware/forgotPasswordValidation')
const signinValidation = require('../middleware/signinValidation')

// @route    POST api/signup
// @desc     Registered user
// @access   Private
router.post(
      '/signup',
      signupValidation,
      signup
)

// @route    POST api/signin
// @desc     Signin into account
// @access   Private
router.post(
      '/signin',
      signinValidation,
      signin
)

// @route    PUT api/forgotPassword
// @desc     Resets account password
// @access   Private
router.put(
      '/forgotPassword',
      forgotPasswordValidation,
      forgotPassword
)

module.exports = router