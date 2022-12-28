const connectToDB = require('../utils/dbConnect');
const items = require('../model/item');
const user = require('../model/userInfo');
const errorFunction = require('../utils/messageFunction')
const item = require("../model/wbs");

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
            StartingDate: startingDate,
            EstimatedCompletionTime: Est,
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
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addWbs }