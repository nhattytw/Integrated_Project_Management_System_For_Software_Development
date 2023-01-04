const connectToDB = require('../utils/dbConnect');
const issues = require('../model/issues')

// @desc     Create Issue and Post
// @access   Public
// Issues are problems and questions developers have. with notification types
const PostIssue = async (req,res)=>{
    connectToDB()
    try {
        const {issue,postedBy,notify} = req.body
        
        const issueItem = new issues(
            {
                issue:issue,
                postedBy:postedBy,

            }
        )
        issueItem.save((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
            }

        })
        res.send("saved")
    } catch (error) {
        console.log(error)
    }
}
const setIssueResolved = async (req,res){
    connectToDB()
    try {
        const {issue,status,title} = req.body
        if(status===1){
            //set issue resolved 
            issue.findOne({title:title}).exec((err,result)=>{
                
            })
        } 
    } catch (error) {
        
    }
}

module.exports = {PostIssue}