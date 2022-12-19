const connectToDB = require('../utils/dbConnect');
const items = require('../model/item');
const user = require('../model/userInfo');
const errorFunction = require('../utils/errorFunction')
const item = require("../model/item");

// Date format mm/dd/yy or yy/dd/mm, retrival is in yy/mm/dd 
const addItems =  async(req,res)=>{
    connectToDB();
    try
    {
    
        const {task, startingDate,EstimatedCompletionTime,taskStatus} =  req.body
        const startDate = new Date(startingDate)
        const Est = new Date(EstimatedCompletionTime)
        
        const InsertItems = new item({
            task:task,
            StartingDate:startDate,
            EstimatedCompletionTime:Est,
            taskStatus:taskStatus
        });
        
        InsertItems.save(
            (err,result)=>{
                if(err){
                    res.status(403).json("Task failed")
                    }
                else{
                    res.status(201)
                }
            }
        )
     

    }catch(err){
        console.log(err)
    }
}

module.exports = { addItems }