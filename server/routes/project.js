const express = require("express");
const router = express.Router();
const verifyAuthentication = require('../middleware/verifyAuthentication')
const {
      CreateProject,
      ActiveProjectList,
      wbsUnassigedProjects,
      getProject,
      getAssignedProject,
      getProjectTasks,
      findProject,
      findProjectSummary,
      getDeveloperAssigenedProject,
      getAllProject, 
      ActiveCompletedProjectList} = require("../controllers/projectController");

// @route    POST api/project/createProject
// @desc     Add Project
// @access   Private
router.post(
      '/project/createProject',
      verifyAuthentication,
      CreateProject
)

// @route    POST api/project/getProject
// @desc     Get All Project With No Teams Assigned
// @access   Private
router.post(
      '/project/getAllProject',
      verifyAuthentication,
      getAllProject
)

// @route    POST api/project/ActiveProject
// @desc     Get Project List
// @access   Private
router.post(
      '/project/ActiveProject',
      // verifyAuthentication,
      ActiveProjectList
)

// @route    PUT api/ ?????
// @desc     Add wbs to an existing project
// @access   Private
router.get(
      '/project/wbsNotSet',
      // verifyAuthentication,
      wbsUnassigedProjects
)

// @route    POST api/project/getProject
// @desc     Get All Project With No Teams Assigned
// @access   Private
router.post(
      '/project/getProject',
      verifyAuthentication,
      getProject
)

// @route    GET api/project/getAssignedProject
// @desc     Get All Project With Teams Assigned
// @access   Private
router.get(
      '/project/getAssignedProject',
      // verifyAuthentication,
      getAssignedProject
)

// @route    GET api/project/getProjectTasks
// @desc     Get Project With Assigned Task
// @access   Private
router.get(
      '/project/getProjectTasks',
      getProjectTasks
)

// @route    POST api/project/findProject
// @desc     Find Project
// @access   Private
router.post(
      '/project/findProject',
      findProject
)
router.post(
      '/project/findProjectSummary',
      findProjectSummary
)
router.post(
      '/project/completedProjects',
      ActiveCompletedProjectList
)
router.post('/project/myprojects', getDeveloperAssigenedProject)

module.exports = router