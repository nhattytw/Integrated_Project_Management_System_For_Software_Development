const connectToDB = require('../utils/dbConnect');
const Project = require('../model/project');
const User = require('../model/userInfo');
const { default: createRespository } = require('../middleware/githubOperations');
const messageFunction = require('../utils/messageFunction')

//stored initalize project and assign a project Manager 

// @desc     Create Project
// @access   Public
const CreateProject = async (req, res) => {
    connectToDB()
    try {
        const { projectname, projectRepository, budget, duration, descripion } = req.body

        const projectmanager = User.findOne({ userName: "test111" }, (err, Managerresult) => {
            if (err) {
                res.send("error occured")
            }
            else {
                const ExistingProject = Project.findOne({ projectName: projectname }).exec(async (err, Projectresult) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (Projectresult) {
                            await res.send("Project already exists")
                        }
                        else {


                            const newProject = new Project({
                                projectName: projectname,
                                projectRepository: projectRepository,
                                projectManager: Managerresult._id,
                                budget: budget,
                                duration: duration,
                                descripion: descripion
                            })

                            await newProject.save()
                            console.log("Project saved")
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

//finds a list of projects that are not completed or not been canceled

// @desc     Get Active Projects
// @access   Public
const ActiveProjectList = (req, res) => {
    connectToDB()
    try {
        const activeProject = Project.find().populate('projectManager').populate('wbs')
            .then((result) => {
                if (result) {
                    console.log(result)
                    const jsonContent = JSON.stringify(result)
                    res.send(jsonContent)
                }

            }).catch(error => console.log(error))

    } catch (error) {
        console.log(error)

    }
}

const wbsUnassigedProjects = (req, res) => {
    connectToDB()
    Project.find().select('wbs projectName').where('wbs').equals(null).lean(true).exec((err, result) => {

        if (err) {
            console.log(err)
        }
        else {

            const jsonData = JSON.stringify(result)
            res.send(jsonData)


        }
    })


}

// @desc     Get Team With No Assigned Project
// @access   Public
const getProject = async (_req, res) => {
    connectToDB()
    try {
        const projectFound = await Project.find({
            isAssignedTo: { $exists: false }
        }).lean(true)

        if (!projectFound) {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'No Unassigned Projects Found.'
                    )
                )
        } else {
            // Show Project Information
            // Data - projectFound
            var projectResult = []

            projectFound.forEach(element => {
                projectResult.push(element.projectName)
            })

            return res
                .status(200)
                .json(
                    messageFunction(false,
                        'Project Information',
                        projectResult
                    )
                )
        }
    } catch (error) {
        console.error(error.message)
        return res
            .status(500)
            .json(
                messageFunction(
                    true,
                    'Failed To Fetch Projects, Please Try Again.'
                )
            )
    }
}

// @desc     Get Team With Project Assigned
// @access   Public
const getAssignedProject = async (_req, res) => {
    connectToDB()
    try {
        const projectFound = await Project.find({
            isAssignedTo: { $exists: true }
        }).lean(true)

        if (!projectFound) {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'No Assigned Projects Found.'
                    )
                )
        } else {
            // Show Project Information
            // Data - projectFound
            var projectResult = []

            projectFound.forEach(element => {
                projectResult.push(element.projectName)
            })

            return res
                .status(200)
                .json(
                    messageFunction(false,
                        'Project Information',
                        projectResult
                    )
                )
        }
    } catch (error) {
        console.error(error.message)
        return res
            .status(500)
            .json(
                messageFunction(
                    true,
                    'Failed To Fetch Projects, Please Try Again.'
                )
            )
    }
}

module.exports = {
    CreateProject,
    ActiveProjectList,
    wbsUnassigedProjects,
    getProject,
    getAssignedProject
}