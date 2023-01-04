const connectToDB = require('../utils/dbConnect');
const schedule = require('../model/schedule')
const project = require('../model/project');
const dependecy = require('../model/dependecy')
const Wbs = require ('../model/wbs')
const ScheduleInfo = require('../model/schedule')

class TreeNode {
    constructor(value) {
      this.value = value;
      this.descendants = [];
    }
  }

 const daysInMonth=(month, year)=> {
    return new Date(year, month, 0).getDate();
}
const newNode=(value)=>{
    let n = new TreeNode(value)
    return n
}
const addElement=(ElementList, task,start,end)=>{
    let newList = Object.assign(ElementList, task,start,end)
    return newList
}
const createNoneDepedencyScheduler=(wbs)=>{
    let schedule ;
    let totalAllotedTime=[];
    let proejectName;
    let title = [];
    let allocatedtime;
    let nonDependencyTime = 0
    let date,months,year;
    const projectWbs = wbs['wbs'][0]
    const{task, StartingDate} = projectWbs
    console.log(wbs)
    task.map((obj)=>{
        totalAllotedTime.push(parseInt(obj.alottedTime))
        title.push(obj["title"])
    })

    allocatedtime = totalAllotedTime.reduce(
        (accimulator,current) => accimulator +current
    )
    nonDependencyTime=Math.ceil(allocatedtime/task.length)
    date = StartingDate.getDate();
    months = StartingDate.getMonth()
    year = StartingDate.getFullYear()
    if((date+nonDependencyTime)>(daysInMonth(months-1,year))){
        date = (date+nonDependencyTime)-daysInMonth((months-1),year);
        months+=1;
        const temp = new Date(year,months,date)
        schedule = {
            title:title,//"yy-mm-dd"
            time:temp
        }
       
        console.log(schedule)
    }
    else{
        const temp = new Date(year,months,date)
        schedule = {
            title:title,
            time:temp
        }
        
    }
}
const createDependencyShedule =  async (projectName)=>{
    //login depends on reg example
    const name ="project1"
    let schedule;
    let Dependecy;
    const wbs = await Wbs.findById("63aaec05762b4d5ec5bbb8cc").select("task StartingDate").lean().exec()
    const {task,StartingDate} = wbs
    console.log(task)
    let parent= new TreeNode(name);
    let nodeList={}
    task.map((obj)=>{
        nodeList[obj.title]= newNode(obj.title)
    })

    
    
     nodeList["reg page"].descendants.push(nodeList["login page"])

     
     
     for(const [key,value] of Object.entries(nodeList)){
         parent.descendants.push(nodeList[key])
        }
        console.log(parent)
    // console.log(parent)
    // // console.log(parent)
    // // console.log(parent.descendants[0].value)
    for(const [key,value] of Object.entries(parent.descendants)){
        console.log(value.descendants)
    }

    
}
const createOptimalSchedule= async (wbs)=>{
    let Schedule;
    let temp={};
    let arr = []
    const name = "pr 1"
    const structure = await Wbs.findById("63ad626100414213e86bb4dc").select("task").lean().exec()
    const {task} =  structure
    task.map((obj)=>{
 
      arr.push({task:obj.title,start:obj.StartingDate,end:obj.EndingDate})

    })
    console.log(arr)
   const ScheduleX = new ScheduleInfo({
        projectName:name,
        projectSchedule:arr
    })
   ScheduleX.save()
}
const createSchedule=(projectName,hasDependecy)=>{
    let wbs;
    
    connectToDB();
    try {
        project.findOne({projectName:projectName}).lean().populate('wbs').select('wbs').exec((err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                
                wbs=result
                if(hasDependecy){
                    //todo create has depedency sheduler
                }
                else{
                    // createNoneDepedencyScheduler(wbs)
                    createOptimalSchedule(wbs)
                }
            }
        })
        
    } catch (error) {
        console.log(error)
    }


}
module.exports = createSchedule