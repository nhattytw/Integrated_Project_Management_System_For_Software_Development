const express = require("express");
const router = express.Router();
const {
      CreateProject,
      ActiveProjectList,
      wbsUnassigedProjects,
      getProject, 
      getAssignedProject} = require("../controllers/projectController");

// @route    POST api/project/createProject
// @desc     Add Project
// @access   Private
router.post(
      '/project/createProject',
      CreateProject
)

// @route    POST api/project/ActiveProject
// @desc     Get Project List
// @access   Private
router.get(
      '/project/ActiveProject',
      ActiveProjectList
)

// @route    PUT api/ ?????
// @desc     Add wbs to an existing project
// @access   Private
router.get(
      '/project/wbsNotSet',
      wbsUnassigedProjects
)

// @route    GET api/project/getProject
// @desc     Get All Project With No Teams Assigned
// @access   Private
router.get(
      '/project/getProject',
      getProject
)

// @route    GET api/project/getAssignedProject
// @desc     Get All Project With Teams Assigned
// @access   Private
router.get(
      '/project/getAssignedProject',
      getAssignedProject
)

module.exports = router