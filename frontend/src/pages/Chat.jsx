import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"
import Cantact from './Cantact';
import { Welcome } from './Welcome';
import { ChatContainer } from './ChatContainer';
export const Chat = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState();
    const [currentChat, setCurrentChat] = useState(undefined)
    const [currentUser, setCurrentUser] = useState(undefined)

    const {id} = useParams()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("userInfo"));
        setCurrentUser(user)
        if(!user){
            navigate("/login")
        }
        const getAllUsers = async ()=>{
            const {data} = await axios.get(`http://localhost:5000/api/allUser/${id}`,{headers: {"Content-Type":"application/json"}})
            setUsers(data)
        }
        getAllUsers()
    },[])
   
    const handleChatChange = (selectedUser)=>{
        setCurrentChat(selectedUser)
    }

    return (
        <div className="py-[5vh] border-box overflow-hidden ">
            <div className="bg-black border border-gray-700 rounded-xl border-box mx-14 flex w-6/6">
                {users && <Cantact contacts={users} changeChat={handleChatChange}/> }
                <div className=" w-[100%] h-[90vh]">
                {currentChat?<ChatContainer currentChat={currentChat}  currentUser={currentUser}/> : <Welcome/>}
                
            </div>


            </div>
        </div>
    )
}
