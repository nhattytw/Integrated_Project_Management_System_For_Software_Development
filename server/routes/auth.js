const express = require('express')
const router = express.Router()
const { signup,
      signin } = require('../controllers/userController')
const signupValidation = require('../middleware/signupValidation')
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

module.exports = router