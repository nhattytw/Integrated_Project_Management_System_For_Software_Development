const connectToDB = require("../utils/dbConnect");
const user = require("../model/userInfo");
const errorFunction = require("../utils/messageFunction");
const item = require("../model/wbs");
const project = require("../model/project")

// @desc     Add WBS
// @access   Public
//create a work break down structure for a project. once the wbs has been created it returns an associated id
//task is an array of objects, and each object contains a start and finish date
const addWbs = async (req, res) => {
    connectToDB();
    //  yy/mm/dd 
    try {
        const { Task,ProjectName } = req.body

      
      
    const InsertItems = new item({
      task: Task,    
    });

    InsertItems.save((err, result) => {
      if (err) {
        res.status(403).json("Task failed");
        console.log(err)
      } else {
      project.findOneAndUpdate({projectName:ProjectName},{wbs:result._id},{new:true}).exec((err,result)=>{
        if(err){
          console.log(err)
        }
        else{
          console.log(result)
        }
      })
       console.log(result._id)
       res.send("ok")
      }
    });

        
  } catch (err) {
    console.log(err);
  }
};
    

module.exports = { addWbs };
