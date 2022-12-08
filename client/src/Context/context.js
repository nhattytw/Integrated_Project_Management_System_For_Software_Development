import React, { Children, useState } from "react";
const Context = React.createContext();
const AssignmentContext =React.createContext();

const AssignmentContextProvider = ({ children }) =>{
    const [Assignment,setAssignment] = useState("AssignTaskToTeam")
    
            return(

                <AssignmentContext.Provider value={{Assignment,setAssignment}}>
                    {children}
                </AssignmentContext.Provider>
            )
}
const ContextProvider = ({ children }) =>{
    const [Tabs,setTabs] = useState("ActiveProjects")
    console.log(typeof(setTabs))
            return(

                <Context.Provider value={{Tabs,setTabs}}>
                    {children}
                </Context.Provider>
            )
}
export {Context,ContextProvider,AssignmentContext,AssignmentContextProvider}