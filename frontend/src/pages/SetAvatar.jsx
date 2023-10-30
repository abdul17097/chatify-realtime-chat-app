import axios from 'axios';
import React, {useEffect, useState } from 'react'
import {UNSAFE_useRouteId, useNavigate} from 'react-router-dom'
import {Buffer} from "buffer"
import { toast } from 'react-toastify';
export const SetAvatar = () => {
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [selectAvatar, setSelectAvatar] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // useEffect(() => {
    //     if(!userInfo){
    //         navigate("/login");
    //     }
    //     if(userInfo.isAvatarImage){
    //         navigate(`/chat/${userInfo.id}`)
    //     }
    //     console.log(userInfo.user);
    // }, [])
    useEffect(()=>{
        const getApiData = async ()=>{
         setLoading(true)

           const data = []
            for(let i=0; i<4; i++){
                const image = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"))                
                console.log(image);
            }
            setAvatars(data)
            if(data){
                setLoading(false)
            }
        }
        if(!userInfo.isAvatarImage){
            getApiData()
        }
    },[])
    const handleSeclect = async ()=>{
        try {
            if(selectAvatar === undefined){
                toast.error("Please Select Profile Picture");
            }else{
                const {user} = await JSON.parse(localStorage.getItem("userInfo"));
                const {data} = await axios.post(`http://localhost:5000/api/setAvatar/${user.id}`,{image: selectAvatar.image},{headers:{"Content-Type":"application/json"}});
                if(data.isSet){
                    user.isAvatarImage = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("userInfo", JSON.stringify(user));
                    console.log(user)
                    navigate('/login')
                }
                
            }
        
            
        } catch (error) {
            
        }
    }
    return (
        <div className="h-[100vh] w-[100vw]">
        {loading === true ? 
        <div className="h-[100%] w-[100%] flex justify-center border">
            <img src="Loading.gif" alt=""/>
        </div>:
        <div className="flex justify-center items-center h-[100vh]">

            <div className="text-white   flex flex-col justify-center items-center gap-12">
            <h1 className="text-4xl font-bold">Pick an Avatar as your profile Picture</h1>
            <div className="flex gap-5">
                {
                    avatars && avatars.map((image,index)=>{
                        return(
                            <div className={`w-[80px] h-[80px]  rounded-[50%] ${selectAvatar && selectAvatar.index === index?"border-4 border-[#4e0eff] p-1 shadow": "" } `} key={index}>
                                <img src={`data:image/svg+xml;base64,${image}`} onClick={()=> setSelectAvatar({image,index})} alt="" className=""/>
                            </div>
                        )
                    })
                }
            </div>
            <button className=" bg-[#2DC2BD] py-3 rounded-lg px-10 flex justify-center items-center font-bold" onClick={handleSeclect}>SET AS PROFILE PICTURE</button>
            </div>
            </div>
        }
        </div>
    )
}
