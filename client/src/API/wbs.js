import axios from 'axios';

const base_Path = 'http://localhost:9000/api'

export const addWbs = (wbs,projectName)=>{
    axios.post(base_Path+'/wbs/addWbs',{
        "Task":wbs,
        "ProjectName":projectName,
        "userName": localStorage.getItem("userName")
    }).then(
        (response)=>{
            console.log(response)
        }
    )
    
}
