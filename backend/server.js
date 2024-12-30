import express, { Router, text } from "express";
import { Server } from "socket.io";
import router from "./rout.js"
import cors from "cors"
import http from 'http'
import {addUser,removerUser,getUser,getUsersInRoom} from './user.js' 
// const app= express()
// const port=process.env.PORT|| 5000
// const server=http.createServer(app)
// const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173", // Allow this origin
//       methods: ["GET", "POST"],       // Allow these methods
//       credentials: true,              // Allow cookies if needed
//     },
//   });
// app.use(cors({
//     origin: "http://localhost:5173", // Allow requests from this origin
//     methods: ["GET", "POST"], // Specify allowed methods
//     credentials: true, // Allow cookies and authentication headers
//   }));
//  io.on("connection",(socket)=>{
//   console.log(socket.id)
//   socket.on("sendmessage",(data)=>{
//       socket.broadcast.emit("recive",data)
//   })
//  })
// app.use(router)    


// server.listen(port,()=>{
//     console.log(`your server is running on ${port}`)
// })
const app=express()
let arr=[]
const port=5000
const server=http.createServer(app)
const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true,
  }
})
app.use(cors({
  origin:"http://localhost:5173",
  methods:["GET","POST"],
  credentials:true,
}))
app.use(router)

io.on("connection",(socket)=>{
  console.log(socket.id)
  socket.on("getchathistory",()=>{
    socket.emit("chathistory",arr)

  })
  socket.on("sendmessage",(data)=>{
    arr.push(data)
    console.log(arr)
    socket.emit("recive",data)
  })
  socket.on("delate",(data)=>{
    console.log(data)
   arr.splice(data,1)
  })
})
server.listen(port,()=>{
  console.log(`your server is running on port${port}`)
})    