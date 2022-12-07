import React, { Children, useState } from "react";

const Context = React.createContext();
const ContextProvider = ({ children }) =>{
    const [Tabs,setTabs] = useState("ActiveProjects")
            return(

                <Context.Provider value={{Tabs,setTabs}}>
                    {console.log(Tabs)}
                    {children}
                </Context.Provider>
            )
}
export {Context,ContextProvider}