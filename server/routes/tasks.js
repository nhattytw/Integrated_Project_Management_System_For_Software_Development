const express = require("express");
const router = express.Router();
const {
  PostTask,
  getAssignedTasks,
  updateTaskStatus,
  searchTasks,
  postCompletedTasks,
} = require("../controllers/taskController");

//@route    Post api/task/PostTask
//@desc     Add Task
//@access   private

router.post("/task/PostTask", PostTask);

//@route    Get api/task/AssignedTasks
//@desc     Get assigned tasks
//@access   private

router.get("/task/getAssignedTasks", getAssignedTasks);

//@route    Put api/task/updateTaskStatus
//@desc     Update state of task progress
//@access   private

router.put("/task/updateTaskStatus", updateTaskStatus);

//@route    Post api/task/searchTasks
//@desc     Get tasks based on status
//@access   private

router.post("/task/searchTasks", searchTasks);
router.post('/task/postCompletedTasks',postCompletedTasks)

module.exports = router;
