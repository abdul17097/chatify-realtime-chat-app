import React from 'react'

export const Welcome = ({currentChat}) => {
    console.log(currentChat)
    const user = JSON.parse(localStorage.getItem("userInfo"))
    return (
        <div className="w-6/6 text-white  gap-3 flex flex-col justify-center items-center h-[100%]">
            <h2 className="text-4xl ">HELLO</h2>
            <h3 className=" text-2xl font-bold">Welcome, <span className="text-blue-500"> {user.name} </span></h3>
            <p className="text-md">Please Select a chat to Start Messanging.</p>
        </div>
    )
}

