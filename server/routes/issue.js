const express = require("express");
const router = express.Router();
const {
  PostIssue,
  getIssues,
  postComment,
  setIssueResolved,
  getResolvedIssues
} = require("../controllers/issuesController");

// @route    POST api/Issues/PostIssue
// @desc     Add issue
// @access   Private
router.post("/Issues/PostIssue", PostIssue);
router.get("/Issues/getActiveIssues", getIssues);
router.post("/Issues/postComment", postComment);
router.post('/Issues/setIssueResolved',setIssueResolved)
router.get("/Issues/getResolvedIssues",getResolvedIssues)
module.exports = router;
