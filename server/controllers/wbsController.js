const connectToDB = require('../utils/dbConnect');
const user = require('../model/userInfo');
const messageFunction = require('../utils/messageFunction')
const item = require("../model/wbs");

// @desc     Add WBS
// @access   Public
//create a work break down structure for a project. once the wbs has been created it returns an associated id
const addWbs = async (req, res) => {
    connectToDB();
    //  yy/mm/dd 
    try {
        const { task,EstimatedCompletionTime,taskStatus } = req.body
        // const startDate = new Date("10/10/10")
        // const Est = new Date(EstimatedCompletionTime)

        console.log(req.body)
        const InsertItems = new item({
            task: task,
            taskStatus: taskStatus
        });

        InsertItems.save((err, result) => {
            if (err) {
                res.status(403).json("Task failed")
            }
            else {
                res.status(201).json({
                    id:result._id
                })
            }
        })
        res.send("OK")
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addWbs }