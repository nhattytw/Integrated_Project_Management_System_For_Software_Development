const express = require("express");
const router = express.Router();
const { CreateTeams,
      assignProjectToTeam,
      getDevelopers,
      getTeam,
      getAssignedTeam } = require("../controllers/teamController");
const verifyAuthentication = require("../middleware/verifyAuthentication");

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.post(
      '/Teams/newTeam',
      verifyAuthentication,
      CreateTeams
)

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.put(
      '/Teams/assignProject',
      verifyAuthentication,
      assignProjectToTeam
)

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.get(
      '/Teams/getDeveloper',
      verifyAuthentication,
      getDevelopers
)

// @route    GET api/getTeam
// @desc     Return all Teams With No Project Assigned
// @access   Private
router.get(
      '/Teams/getTeam',
      verifyAuthentication,
      getTeam
)

// @route    GET api/getAssignedTeam
// @desc     Return all Teams With Project Assigned
// @access   Private
router.get(
      '/Teams/getAssignedTeam',
      verifyAuthentication,
      getAssignedTeam
)


module.exports = router