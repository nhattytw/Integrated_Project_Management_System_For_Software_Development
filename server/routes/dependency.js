const express = require("express");

const router = express.Router();
const createSchedule = require('../controllers/dependecyController')

router.post("/dependency/create",createSchedule)

module.exports = router