const connectToDB = require('../utils/dbConnect');
const issues = require('../model/issues')

const PostIssue = async (req,res)=>{
    connectToDB()
    try {
        const {issue,postedBy,notify} = req.body
        console.log(req.body)
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
        
    } catch (error) {
        console.log(error)
    }
}
// const setIssueResolved = async (req,res){
//     connectToDB()
//     try {
//         {issue}
//     } catch (error) {
        
//     }
// }

module.exports = {PostIssue}