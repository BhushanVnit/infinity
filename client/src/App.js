// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Home from "./home/home";
import ChatScreen from "./chat/ChatScreen";
import Footer from "./Footer";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io.connect(REACT_APP_BACKEND_URL);

function App() {
  return (
    <Router>
      <div className="App bg-slate-800">
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat/:roomname/:username" element={<ChatScreen socket={socket} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
