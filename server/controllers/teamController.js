const Team = require("../model/teamAssignment")
const connectToDB = require('../utils/dbConnect')
const Project = require("../model/project")
const mailNotifications = require('../middleware/emailNotification')
const messageFunction = require('../utils/messageFunction')
const User = require('../model/userInfo')


// @desc     Get All Team
// @access   Public
const getAllTeam = async (req, res) => {
    const { userName } = req.body

    connectToDB()
    try {
        const existingTeam = await Team.find({
            projectManager: userName
        }).sort({
            teamName: 1
        }).lean(true)

        if (!existingTeam) {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'No Teams Found.'
                    )
                )
        } else {
            // Show All Teams Information
            // Data - existingTeam
            var teamResult = []

            existingTeam.forEach(element => {
                teamResult.push({
                    teamName: element.teamName,
                    members: element.members
                })
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

// @desc     Get Team With No Assigned Project
// @access   Public
const getTeam = async (_req, res) => {
    connectToDB()

    try {
        const existingTeam = await Team.find({
            assignedProject: { $exists: false }
        }).sort({
            teamName: 1
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
            assignedProject: { $exists: true },
        }).sort({
            teamName: 1
        })

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
                teamResult.push({
                    'teamName': element.teamName,
                    'projectName': element.assignedProject
                })
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

// @desc     Get Mail List
// @access   Public
const getMailList = (members) => {
    let mailList = []

    members.forEach(element => {
        User.findOne({
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
    let temp_teams = []
    connectToDB()
    try {
        const { teamName, members, userName } = req.body

        const existingTeam = await Team.findOne({
            teamName: teamName
        }).lean(true)

        if (existingTeam) {
            return res
                .status(400)
                .json(
                    messageFunction(true, 'Team Name Already Exists')
                )
        } else {
            members.fore
            User.findOne({ userName: userName }).exec((err) => {
                if (err) {

                } else {
                    const newTeam = new Team({
                        teamName: teamName,
                        members: members,
                        projectManager: userName
                    })
                    newTeam.save()
                }
            })

            members.forEach((memeber) => {
                User.find({ userName: memeber })
                    .lean(true)
                    .exec((err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            result.forEach(async (record) => {
                                if (record.assignedTeam === undefined) {
                                    await User.findOneAndUpdate(
                                        { userName: memeber },
                                        { assignedTeam: teamName })
                                } else {
                                    let inTeams = record.assignedTeam.length
                                    if (inTeams < 2) {
                                        temp_teams = [...record.assignedTeam, teamName]
                                        await User.findOneAndUpdate(
                                            { userName: memeber },
                                            { assignedTeam: temp_teams }
                                        )
                                        if (inTeams === 1) {
                                            await User.findOneAndUpdate(
                                                { userName: memeber },
                                                { available: false }
                                            )
                                        }
                                    } else {
                                        console.log("developer cannot be reassiged")
                                        return res
                                            .status(400)
                                            .json(
                                                messageFunction(
                                                    true,
                                                    'Developer assigned in two teams, choose another developer!',
                                                )
                                            )
                                    }
                                }
                            })
                        }
                    })
            })

            // getMailList(members)
            // res.send("Teams Created")

        }
    } catch (error) {
        console.log(error)
    }
}

// @desc     Assign Project To Team
// @access   Public
const assignProjectToTeam = async (req, res) => {
    const { projectName, teamName, userName } = req.body
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
                await User.findOne(
                    { userName: userName }
                ).lean(true)
                    .exec(async (error, managerResult) => {
                        const projectFound = await Project.findOne({
                            projectManager: managerResult._id,
                            projectName: projectName,
                            wbs: { $exists: true },
                            isAssignedTo: { $exists: false }
                        })
                        if (!projectFound) {
                            return res
                                .json(
                                    messageFunction(
                                        true,
                                        'Please Create WBS to the Project First!',
                                    )
                                )
                        } else {
                            const assignTeam = await Team.updateOne(
                                {
                                    teamName: teamName
                                },
                                {
                                    $push: {
                                        assignedProject: projectFound.projectName
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
                                            isAssignedTo: result.teamName
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
                    })
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
    User.find({
        $or: [
            {
                assignedTeam: { $exists: false }
            },
            {
                available: { $eq: 'true' }
            }
        ]
    }).select("email userName position phoneNumber gitHubAccount")
        .where("position").in(['Frontend Developer', 'Backend Developer', 'Mobile Developer'])
        .sort({
            userName: 1
        }).exec((err, result) => {
            if (err) {
                res.send("something went wrong")
            }
            else {
                const jsonContent = JSON.stringify(result)
                res.send(jsonContent)
            }
        })
}

// @desc     UnassignTeam a Team
// @access   Public
const unassignTeam = async (req, res) => {
    const { teamName, userName } = req.body
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

    try {

        await Team.findOne({
            teamName: teamName,
        }).exec(async (error, existingTeam) => {
            if (existingTeam) {
                try {
                    await Project.updateOne(
                        {
                            isAssignedTo: teamName
                        },
                        {
                            $unset: {
                                isAssignedTo: ""
                            }
                        }
                    )

                    const team = await Team.findOne(
                        {
                            projectManager: userName,
                            teamName: teamName
                        }
                    )

                    if (team) {
                        await Team.updateOne(
                            {
                                projectManager: userName,
                                teamName: teamName
                            },
                            {
                                $unset: {
                                    assignedProject: ""
                                }
                            }
                        )
                    }

                    return res
                        .json(
                            messageFunction(
                                false,
                                'Team Unassigned'
                            )
                        )

                } catch (error) {
                    console.log(error)
                    return res
                        .status(400)
                        .json(
                            messageFunction(
                                false,
                                'Error Occurred'
                            )
                        )
                }
            } else {
                return res
                    .json(
                        messageFunction(
                            true,
                            `Team Isn't Assigned A Project`,
                        )
                    )
            }
        })
    } catch (error) {
        return res
            .json(
                messageFunction(
                    true,
                    'Failed To Unassign Team, Please Try Again.'
                )
            )
    }
}

// @desc     Delete Team
// @access   Public
const deleteTeam = async (req, res) => {
    const { teamName, userName } = req.body
    connectToDB()

    try {
        const team = await Team.findOne({
            teamName: teamName,
            projectManager: userName,
            assignedProject: { $exists: false },
        })
        if (team) {
            await Team.findOne({
                teamName: teamName
            }).exec(async (error, existingTeam) => {
                if (!existingTeam) {
                    return res
                        .status(400)
                        .json(
                            messageFunction(
                                true,
                                'No Teams Found.'
                            )
                        )
                } else {
                    existingTeam.members.forEach(async (member) => {
                        await User.updateOne(
                            {
                                userName: member,
                                assignedTeam: teamName
                            },
                            {
                                $pull: {
                                    assignedTeam: teamName
                                },
                                available: true
                            }
                        )
                    })
                    const teamResult = await Team.findOneAndDelete({
                        projectManager: userName,
                        teamName: teamName
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
            })
        } else {
            return res
                .status(400)
                .json(
                    messageFunction(
                        true,
                        'Please Unassign The Team From The Project First!',
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

module.exports = {
    CreateTeams,
    assignProjectToTeam,
    getDevelopers,
    getTeam,
    getAllTeam,
    getAssignedTeam,
    unassignTeam,
    deleteTeam
}