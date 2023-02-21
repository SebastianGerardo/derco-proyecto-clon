import { createContext, useState } from "react";

export const UserContext = createContext()

export const ContextDerco = ({children}) =>{
    const [calModulos, setCalModulos] = useState(false)
    return(
        <UserContext.Provider value={{calModulos, setCalModulos}}>
            {children}
        </UserContext.Provider>
    )
}