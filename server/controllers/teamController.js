const teams = require("../model/teamAssignment")
const connectToDB = require('../utils/dbConnect')
const project = require("../model/project")

// @desc     Create Teams
// @access   Public
//create teams and assign projects to those teams. 
//memebers must exist and project must be created before hand
const CreateTeams = (req, res) => {
    connectToDB()
    try {
        const { teamName, memebers, assignedProject } = req.body
        const Assignedproject = project.findOne({
            projectName: assignedProject
        }).lean(true)
            .exec((err, result) => {
                if (err) {
                    console.log("error occured")
                } else {

                    const newTeam = new teams({
                        teamName: teamName,
                        members: memebers,
                        assignedProject: result._id
                    })
                    newTeam.save()
                }
            })

        console.log(memebers)
        res.send("b1")

    } catch (error) {
        console.log(error)
    }
}

module.exports = { CreateTeams }