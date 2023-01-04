import React, { Children, useState } from "react";
const Context = React.createContext();
const AssignmentContext =React.createContext();

const ContextProvider = ({ children }) =>{
    const [Tabs,setTabs] = useState("CreateProject")
    const [Assignment,setAssignment] = useState("AssignTaskToTeam")
    const [Communications,setCommunications] = useState("ScheduledMeetings")
    const [Team,setTeams] = useState("createTeams")
    
            return(

                <Context.Provider value={{Tabs,setTabs,Assignment,setAssignment,Communications,setCommunications,Team,setTeams}}>
                    {children}
                </Context.Provider>
            )
}
export {Context,ContextProvider,AssignmentContext}