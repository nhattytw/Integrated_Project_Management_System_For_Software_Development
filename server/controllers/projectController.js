const connectToDB = require('../utils/dbConnect');
const project = require('../model/project');
const User = require('../model/userInfo')

const CreateProject = async (req,res)=>{
    connectToDB()
    try {
    const {projectname,projectRepository,budget,projectManager,duration} = req.body
    const projectmanager = User.findOne({userName:projectManager},(err,Managerresult)=>{
        if(err){
            console.log(err)
        }
        else{
            const ExistingProject = project.findOne({projectName:projectname}).exec(async (err,Projectresult)=>{
                if(err){
                    console.log(err)
                }
                else{
                    if(Projectresult){
                      await res.send("Project already exists")
                    }
                    else{
                        

                        const newProject = new project({
                            projectName:projectname,
                            projectRepository:projectRepository,
                            projectManager:Managerresult._id,
                            budget:budget,
                            duration:duration
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
module.exports = { CreateProject }