import React, {useState} from 'react'
import {DiSenchatouch} from 'react-icons/di'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios"
export const Register = () => {
    const [data, setData] = useState({name: "",email:"", password:"", cpassword: ""});
    const navigate = useNavigate()
    const handlesubmit = async ()=>{
        const {name,email, password, cpassword} = data;
        if(!name){
            toast.error("Please Enter name")
        }else if(!email){
            toast.error("Please Enter Email")
        }else if(!password){
            toast.error("Please Enter Password")
        }else if(!cpassword){
            toast.error("Please Enter Confirm Password")
        }else if(password.length < 8){
            toast.error("Password Must be 8 digit")
        }else if(password !== cpassword){
            toast.error("Password & Confirm must Same")
        }else{
            try {
                const response = await axios.post("http://localhost:5000/api/signup",data,{headers: {"Content-Type":"application/json"}})
               
                if(response.data.success){
                    toast.success("Successfully Register");
                    navigate(`/setAvatar`)
                    
                }{
                    toast.error("Something Went Wrong!")
                }
            } catch (error) {
                
            }
        }

    }
    return (
        <div className="text-white flex justify-center items-center h-[100vh]">
            <div className="bg-[#030307] w-[35%] rounded-xl flex flex-col p-12  gap-5">
                <div className=" flex mb-3 justify-center items-center gap-3">
                    <DiSenchatouch className="text-4xl"/>
                    <h1 className="text-3xl ">SIGN UP</h1>
                </div>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="name" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="text" placeholder="Username"/>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="email" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="email" placeholder="Email "/>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="password" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="password" placeholder="Password "/>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="cpassword" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="password" placeholder="Confirm Password "/>

                <button onClick={handlesubmit} className="p-3 rounded-md bg-[#0F82C5] mt-5 hover:shadow font-bold">CREATE ACCOUNT</button>
                <div className="text-center text-xs">
                    <p>ALREADY HAVE AN ACCOUNT? <NavLink to="/login" className="text-blue-500 font-bold">LOGIN</NavLink></p>
                </div>
            </div>
        </div>
    )
}
