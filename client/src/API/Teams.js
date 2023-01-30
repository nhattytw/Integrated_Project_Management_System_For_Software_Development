import axios from "axios"
export const teams = [
    {
        name: "team1",
        members: ["a", "b", "c", "d"]
    },
    {
        name: "team2",
        members: ["e", "f", "g", "h"]
    },
    {
        name: "team3",
        members: ["i", "j", "k", "l"]
    }

]

const base_Path = 'http://localhost:9000/api'

export const PostTeams = (teams) => {

    fetch(
        base_Path + '/Teams/newTeam',
        {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('Bearer')
            },
            body: teams
        }).then(
            (response) => {
                console.log(response)
            }
        )

}