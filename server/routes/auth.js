const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const signupValidation = require('../middleware/signupValidation')
const signinValidation = require('../middleware/signinValidation')

// @route    GET api/signup
// @desc     Registered user
// @access   Private
router.post(
      '/signup',
      signupValidation,
      user.signup
)

// @route    GET api/signin
// @desc     Signin into account
// @access   Private
router.post(
      '/signin',
      signinValidation,
      user.signin
)

module.exports = router