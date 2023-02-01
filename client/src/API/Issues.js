import axios from "axios"
export const issues = [
    {
        project:"bantu hr",
        issue:["payroll not added","ui rework","testing"]
    },
    {
        project:"Akila hr",
        issue:["payroll not added","ui rework","testing"]
    },
    {
        project:"Seinor project",
        issue:["payroll not added","ui rework","testing"]
    }
]

export const postComment=(comment)=>{
    axios({
        method:'post',
        url:'http://localhost:9000/api/Issues/postComment',
        data:comment
    })
}