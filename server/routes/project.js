const express = require("express");
const router = express.Router();
const { CreateProject, ActiveProjectList,assignWbsToProject} = require("../controllers/projectController");

// @route    POST api/project/createProject
// @desc     Add project
// @access   Private
router.post(
      '/project/createProject',
      CreateProject
)

// @route    POST api/project/ActiveProject
// @desc     get project list
// @access   Private
router.get(
      '/project/ActiveProject',
      ActiveProjectList
);
// @route    put api/
// @desc     Add wbs to an existing project
// @access   Private
router.put('/project/assignWbs',assignWbsToProject)

module.exports = router