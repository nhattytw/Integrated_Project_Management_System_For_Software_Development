const connectToDB = require("../utils/dbConnect");
const taskModel = require("../model/tasks");
const messageFunction = require("../utils/messageFunction");

// @desc    Assign and get tasks
// @access  public
//assign specific tasks to developers, in teams assigned to a certain project
const PostTask = async (req, res) => {
  connectToDB();
  try {
    // developer n
    const {
      task,
      description,
      status,
      estimatedCompletionTime,
      comments,
      notify,
    } = req.body;

    const existingTask = await taskModel
      .findOne({
        task: task,
      })
      .lean(true);

    if (existingTask) {
      return res.status(403).json(messageFunction(true, "Task exists"));
    } else {
      const newTask = new taskModel({
        task: task,
        description: description,
        status: status,
        estimatedCompletionTime: estimatedCompletionTime,
        comments: comments,
      });
      if (await newTask.save()) {
        return res
          .status(201)
          .json(messageFunction(false, "Task Created", newTask));
      } else {
        return res
          .status(403)
          .json(messageFunction(true, "Failed to Create Task"));
      }
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json(messageFunction(true, "Failed Adding Task"));
  }
};

// @desc     Get All Assigned Tasks
// @access   Public
const getAssignedTasks = async (_req, res) => {
  connectToDB();
  try {
    const existingTasks = await taskModel.find();

    if (!existingTasks) {
      return res.status(400).json(messageFunction(true, "No Tasks Assigned."));
    } else {
      // Show Task Information
      // Data - existingTask
      return res
        .status(200)
        .json(messageFunction(false, "Assigned Tasks", existingTasks));
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(messageFunction(true, "Failed To Fetch Tasks, Please Try Again."));
  }
};
// change task status to completed.
const updateTaskStatus = async (req, res) => {
  connectToDB();
  try {
    const { task, status } = req.body;

    const existingTask = await taskModel
      .findOne({
        task: task,
      })
      .lean(true);

    if (!existingTask) {
      return res
        .status(403)
        .json(messageFunction(true, "Task Does Not Exist. Cannot Update."));
    } else {
      try {
        const response = await taskModel.updateOne(
          { task: existingTask.task },
          {
            $set: {
              status: status,
            },
          },
          {
            new: true,
          }
        );
        return res
          .status(201)
          .json(
            messageFunction(
              false,
              "Successfully Updated Task Status.",
              response
            )
          );
      } catch (error) {
        return res
          .status(403)
          .json(messageFunction(true, "Updating Task Status Failed."));
      }
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(
        messageFunction(true, "Updating Task Status Failed. Please Try Again.")
      );
  }
};

const searchTasks = async (req, res) => {
  connectToDB();
  try {
    const { status } = req.body;

    console.log(status);

    const existingTasks = await taskModel.find({
      status: status,
    });

    if (!existingTasks) {
      return res.status(400).json(messageFunction(true, "No Tasks Found."));
    } else {
      return res
        .status(200)
        .json(messageFunction(false, "Tasks", existingTasks));
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(messageFunction(true, "Failed To Fetch Tasks, Please Try Again."));
  }
};

module.exports = { PostTask, getAssignedTasks, updateTaskStatus, searchTasks };
