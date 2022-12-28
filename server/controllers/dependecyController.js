const db = require("../utils/dbConnect");
const dependecy = require("../model/dependecy")
const schedule = require('../middleware/createSchedule')
const project = require('../model/project')
const createDependency = (req,res)=>{
     schedule("new project12")
    res.send("OK")
    // const {projectName,parent,tasks,relation} = req.body;
    // db();
    // try 
    // {
    //     const dependecies = new dependecy({
    //         parentTask:parent,
    //         task:tasks,
    //         type:relation
    //     })
    //     dependecies.save((err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             project.findOneAndUpdate({projectName:projectName},{Dependency:result._id},{new:true},(err,doc)=>{
    //                 if(err){
    //                     console.log(err)
    //                 }
    //                 else{
    //                     console.log(doc)
    //                 }
    //             })
    //         }
    //     })

        // res.send("task saved")
    // } catch (error) {
    //     console.log(error)
    // }


}

module.exports = createDependency