const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const signupValidation = require('../controllers/signupValidation')
const signinValidation = require('../controllers/signinValidation')

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