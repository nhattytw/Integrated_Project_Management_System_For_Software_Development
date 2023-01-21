const express = require('express')
const router = express.Router()
const { addWbs } = require('../controllers/wbsController')

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.post(
    '/wbs/addWbs',
    addWbs
)


module.exports = router