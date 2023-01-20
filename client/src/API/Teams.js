import axios from "axios"
export const teams = [
    {
        name:"team1",
        memebers:["a","b","c","d"]
    },
    {
        name:"team2",
        memebers:["e","f","g","h"]
    },
    {
        name:"team3",
        memebers:["i","j","k","l"]
    }

]

const base_Path = 'http://localhost:9000/api'

export const PostTeams = (teams)=>{
    axios.post(base_Path+'/Teams/newTeam',teams).then(
        (response)=>{
            console.log(response)
        }
    )
    
}