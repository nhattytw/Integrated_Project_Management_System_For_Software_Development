const express = require("express");
const router = express.Router();
const {
  PostIssue,
  getIssues,
  postComment,
} = require("../controllers/issuesController");

// @route    POST api/Issues/PostIssue
// @desc     Add issue
// @access   Private
router.post("/Issues/PostIssue", PostIssue);
router.get("/Issues/getActiveIssues", getIssues);
router.post("/Issues/postComment", postComment);
module.exports = router;
