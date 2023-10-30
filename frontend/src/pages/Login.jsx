import axios from 'axios';
import React, {useState} from 'react'
import {DiSenchatouch} from 'react-icons/di'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
export const Login = () => {
    const [data, setData] = useState({email:"", password:""});
    const navigate = useNavigate();
    const handlesubmit = async ()=>{
        const {email, password} = data;
        if(!email && !password){
            toast.error("Please Enter Email & Password")
        }else if(!email){
            toast.error("Please Enter Email")
        }else if(!password){
            toast.error("Please Enter Password")
        }else if(password.length < 8){
            toast.error("Password Must be 8 digit")
        }else{
            try {
                const response = await axios.post("http://localhost:5000/api/login",data,{headers: {"Content-Type":"application/json"}})
                console.log(response);
                if(response.data.success){
                    toast.success("Successfully Login")
                    localStorage.setItem("userInfo", JSON.stringify(response.data))
                    const {user} = JSON.parse(localStorage.getItem('userInfo'))
                    navigate(`/chat/${user.id}`)

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
                    <h1 className="text-3xl ">LOGIN</h1>
                </div>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="email" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="email" placeholder="Email "/>
                <input onChange={(event)=> setData({...data, [event.target.name]: event.target.value})} name="password" className="flex p-3 rounded-md pl-3 bg-[inherit] border" type="password" placeholder="Password "/>
                <button onClick={handlesubmit} className="p-3 rounded-md bg-[#0F82C5] mt-5 font-bold">LOGIN IN</button>
                <div className="text-center text-xs ">
                    <p>DON'T HAVE AN ACCOUNT? <NavLink to="/register" className="text-blue-500  font-bold">REGISTER</NavLink></p>
                </div>
            </div>
        </div>
    )
}
