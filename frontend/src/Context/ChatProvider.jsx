import { useNavigate } from "react-router";

import { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();


const ContextProvider = ({children})=>{
    const [user,setUser] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('user'));
        setUser(userInfo)
        if(!userInfo){
            navigate('/')
        }
    },[])
    return (
        <ChatContext.Provider value={{user,hello:"alksdjf"}}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = ()=>{
    return useContext(ChatContext);
}

export default ContextProvider;