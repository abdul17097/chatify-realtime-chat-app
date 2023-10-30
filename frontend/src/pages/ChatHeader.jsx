import React from 'react'

export const ChatHeader = ({userData}) => {
    console.log(userData);
    return (
        <div className="flex gap-5 items-center border h-[100%] px-5">
            <img src={`data:image/svg+xml;base64,${userData.avatarImage}`} alt="" className="border border-4 border-blue-500 rounded-[50%] w-[10%]"/>
            <h2 className="text-lg font-bold text-white">{userData.name}</h2>
        </div>
    )
}

