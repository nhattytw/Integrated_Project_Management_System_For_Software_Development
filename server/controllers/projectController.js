const connectToDB = require('../utils/dbConnect');
const project = require('../model/project');
const User = require('../model/userInfo');
const mongoose = require('mongoose')

// @desc     Create Project
// @access   Public
//stored initalize project and assign a project Manager 
const CreateProject = async (req, res) => {
    connectToDB()
    try {
        const { projectname, projectRepository, budget, projectManager, duration } = req.body
        const projectmanager = User.findOne({ userName: projectManager }, (err, Managerresult) => {
            if (err) {
                console.log(err)
            }
            else {
                const ExistingProject = project.findOne({ projectName: projectname }).exec(async (err, Projectresult) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (Projectresult) {
                            await res.send("Project already exists")
                        }
                        else {


                            const newProject = new project({
                                projectName: projectname,
                                projectRepository: projectRepository,
                                projectManager: Managerresult._id,
                                budget: budget,
                                duration: duration
                            })

                            newProject.save()
                            res.send("operation successful")
                        }
                    }
                })
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

// @desc     Get Active Projects
// @access   Public
//finds a list of projects that are not completed or not been canceled
const ActiveProjectList = (req, res) => {
    connectToDB()
    try {
        const activeProject = project.find().populate(
            "projectManager",
            "fullName email"
        ).where("status")
            .equals("active")
            .lean(true)
            .exec((err, result) => {
                if (err) {
                    console.log("error")
                }
                else {
                    const jsonContnet = JSON.stringify(result)

                    res.send(jsonContnet)
                }
            })
    } catch (error) {
        console.log(error)

    }
}
//assign a Work Break down structure for an existing project. this is an update operation and it checks that the project exists
const assignWbsToProject = (req,res)=>{
    //once a wbs is created the id will be returned  that will be passed in the request to this module
    let {id,projectName} = req.body
    connectToDB()
     id = new mongoose.mongo.ObjectId(id)
     
console.log(pid)
    project.findOneAndUpdate({projectName:projectName},{wbs:id},{new:true},(err,doc)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(doc)
        }   
    })
 

    res.send("update")
}

module.exports = { CreateProject, ActiveProjectList,assignWbsToProject }