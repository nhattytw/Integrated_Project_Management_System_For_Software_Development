const express = require("express")
const router = express.Router()
const { PostIssue } = require("../controllers/IssuesController")

// @route    POST api/Issues/PostIssue
// @desc     Add issue
// @access   Private
router.post(
      '/Issues/PostIssue',
      PostIssue
)

module.exports = router