import React from 'react'
import {BiPowerOff} from "react-icons/bi";
import {useNavigate} from "react-router-dom"
export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("userInfo");
        navigate('/login')
    }
    return (
        <div onClick={handleLogout} className="text-white hover:bg-blue-300 hover:text-gray-500 p-1 rounded-lg bg-blue-400">
            <BiPowerOff className="text-xl "/>
        </div>
    )
}
