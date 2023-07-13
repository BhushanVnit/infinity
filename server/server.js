// for initializing backend connection
// and ensures the communication between the users in the room.
require('dotenv').config();
const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const color = require("colors");
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User,get_Current_Users} = require("./dummyuser");

app.use(express());

const BASE_URL = process.env.BASE_URL
app.use(cors({ origin: BASE_URL }));
const port = process.env.PORT || 8000;
const io = require("socket.io")(httpServer, {
  cors: {
    origin: BASE_URL,
    methods: ["GET", "POST"]
  }
});

httpServer.listen(
  port,
  console.log(`Server is running on the port no: ${port}`.green)
);

// https://socket.io/docs/v4/

app.get("/users/:room", (req, res) => {
  const room = req.params.room;
  const users = get_Current_Users(room);
  res.json(users);
});

//initializing the socket io connection
io.on("connection", (socket) => {
  // The function we pass to socket.on(“joinRoom”) runs when a new
  // room user joins the room.

  socket.on("joinRoom", ({ username, roomname, nameForm }) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname, nameForm);
    socket.join(p_user.room);
    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      name: p_user.name,
      username: p_user.username,
      text: `Welcome ${p_user.nameForm}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      name: p_user.nameForm,
      text: `${p_user.nameForm} has joined the chat`,
    });
  });

  //The function we pass to socket.on(“chat”) handles sending and receiving message.
  //If a user leaves the chat, a disconnect message is broadcasted to all other room users

  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);

    if(p_user){
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        name: p_user.nameForm,
        username: p_user.username,
        text: text,
      });
    }
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        name: p_user.nameForm,
        text: `${p_user.nameForm} has left the chat`,
      });
    }
  });
});
