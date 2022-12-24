const express = require('express')
const router = express.Router()
const { addItems } = require('../controllers/itemController')

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.post(
    '/item/addItem',
    addItems
)
//use the above comment for every route

module.exports = router