const connectToDB = require('../utils/dbConnect')
const user = require('../model/userInfo')
const messageFunction = require('../utils/messageFunction')
const item = require("../model/wbs")

// @desc     Add WBS
// @access   Public
const addWbs = async (req, res) => {
    connectToDB();
    // Date format mm/dd/yy or yy/dd/mm, retrival is in yy/mm/dd 
    try {
        const { task, startingDate, EstimatedCompletionTime, taskStatus } = req.body
        const startDate = new Date("10/10/10")
        const Est = new Date(EstimatedCompletionTime)

        console.log(req.body)
        const InsertItems = new item({
            task: task,
            StartingDate: startDate,
            EstimatedCompletionTime: Est,
            taskStatus: taskStatus
        });

        InsertItems.save((err, result) => {
            if (err) {
                res.status(403).json("Task failed")
            }
            else {
                res.status(201)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addWbs }