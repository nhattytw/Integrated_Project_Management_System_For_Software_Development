const express = require('express')
const router = express.Router()
const {addWbs} = require('../controllers/WbsController')

router.post(
    '/wbs/addWbs',
    addWbs
)

module.exports = router