const Team = require("../model/teamAssignment")
const connectToDB = require('../utils/dbConnect')
const Project = require("../model/project")
const mailNotifications = require('../middleware/emailNotification')
const users = require('../model/userInfo')
const messageFunction = require('../utils/messageFunction')
const User = require('../model/userInfo')


// @desc     Get Team With No Assigned Project
// @access   Public
const getTeam = async (_req, res) => {
    connectToDB()
    try {
        const existingTeam = await Team.find({
            assignedProject: { $exists: false }
        }).lean(true)

        if (!existingTeam) {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'No Unassigned Teams Found.'
                    )
                )
        } else {
            // Show Teams Information
            // Data - existingTeam
            var teamResult = []

            existingTeam.forEach(element => {
                teamResult.push(element.teamName)
            })

            return res
                .status(200)
                .json(
                    messageFunction(false,
                        'Team Information',
                        teamResult
                    )
                )
        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).json(
            messageFunction(
                true,
                'Failed To Fetch Teams, Please Try Again.'
            )
        )
    }
}

// @desc     Get Team With Assigned Project
// @access   Public
const getAssignedTeam = async (_req, res) => {
    connectToDB()
    try {
        const existingTeam = await Team.find({
            assignedProject: { $exists: true }
        }).lean(true)

        if (!existingTeam) {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'No Assigned Teams Found.'
                    )
                )
        } else {
            // Show Teams Information
            // Data - existingTeam
            var teamResult = []

            existingTeam.forEach(element => {
                teamResult.push(element.teamName)
            })

            return res
                .status(200)
                .json(
                    messageFunction(false,
                        'Team Information',
                        teamResult
                    )
                )
        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).json(
            messageFunction(
                true,
                'Failed To Fetch Teams, Please Try Again.'
            )
        )
    }
}


const getMailList = (members) => {
    let mailList = []

    members.forEach(element => {
        users.findOne({
            userName: element
        }).lean(true).exec((err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                mailList.push(result.email)
                if (mailList.length === members.length) {
                    mailNotifications(mailList)

                }
            }
        })
    });

}


// create teams and assign projects to those teams. 
// members must exist and project must be created before hand

// @desc     Create Teams
// @access   Public
const CreateTeams = async (req, res) => {
    connectToDB()
    try {
        const { teamName, members } = req.body


        const newTeam = new Team({
            teamName: teamName,
            members: members,

        })
        newTeam.save()
        members.forEach((memeber)=>{
            User.findOneAndUpdate({userName:memeber},{assignedTeam:teamName})
        })
        // getMailList(members)
        res.send("Teams Created")

    } catch (error) {
        console.log(error)
    }
}

// @desc     Assign Project To Team
// @access   Public
const assignProjectToTeam = async (req, res) => {
    const { projectName, teamName } = req.body
    connectToDB()

    if (!teamName) {
        return res
            .json(
                messageFunction(
                    true,
                    'No Team Selected',
                )
            )
    }

    if (!projectName) {
        return res
            .json(
                messageFunction(
                    true,
                    'No Project Selected',
                )
            )
    }
    
    try {
        await Team.findOne({
            assignedProject: { $exists: false },
            teamName: teamName
        }).exec(async (error, result) => {
            if (result) {
                const projectFound = await Project.findOne({
                    projectName: projectName,
                    isAssignedTo: { $exists: false }
                })
                if (!projectFound) {
                    return res
                        .json(
                            messageFunction(
                                true,
                                'Project Already Has A Team',
                            )
                        )
                } else {
                    const assignTeam = await Team.updateOne(
                        {
                            teamName: teamName
                        },
                        {
                            $push: {
                                assignedProject: projectFound._id
                            }
                        }
                    )
                    if (assignTeam) {
                        const assignProject = await Project.updateOne(
                            {
                                projectName: projectName
                            },
                            {
                                $push: {
                                    isAssignedTo: result._id
                                }
                            }
                        )
                        return res
                            .json(
                                messageFunction(
                                    false,
                                    'Project Assigned To Team',
                                    assignProject
                                )
                            )
                    }
                }
            } else {
                return res
                    .json(
                        messageFunction(
                            true,
                            'Team Already Assigned A Project',
                        )
                    )
            }
        })
    } catch (error) {
        return res
            .json(
                messageFunction(
                    true,
                    'Failed To Assign Project to Team, Please Try Again.'
                )
            )
    }
}

const getDevelopers = (req, res) => {
    connectToDB()
    users.find().select("email userName position phoneNumber gitHubAccount").where("position").in(['Frontend Developer', 'Backend Developer', 'Mobile Developer']).exec((err, result) => {
        if (err) {
            res.send("something went wrong")
        }
        else {
            const jsonContent = JSON.stringify(result)
            res.send(jsonContent)
        }
    })
}

module.exports = {
    CreateTeams,
    assignProjectToTeam,
    getDevelopers,
    getTeam,
    getAssignedTeam
}