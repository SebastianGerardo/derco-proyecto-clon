import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const ContextDerco = ({children}) =>{
    const [UsuarioLogin, setUsuarioLogin] = useState([])
    const [cookiesUsu, setCookiesUsu] = useState("")
    /**Validar Cookies */
    const validarCookies = () =>{
        setCookiesUsu(document.cookie)
    }
    console.log(cookiesUsu)
    useEffect(()=>{
        validarCookies()
    },[])
    return(
        <UserContext.Provider value={{UsuarioLogin, setUsuarioLogin, cookiesUsu}}>
            {children}
        </UserContext.Provider>
    )
}