import React, { useState } from "react";
import { DiSenchatouch } from "react-icons/di";
import { ChatContainer } from "./ChatContainer";
import { Welcome } from "./Welcome";
import './Contact.css'
const Cantact = ({ contacts, changeChat }) => {
  console.log(contacts);
  return (
    <div className="text-white flex flex-row h-[90vh]  w-6/6 md-w-2/6  ">
      <div className=" ">
        <div className="flex flex-row border-b border-gray-700  justify-center h-[10vh] pt-2 border-b border-gray-700 border-r items-center">
          <DiSenchatouch className="text-4xl" />
          <h3 className="text-2xl font-bold ">Chatify</h3>
        </div>
        <div className=" flex  h-[80vh] scrolls overflow-auto border-r border-gray-700  flex-col py-2 px-1 gap-2">
          {contacts.map((user, index) => {
            return (
              <div
                onClick={() => changeChat(user)}
                className="bg-blue-400 flex py-3 pl-3  hover:bg-blue-300 transition-all delay-2  items-center gap-5"
                key={index}
              >
                <img
                  src={`data:image/svg+xml;base64,${user.avatarImage}`}
                  alt=""
                  className="w-[15%]"
                />
                <div className="text-white text-xl">{user.name}</div>
              </div>
            );
          })}
          
          
        </div>
      </div>
    </div>
  );
};

export default Cantact;
