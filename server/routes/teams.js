const express = require("express");
const router = express.Router();
const {CreateTeams} = require("../controllers/teamController")

router.post("/Teams/newTeam",CreateTeams)

module.exports = router