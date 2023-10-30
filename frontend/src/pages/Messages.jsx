import React,{useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid';
export const Messages = ({messages}) => {
    console.log(messages)
    const scrollRef = useRef()
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, []);
      
    return (
        <div className="text-white h-[75%]  scrolls overflow-auto  flex gap-1 px-5 flex-col">
            {messages && messages.map((msg,index)=> { return (
                 <div key={index} ref={scrollRef}>

                 {msg.fromSelf? 
                     <div className=" flex justify-end my-1">
                         <span className=" py-1 border border-gray-800 px-5 rounded-lg bg-[#131324]">{msg.message}</span>
                         </div>:
                     <div className="my-1 ">
                         <span className="drop-shadow-xl border border-gray-800 py-1 px-5 rounded-lg bg-[#131324]">{msg.message}</span>


                    </div>}
                 </div>
            )})}
        </div>
    )
}
