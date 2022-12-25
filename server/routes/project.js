const express = require("express");
const router = express.Router();
const { CreateProject, ActiveProjectList } = require("../controllers/projectController");

// @route    POST api/Issues/PostIssue
// @desc     Add issue
// @access   Private
router.post(
      '/project/createProject',
      CreateProject
)

// @route    POST api/Issues/PostIssue
// @desc     Add issue
// @access   Private
router.get(
      '/project/ActiveProject',
      ActiveProjectList
);

module.exports = router