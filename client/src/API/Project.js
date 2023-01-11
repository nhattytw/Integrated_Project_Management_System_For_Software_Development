import { useEffect } from "react"
const base_Path = 'http://localhost:9000/api'
export const Activeprojects = [
    {
        projectname:"bantu",
        projectDuration:"12 months",
        Assignedteam:"Team1",
        Activetasks:[{"Subsystem decompositon":"2 months"},{"Attendace Subsystem":"2 months"}],
        completedTasks:["Login","register"]
        
    }
]

export const postProject=(project)=>{
    // console.log(project)
    const post_Api = base_Path.concat('/project/createProject')
  
    fetch(post_Api, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', project);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}