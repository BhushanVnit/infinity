// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./home/home";
import ChatScreen from "./chat/ChatScreen";
import Footer from "./Footer";

const socket = io.connect("http://localhost:8000");

function App() {
  return (
    <Router>
      <div className="App bg-slate-800">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat/:roomname/:username" element={<ChatScreen socket={socket}/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
