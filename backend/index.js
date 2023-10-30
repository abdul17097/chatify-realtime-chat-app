const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require("cors")
const connectionDB = require('./config/connection')
const userRouter = require('./routes/userRoutes')
const messagesRouter = require('./routes/messagesRoutes')
const socket = require('socket.io');
app.use(express.json())
app.use(cors())
dotenv.config();

connectionDB();

app.use('/', userRouter )
app.use('/message', messagesRouter )
app.get('/', (req,res)=>{
    res.send("Hello World")
})

const server = app.listen(5000,()=>{
    console.log(`Server running on port http://locahost:5000`);
})

const io = socket(server,{
    cors: {
        origin: "http://localhost:5173",
        credential: true
    }
} ) 

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id)
    });

    socket.on("send-msg",(data)=>{
        console.log("sendmsg", {data})
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})