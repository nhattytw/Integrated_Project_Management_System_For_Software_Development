const connectToDB = require('../utils/dbConnect');
const items = require('../model/item');


const addItems =  async(req,res)=>{
    connectToDB();
    try
    {
    console.log(req.body);
    }catch(err){

    }
}

module.exports = {
    addItems
}