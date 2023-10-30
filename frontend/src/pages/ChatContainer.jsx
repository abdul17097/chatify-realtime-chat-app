import React,{useEffect, useState, useRef} from "react";
import { ChatInput } from "./ChatInput";
import { Logout } from "./Logout";
import { Messages } from "./Messages";
import axios from "axios"
import {io} from 'socket.io-client'


export const ChatContainer = ({ currentChat, currentUser}) => {
  const [messages, setMessages] = useState();
  const socket = useRef()
  console.log(currentUser)
  useEffect(()=>{
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser && currentUser.user.id)
  },[])

  
  useEffect(()=>{
    const getAllMessages = async ()=>{
        if(currentChat){

          const {data} = await axios.post("http://localhost:5000/message/api/getallmsg",{
              from: currentUser.user.id,
              to: currentChat._id
          },
          {headers: {"Content-Type": "application/json"}})
          console.log(data);
    setMessages(data)
        }
    

    }
    getAllMessages()
},[currentChat])
  return (
    <div className="h-full  flex flex-col justify-between ">
      <div className="flex w-6/6 border-b border-gray-700 items-center justify-between px-5">
        <div className="flex gap-5  items-center   h-[10vh] ">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt=""
            className="border border-4 border-blue-500 rounded-[50%] w-[10%]"
          />
          <h2 className="text-lg font-bold text-white">{currentChat.name}</h2>
        </div>
        <Logout/>
      </div>
      <Messages messages={messages} />
      <ChatInput currentChat={currentChat} socket={socket} messages={messages} setMessages={setMessages} currentUser={currentUser}/>
    </div>
  );
};
