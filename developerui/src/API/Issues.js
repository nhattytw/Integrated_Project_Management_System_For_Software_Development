import axios from "axios"
export const issues = [
    {
        project:"bantu hr",
        comment:["payroll not added","ui rework","testing"]
    },
    {
        project:"Akila hr",
        comment:["payroll not added","ui rework","testing"]
    },
    {
        project:"Seinor project",
        comment:["payroll not added","ui rework","testing"]
    }
]
export  const postIssue=(Issue)=>{
    
    axios({
        method:'post',
        url:'http://localhost:9000/api/Issues/PostIssue',
        data:Issue
    })
}
export const postComment=(comment)=>{
    axios({
        method:'post',
        url:'http://localhost:9000/api/Issues/postComment',
        data:comment
    })
}
export const changeStatus = (id) =>{
    axios({
        method:'post',
        url:'http://localhost:9000/api/Issues/setIssueResolved',
        data:{id:id}
    })
}