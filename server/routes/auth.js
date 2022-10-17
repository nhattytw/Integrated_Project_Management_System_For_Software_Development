const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const signupValidation = require('../middleware/signupValidation')
const signinValidation = require('../middleware/signinValidation')

// @route POST api/signup
router.post(
      '/signup',
      signupValidation,
      user.signup
)

// @route POST api/signin
router.post(
      '/signin',
      signinValidation,
      user.signin
)

module.exports = router