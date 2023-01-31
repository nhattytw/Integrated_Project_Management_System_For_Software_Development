const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose")
const PostIssue = require('./controllers/issuesController');
let id = 0
const messages = [] 
app.use(cors());

const server = http.createServer(app);
let cached_sessions = []
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // socket.on("send_message", (data) => {
  //   // socket.join(data.room);
  //   // socket.to(data.room).emit("receive_message", data);
  //   if (messages.includes(data) == -1) return 0;
  //   data.id = id 
  //   id++
  //   console.log(data)
  //   io.emit("messages",data )
  // });
  socket.on("projectCreation",(data)=>{
    
    io.emit("projectNotification",data.projectname)
  })
  socket.on("Assignment",(data)=>{
    console.log(data)

  })
  socket.on("TeamCreation",(data)=>{
    console.log("from teams")
  })
  socket.on("disconnect",()=>{
    console.log("disconnected")
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});