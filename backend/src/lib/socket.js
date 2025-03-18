import {Server} from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);  
const io = new Server(server,{cors:{origin:'http://localhost:5173'}});


const  getReceiverSocketId = (userid) =>{   
    return userSocketMap[userid]
}

const userSocketMap = {}

io.on("connection", (socket) => { 
    console.log(`User Connected: ${socket.id}`);

    const userid = socket.handshake.query.userid;

    
    if(userid) userSocketMap[userid] = socket.id
  
    io.emit('getOnlineUsers',Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userid]
        console.log(`User Disconnected: ${socket.id}`);
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    });
});

export { app ,server,io ,getReceiverSocketId}