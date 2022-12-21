const express = require("express");
const router = express.Router();
const {CreateProject} = require("../controllers/projectController");

router.post('/project/createProject',CreateProject)

module.exports = router