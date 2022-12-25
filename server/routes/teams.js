const express = require("express");
const router = express.Router();
const { CreateTeams } = require("../controllers/teamController")

// @route    GET api/getUsers
// @desc     Return all Registered users
// @access   Private
router.post(
      '/Teams/newTeam',
      CreateTeams
)

module.exports = router