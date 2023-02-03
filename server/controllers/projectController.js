const connectToDB = require("../utils/dbConnect");
const Project = require("../model/project");
const User = require("../model/userInfo");
const {
  default: createRespository,
} = require("../middleware/githubOperations");
const messageFunction = require("../utils/messageFunction");
const project = require("../model/project");
const teamAssignment = require("../model/teamAssignment");

//stored initalize project and assign a project Manager

// @desc     Create Project
// @access   Public
const CreateProject = async (req, res) => {
  connectToDB();
  try {
    const { projectName, userName, projectRepository, budget, duration, descripion } =
      req.body;

    const projectmanager = User.findOne(
      { userName: userName },
      (err, Managerresult) => {
        if (err) {
          res.send("error occured");
        } else {
          const ExistingProject = Project.findOne({
            projectName: projectName,
          }).exec(async (err, Projectresult) => {
            if (err) {
              console.log(err);
            } else {
              if (Projectresult) {
                return res
                  .status(400)
                  .json(messageFunction(true, "Project already exists."));
              } else {
                const newProject = new Project({
                  projectName: projectName,
                  projectRepository: projectRepository,
                  projectManager: Managerresult._id,
                  budget: budget,
                  duration: duration,
                  descripion: descripion,
                });

                await newProject.save();
                console.log("Project saved");
                // createRespository(projectRepository,descripion)
                return res
                  .status(200)
                  .json(
                    messageFunction(false, "Project Created Successfully.")
                  );
              }
            }
          });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(messageFunction(true, "Server Error occured"));
  }
};

//finds a list of projects that are not completed or not been canceled

// @desc     Get Active Projects
// @access   Public
const ActiveProjectList = (req, res) => {
  connectToDB();
  try {
    const activeProject = Project.find({
      isAssignedTo: { $gt: 0 }
    }).populate("projectManager")
      .populate("wbs")
      .sort({
        projectName: 1,
      })
      .then((result) => {
        if (result) {
          const jsonContent = JSON.stringify(result);
          // console.log("Here", jsonContent.projectName)
          return res.status(200).send(jsonContent);
        }
      })
      .catch((error) => {
        console.log(error);
        return res
          .status(400)
          .json(messageFunction(true, "Error Occurred When Fetching Data"));
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(messageFunction(true, "Server Error occured"));
  }
};

const wbsUnassigedProjects = (req, res) => {
  connectToDB();
  Project.find()
    .select("wbs projectName")
    .where("wbs")
    .equals(null)
    .sort({
      projectName: 1,
    })
    .lean(true)
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const jsonData = JSON.stringify(result);
        res.send(jsonData);
      }
    });
};

// @desc     Get Inactive Projects
// @access   Public
const getProject = async (_req, res) => {
  connectToDB();
  try {
    const projectFound = await Project.find({
      isAssignedTo: { $exists: false }
    }).sort({
      projectName: 1
    }).lean(true)

    if (!projectFound) {
      return res
        .status(400)
        .json(
          messageFunction(
            true,
            "No Unassigned Projects or Project with WBS Found."
          )
        );
    } else {
      // Show Project Information
      // Data - projectFound
      var projectResult = [];

      projectFound.forEach((element) => {
        projectResult.push(element.projectName);
      });

      return res
        .status(200)
        .json(messageFunction(false, "Project Information", projectResult));
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(
        messageFunction(true, "Failed To Fetch Projects, Please Try Again.")
      );
  }
};

// @desc     Get Team With Project Assigned
// @access   Public
const getAssignedProject = async (_req, res) => {
  connectToDB();
  try {
    const projectFound = await Project.find({
      isAssignedTo: { $exists: true },
    })
      .populate("projectManager")
      .populate("wbs")
      .sort({
        projectName: 1,
      })
      .lean(true);

    if (!projectFound) {
      return res
        .status(400)
        .json(messageFunction(true, "No Assigned Projects Found."));
    } else {
      // Show Project Information
      // Data - projectFound
      var projectResult = [];

      projectFound.forEach((element) => {
        projectResult.push({
          'teamName': element.isAssignedTo[0],
          'projectName': element.projectName
        })
      })
      console.log(projectFound)

      return res
        .status(200)
        .json(messageFunction(false, "Project Information", projectResult));
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(
        messageFunction(true, "Failed To Fetch Projects, Please Try Again.")
      );
  }
};

const getProjectTasks = (req, res) => {
  const { projectName } = req.body;
  connectToDB();
  Project.find({ projectName: projectName })
    .select("wbs")
    .populate("wbs")
    .sort({
      projectName: 1,
    })
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const jsonData = JSON.stringify(result);
        res.send(jsonData);
      }
    });
};
const findProject = (req, res) => {
  connectToDB();
  const { project } = req.body;
  console.log(req.body);
  Project.find({ projectName: project })
    .populate("wbs")
    .select("wbs")
    .sort({ projectName: 1 })
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const jsonData = JSON.stringify(result);
        res.send(jsonData);
      }
    });
};
const getDeveloperAssigenedProject=(req,res)=>{
    const {username} = req.body
    
    connectToDB()
    User.find({userName:username}).lean(true).exec((err,result)=>{
      
      if(err){
        console.log(err)
      }else
      { 
        const RelatedTeam = result[0].assignedTeam
        teamAssignment.find().where("teamName").in(RelatedTeam).exec((err,teamResult)=>{
          if(err){
            console.log(err)
          }
          else{
            let assignedProject = []
            teamResult.forEach((element)=>{
              assignedProject.push(element.assignedProject)
            })
            Project.find().where("projectName").in(assignedProject).populate('wbs').exec((err,Projectresult)=>{
              if(err){
                console.log(err)
              }
              else{
                res.send(Projectresult)
              }
            })
          }

        })
        
      //  result[0].assignedTeam.forEach((element)=>{

      //      teamAssignment.find({teamName:element}).exec((err,Teamresult)=>{
      //         if(Teamresult[0].assignedProject){
      //             Project.find({projectName:Teamresult[0].assignedProject}).exec((err,projectResult)=>{
      //               if(err){
      //                 console.log(err)
      //               }
      //               else{
      //                   res.send(projectResult)
                      
      //               }
                   
      //             })
      //         }
      //     })
          
      //  })

      }
    })
    
}

module.exports = {
  CreateProject,
  ActiveProjectList,
  wbsUnassigedProjects,
  getProject,
  findProject,
  getAssignedProject,
  getProjectTasks,
  getDeveloperAssigenedProject
};
