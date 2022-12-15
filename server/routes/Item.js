const express = require('express')
const router = express.Router()
const {addItems} = require('../controllers/itemController')

router.post(
    'item/addItem',
    addItems
)