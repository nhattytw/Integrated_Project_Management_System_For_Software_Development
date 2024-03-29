const connectToDB = require("../utils/dbConnect");
const taskModel = require("../model/tasks");
const user = require("../model/userInfo");
const messageFunction = require("../utils/messageFunction");
const WBS = require('../model/wbs')
const project = require("../model/project");
const { compareSync } = require("bcrypt");
const mongoose = require("mongoose");

// @desc    Assign and get tasks
// @access  public
//assign specific tasks to developers, in teams assigned to a certain project
const PostTask = async (req, res) => {
  connectToDB();
  try {
    // developer n
    const {
      title,
      description,
      developer,
      status,
      estimatedCompletionTime,
      comments,
      notify,
    } = req.body;

    const existingTask = await taskModel
      .findOne({
        title: title,
      })
      .lean(true);

    const dev = await user.findOne({ userName: developer }).lean(true);

    if (existingTask) {
      return res.status(403).json(messageFunction(true, "Task exists"));
    } else {
      const newTask = new taskModel({
        title: title,
        description: description,
        developer: dev,
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
const getAssignedTasks = (req, res) => {
  connectToDB();
  try {
    const dev = user.findOne({ userName: developer }).lean(true);
    const assignedTasks = taskModel
      .find()
      .populate("title", "developer", "status")
      .where("developer")
      .equals(dev)
      .lean(true)
      .exec((err, result) => {
        if (err) {
          console.log("error");
        } else {
          const jsonContent = JSON.stringify(result);
          res.send(jsonContent);
        }
      });

    if (!assignedTasks) {
      return res.status(400).json(messageFunction(true, "No Tasks Assigned."));
    } else {
      return res
        .status(200)
        .json(messageFunction(false, "Assigned Tasks", assignedTasks));
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
    const { title, status } = req.body;

    const existingTask = await taskModel
      .findOne({
        title: title,
      })
      .lean(true);

    if (!existingTask) {
      return res
        .status(403)
        .json(messageFunction(true, "Task Does Not Exist. Cannot Update."));
    } else {
      try {
        const response = await taskModel.updateOne(
          { title: existingTask.title },
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
const postCompletedTasks = (req, res) => {
  function removeDuplicates(arr) {
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}
const removeElements=(a,b)=>{
  a = a.filter(function (item) {
    return b.indexOf(item) === -1;
});
return a
}
  connectToDB();
  const { ProjectName,finishedTask } = req.body;
  let RemainingTasks = [];
  let progress = 0;
  let taskUpdate = [];
  let wbsCompletedTasks=[];
  let wbsTask = []
  let index = 0;
  let id = mongoose.Schema.Types.ObjectId

  project
    .findOne({ projectName: ProjectName })
    .populate("wbs")
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const { wbs } = result;
        id=wbs._id
        progress = wbs.progress
        taskUpdate = wbs.task;

        console.log(taskUpdate)
        for(task in finishedTask)
        {
            taskUpdate.forEach((task_update)=>{
              if(task_update.title === task){
                let temp = []
                temp=[...task_update.completedTasks,...finishedTask[task]]
                task_update.completedTasks=[...temp]
                progress += finishedTask[task].length
                wbsTask = removeElements(task_update.tasks,finishedTask[task])
                console.log(wbsTask)
                task_update.tasks=wbsTask
              
                
              }
            })
        }
        
         WBS.findByIdAndUpdate(id,{task:taskUpdate,progress:progress},{new:true},((err,response)=>{
          if(err){
            console.log(err)
          }
          else{

              if(response.progress <= response.workload){
                
                project.findOneAndUpdate({projectName:ProjectName},{status:"completed"},{new:true},((err,Projectresponse)=>{
                  console.log(Projectresponse)
                }))
              }  
          }
          const jsonData = JSON.stringify(response)
          res.send(jsonData)
         }))
      }
      
    });
    

 
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

module.exports = {
  PostTask,
  getAssignedTasks,
  updateTaskStatus,
  searchTasks,
  postCompletedTasks,
};
