const express = require("express");
const router = express.Router();
const {CreateProject,ActiveProjectList} = require("../controllers/projectController");

router.post('/project/createProject',CreateProject)
router.get('/project/ActiveProject',ActiveProjectList);

module.exports = router