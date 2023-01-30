const express = require('express')
const router = express.Router()
const searchUserValidation = require('../middleware/searchUserValidation')
const updateUserInfoValidation = require('../middleware/updateUserInfoValidation')
const passValidation = require('../middleware/passwordValidation')
const verifyAuthentication = require('../middleware/verifyAuthentication')
const {
      searchUser,
      getUsersInfo,
      updateUserInfo,
      updateUserPassword, } = require('../controllers/userController')

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.get(
      '/user/getUsers',
      verifyAuthentication,
      getUsersInfo
)

// @route    GET api/searchUser
// @desc     Return Searched user
// @access   Private
router.post(
      '/user/searchUser',
      verifyAuthentication,
      searchUserValidation,
      searchUser
)

// @route    PUT api/user/updateUserInfo/:id
// @desc     Update a user
// @access   Private
router.put(
      '/user/updateUserInfo',
      verifyAuthentication,
      updateUserInfoValidation,
      searchUserValidation,
      updateUserInfo
)

// @route    PUT api/user/updatePassword/:id
// @desc     Update a user
// @access   Private
router.put(
      '/user/updatePassword',
      verifyAuthentication,
      searchUserValidation,
      passValidation,
      updateUserPassword
)

module.exports = router