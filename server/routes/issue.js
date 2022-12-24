const express = require("express")
const router = express.Router()
const {PostIssue} = require("../controllers/IssuesController")

router.post('/Issues/PostIssue',PostIssue)

module.exports = router