const connectToDB = require("../utils/dbConnect");
const issues = require("../model/issues");
const { default: mongoose } = require("mongoose");

// @desc     Create Issue and Post
// @access   Public
// Issues are problems and questions developers have. with notification types
const PostIssue = async (req, res) => {
  connectToDB();
  try {
    const { Issue, title, notify,username } = req.body;

    const issueItem = new issues({
      title: title,
      body: Issue,
      postedBy:username,
      comment:[]
    });
    issueItem.save((err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
    res.send("saved");
  } catch (error) {
    console.log(error);
  }
};
const setIssueResolved = async (req, res) => {
  connectToDB();
  try {
    const {id} = req.body;
    console.log(req.body)
    issues.findByIdAndUpdate(id,{status:"Resolved"},{new:true},((err,result)=>{
      console.log(result)
      if(result){
        const jsonContent = JSON.stringify(result);
        res.send(jsonContent);
      }
    }))
  } catch (error) {}
};

const postComment = (req, res) => {
  connectToDB();
  try {
    const { id, comment } = req.body;
    console.log(comment)
    issues.findByIdAndUpdate(id, { comment: comment },(err,docs)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(docs)
        }
    });
  } catch (error) {
    console.log(error);
  }
  res.send("sent")
};

const getIssues = async (req, res) => {
  connectToDB();
  issues
    .find()
    .where("status")
    .equals("Active")
    .lean(true)
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const jsonContent = JSON.stringify(result);
        res.send(jsonContent);
      }
    });
};
const getResolvedIssues = async (req, res) => {
  connectToDB();
  issues
    .find()
    .where("status")
    .equals("Resolved")
    .lean(true)
    .exec((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const jsonContent = JSON.stringify(result);
        res.send(jsonContent);
      }
    });
};
module.exports = { PostIssue, getIssues, postComment,setIssueResolved,getResolvedIssues };
