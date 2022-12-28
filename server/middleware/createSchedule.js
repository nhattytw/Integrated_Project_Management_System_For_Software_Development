const connectToDB = require('../utils/dbConnect');
const schedule = require('../model/schedule')
const project = require('../model/project');
const dependecy = require('../model/dependecy');



function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
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
            title:title,
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
// const createDependencyShedule = (){

// }

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
                    createNoneDepedencyScheduler(wbs)
                }
            }
        })
        
    } catch (error) {
        console.log(error)
    }


}
module.exports = createSchedule