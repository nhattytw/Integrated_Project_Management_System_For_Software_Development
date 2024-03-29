const connectToDB = require("../utils/dbConnect");
const Project = require("../model/project");
const User = require("../model/userInfo");
const createRespository = require("../middleware/githubOperations");
const messageFunction = require("../utils/messageFunction");
const project = require("../model/project");
const teamAssignment = require("../model/teamAssignment");

// @desc     Create Project
// @access   Public
const CreateProject = async (req, res) => {
  connectToDB();
  try {
    const {
      projectName,
      userName,
      projectRepository,
      budget,
      duration,
      descripion,
    } = req.body;

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
                  wbs: null,
                  budget: budget,
                  duration: duration,
                  descripion: descripion,
                });

                await newProject.save();
                //   console.log("Project saved")
                //createRespository(projectRepository)
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

// @desc     Get Active Projects
// @access   Public
const ActiveProjectList = async (req, res) => {
  connectToDB();

  const { userName } = req.body;

  try {
    await User.findOne({ userName: userName })
      .lean(true)
      .exec(async (error, managerResult) => {
        if (error) {
        } else {
          await Project.find({
            isAssignedTo: { $gt: 0 },
            projectManager: managerResult._id,
          })
            .where("status")
            .equals("active")
            .populate("projectManager")
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
                .json(
                  messageFunction(true, "Error Occurred When Fetching Data")
                );
            });
        }
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(messageFunction(true, "Server Error occured"));
  }
};
const ActiveCompletedProjectList = async (req, res) => {
  connectToDB();

  const { userName } = req.body;
  console.log(req.body)

  try {
    await User.findOne({ userName: userName })
      .lean(true)
      .exec(async (error, managerResult) => {
        if (error) {
        } else {
          await Project.find({
            isAssignedTo: { $gt: 0 },
            projectManager: managerResult._id,
          })
            .where("status")
            .equals("completed")
            .populate("projectManager")
            .populate("wbs")
            .sort({
              projectName: 1,
            })
            .then((result) => {
              if (result) {
                const jsonContent = JSON.stringify(result);

                return res.status(200).send(jsonContent);
              }
            })
            .catch((error) => {
              console.log(error);
              return res
                .status(400)
                .json(
                  messageFunction(true, "Error Occurred When Fetching Data")
                );
            });
        }
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
const getProject = async (req, res) => {
  connectToDB();
  const { userName } = req.body;
  try {
    await User.findOne({ userName: userName })
      .lean(true)
      .exec(async (error, managerResult) => {
        const projectFound = await Project.find({
          projectManager: managerResult._id,
          isAssignedTo: { $exists: false },
        })
          .sort({
            projectName: 1,
          })
          .lean(true);

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
      });
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
          teamName: element.isAssignedTo[0],
          projectName: element.projectName,
        });
      });
      console.log(projectFound);

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
    .select("wbs ")
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
const findProjectSummary = (req, res) => {
  connectToDB();
  const { project } = req.body;
  console.log(req.body);
  Project.find({ projectName: project })
    .populate("wbs")
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
// @desc     Get All Project With for a project Manager
// @access   Public
const getAllProject = async (req, res) => {
  connectToDB();
  const { userName } = req.body;
  try {
    await User.findOne({ userName: userName })
      .lean(true)
      .exec(async (error, managerResult) => {
        const projectFound = await Project.find({
          projectManager: managerResult._id,
        })
          .sort({
            projectName: 1,
          })
          .lean(true);

        if (!projectFound) {
          return res
            .status(400)
            .json(messageFunction(true, "No Projects Found."));
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
      });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json(
        messageFunction(true, "Failed To Fetch Projects, Please Try Again.")
      );
  }
};

const getDeveloperAssigenedProject = (req, res) => {
  const { username } = req.body;

  connectToDB();
  User.find({ userName: username })
    .lean(true)
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const RelatedTeam = result[0].assignedTeam;
        teamAssignment
          .find()
          .where("teamName")
          .in(RelatedTeam)
          .exec((err, teamResult) => {
            console.log("team Query");
            if (err) {
              console.log(err);
            } else {
              let assignedProject = [];
              teamResult.forEach((element) => {
                if (element.assignedProject) {
                  assignedProject = [
                    ...assignedProject,
                    ...element.assignedProject,
                  ];
                  console.log(element.assignedProject);
                }
              });
              console.log(assignedProject);

              Project.find()
                .where("projectName")
                .in(assignedProject)
                .populate("wbs")
                .exec((err, Projectresult) => {
                  console.log("Project Query");
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(Projectresult);
                  }
                });
            }
          });

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
    });
};

module.exports = {
  CreateProject,
  ActiveProjectList,
  wbsUnassigedProjects,
  getProject,
  findProject,
  getAssignedProject,
  getProjectTasks,
  getDeveloperAssigenedProject,
  getAllProject,
  findProjectSummary,
  ActiveCompletedProjectList
};
