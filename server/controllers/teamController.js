const teams = require("../model/teamAssignment")
const connectToDB = require('../utils/dbConnect')
const project = require("../model/project")
const mailNotifications = require('../middleware/emailNotification')
const teamAssignment = require('../model/teamAssignment')
const users = require('../model/userInfo')

// @desc     Create Teams
// @access   Public
//create teams and assign projects to those teams. 
//memebers must exist and project must be created before hand

const getMailList=   (memebers)=>{
    let mailList = []
 
    memebers.forEach(element => {
        users.findOne({userName:element}).lean(true).exec((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                mailList.push(result.email)
                if(mailList.length === memebers.length){
                    mailNotifications(mailList)
                    
                }
            }
        })
    });

    

}
const CreateTeams = async (req, res) => {
    connectToDB()
    try {
        const { teamName, memebers } = req.body
    
        const newTeam = new teams({
            teamName: teamName,
            members: memebers,
          
        })
        // newTeam.save()
        getMailList(memebers)
        res.send("Teams Created")

    } catch (error) {
        console.log(error)
    }
}
//test
const assignProjectToTeam = (req,res)=>{
    const {projectName,teamName} = req.body
    connectToDB()
    const teamExists = teamAssignment.exists(({teamName:teamName})).exec((err,result)=>{
        if(err){
            console.log("error",err)
        }
        else if(result){
            project.findOne({projectName:projectName}).exec((err,project)=>{
                if(err){
                    console.log(err)
                }
                else if(project)
                {   
                    teamAssignment.findOneAndUpdate({teamName:teamName},{assignedProject:project._id})
                    res.send("project Created")
                }
                else{
                    res.send("something went wrong,try agian")
                }
            })
        }
    })
    
    
    
}

module.exports = { CreateTeams,assignProjectToTeam }