const express = require('express')
const router = express.Router()
const searchUserValidation = require('../middleware/searchUserValidation')
const signinValidation = require('../middleware/signinValidation')
const passValidation = require('../middleware/passwordValidation')
const {
      searchUser,
      getUsersInfo,
      updateUserInfo,
      updateUserPassword, } = require('../controllers/userController')
// const verifyAuthentication = require('../middleware/verifyAuthentication')

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.get(
      '/user/getUsers',
      //verifyAuthentication.js,
      getUsersInfo
)

// @route    GET api/signin
// @desc     Return Searched user
// @access   Private
router.post(
      '/user/searchUser',
      searchUserValidation,
      //verifyAuthentication.js,
      searchUser
)

// @route    PUT api/user/updateUserInfo/:id
// @desc     Update a user
// @access   Private
router.put(
      '/user/updateUserInfo',
      //verifyAuthentication.js,
      signinValidation,
      searchUserValidation,
      updateUserInfo
)

// @route    PUT api/user/updatePassword/:id
// @desc     Update a user
// @access   Private
router.put(
      '/user/updatePassword',
      //verifyAuthentication.js,
      searchUserValidation,
      passValidation,
      updateUserPassword
)

module.exports = router