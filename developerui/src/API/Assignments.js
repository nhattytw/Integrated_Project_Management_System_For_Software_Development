import axios from "axios"
export const assignments = [
    {
        team:"team 1",
        assignments:
    {
            project:"bantu hr",
            tasks:["center div","reowork ui","payment gateway"]

    
    }
    },
    {
        team:"team 2",
        assignments:
    {
            project:"Akile hr",
            tasks:["center div","reowork ui","payment gateway"]

    
    }
    }
]
export const postCompletedTask = (taskDetail)=>{
    const base_path = 'http://localhost:9000/api/';
    
    axios({
        method: 'post',
        url: base_path.concat('task/postCompletedTasks'),
        data:taskDetail
      });
}