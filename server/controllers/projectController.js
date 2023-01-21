const connectToDB = require('../utils/dbConnect');
const project = require('../model/project');
const User = require('../model/userInfo');
const mongoose = require('mongoose');
const { default: createRespository } = require('../middleware/githubOperations');

// @desc     Create Project
// @access   Public
//stored initalize project and assign a project Manager 
const CreateProject = async (req, res) => {
    connectToDB()
    try {
        const { projectname, projectRepository, budget, duration,descripion } = req.body
        
        const projectmanager = User.findOne({ userName: "test111" }, (err, Managerresult) => {
            if (err) {
                res.send("error occured")
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
                                duration: duration,
                                wbs:null,
                                descripion:descripion
                            })

                            newProject.save()
                            console.log("project saved")
                           // createRespository(projectRepository,descripion)
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
        const activeProject = project.find().populate('projectManager').populate('wbs')
            .then((result) => {
                if (result) {
                    console.log(result)
                    const jsonContent = JSON.stringify(result)
                    res.send(jsonContent)
                }
              
            }).catch(error=>console.log(error))

    } catch (error) {
        console.log(error)

    }
}
const wbsUnassigedProjects=(req,res)=>{
    connectToDB()
    project.find().select('wbs projectName').where('wbs').equals(null).lean(true).exec((err,result)=>{
        
        if(err){
            console.log(err)
        }
        else{
              
              const jsonData = JSON.stringify(result)
              res.send(jsonData)

               
            }
        })
        
      
}

module.exports = { CreateProject, ActiveProjectList,wbsUnassigedProjects }