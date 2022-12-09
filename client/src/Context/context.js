import React, { Children, useState } from "react";
const Context = React.createContext();
const AssignmentContext =React.createContext();

const ContextProvider = ({ children }) =>{
    const [Tabs,setTabs] = useState("ActiveProjects")
    const [Assignment,setAssignment] = useState("AssignTaskToTeam")
    const [Communications,setCommunications] = useState("ScheduledMeetings")
    
            return(

                <Context.Provider value={{Tabs,setTabs,Assignment,setAssignment,Communications,setCommunications}}>
                    {children}
                </Context.Provider>
            )
}
export {Context,ContextProvider,AssignmentContext}