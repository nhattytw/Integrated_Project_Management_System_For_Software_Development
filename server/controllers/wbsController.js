const connectToDB = require("../utils/dbConnect");
const user = require("../model/userInfo");
const errorFunction = require("../utils/messageFunction");
const item = require("../model/wbs");
const project = require("../model/project");

// @desc     Add WBS
// @access   Public
//create a work break down structure for a project. once the wbs has been created it returns an associated id
//task is an array of objects, and each object contains a start and finish date
const findDateDiff=(dt1,dt2)=>{
  let diff = Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
  return diff
}
const timeWorkloadEstimation = (task) => {
  
  let firstTaskDate = new Date(task[0].StartingDate)
  let workload = 0;
  let TotalDay = 0
 
  task.forEach((element) => {
    workload += element.tasks.length;
    let dt1 = new Date(element.StartingDate);
    let dt2 = new Date(element.EndingDate);
    TotalDay+=findDateDiff(dt1,dt2)
   
    if(findDateDiff(firstTaskDate,dt1)<0){
      firstTaskDate = dt1
    }
    
    
  });


firstTaskDate.setDate(firstTaskDate.getDate()+TotalDay)
console.log(firstTaskDate)
return  {workload:workload,EstimatedCompletionTime:firstTaskDate}
};
const addWbs = async (req, res) => {
  connectToDB();
 

  const { Task, ProjectName } = req.body;
  
  console.log(req.body)
  console.log("Name of p:",req)
  const {workload,EstimatedCompletionTime} = timeWorkloadEstimation(Task);
  
  try {

    const InsertItems = new item({
      task: Task,
      workload:workload,
      EstimatedCompletionTime:EstimatedCompletionTime
    });

    InsertItems.save((err, result) => {
      console.log("wbs",result)
      if (err) {
        res.status(403).json("Task failed");
        console.log(err);
      } else {
        project
          .findOneAndUpdate(
            { projectName: ProjectName },
            { wbs: result._id },
            { new: true }
          )
          .exec((err, Projectresult) => {
            if (err) {
              console.log(err);
            } else {
              console.log("consoel",Projectresult);
              
            }
          });
        console.log("OPen",result._id);
        res.send("ok");
      }
    });
  }

  catch (err) {
    console.log("error",err);
  }
};

module.exports = { addWbs };
