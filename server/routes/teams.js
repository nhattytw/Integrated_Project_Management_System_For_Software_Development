const express = require("express");
const router = express.Router();
const { CreateTeams,assignProjectToTeam,getDevelopers } = require("../controllers/teamController")

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.post(
      '/Teams/newTeam',
      CreateTeams
)
router.put(
      '/Teams/assignProject',
      assignProjectToTeam
)
router.get(
      '/Teams/getDeveloper',
      getDevelopers
)
module.exports = router