const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose")
const PostIssue = require('./controllers/issuesController')

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);


  socket.on("send_message", (data) => {
    socket.join(data.room);
    socket.to(data.room).emit("receive_message", data);
    PostIssue(data)
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});