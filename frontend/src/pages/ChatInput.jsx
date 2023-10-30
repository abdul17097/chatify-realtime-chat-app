import React, {useState, useRef, useEffect} from 'react'
import {BsEmojiSmileFill} from "react-icons/bs"
import {BiSolidSend} from "react-icons/bi"
import EmojiPicker from 'emoji-picker-react';
import axios from "axios"
export const ChatInput = ({currentChat, currentUser, socket, setMessages, messages}) => {
    console.log(currentChat, currentUser.user)
    const [showEmoji, setShowEmoji] = useState(false);
    const [message, setMessage] = useState("");
    const [arrivalMessage,setArrivalMessage] = useState()
    console.log(socket);
    const handleEmojiPickerShowHide = ()=>{
        setShowEmoji(!showEmoji)
    }
    const handleEmojiClick = (event)=>{
        let msg = message;
        msg = msg + event.emoji;
        setMessage(msg)
    }
    const handleSend = async ()=>{
        console.log(message)
        const {data} = await axios.post("http://localhost:5000/message/api/addmsg",{
            message: message,
            to: currentChat._id ,
            from: currentUser.user.id
        },{headers: {"Content-Type": "application/json"}})
        console.log(data);
        setMessage("")
        socket.current.emit("send-msg",{
            from: currentUser.user.id,
            to: currentChat._id,
            message: message
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: message});
        setMessages(msgs)
        console.log(messages);
        
    }
    useEffect(() => {
        console.log(socket.current);
        if(socket.current){
            socket.current?.on("msg-recieve",(msg)=>{
                console.log(msg);
                setArrivalMessage({fromSelf: false, message: message})
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev)=> [...prev, arrivalMessage])
    }, [arrivalMessage])
    
    return (
        <div className="text-white flex justify-between border-t border-gray-700 gap-2 items-center px-5 py-2  ">
            <div className="relative top-0 left-0">
            <BsEmojiSmileFill className="text-[yellow] text-3xl cursor-pointer" onClick={handleEmojiPickerShowHide}/>
            <div className="absolute bottom-10 left-0">
                {showEmoji && <EmojiPicker  onEmojiClick={handleEmojiClick}/>}
            </div>
            
            </div>
            <div className="w-full flex rounded-3xl bg-gray-600 ">
            <input type="text" value={message} onChange={(e)=> setMessage(e.target.value)} className="w-full rounded-3xl bg-gray-600 py-2 focus:outline-none pl-5" placeholder="type you message here"/>
            <div onClick={handleSend} className="hover:bg-blue-300 px-5 rounded-3xl bg-blue-400 cursor-pointer flex items-center ">
            <BiSolidSend className="text-3xl"/>
            </div>
            </div>
        </div>
    )
}
