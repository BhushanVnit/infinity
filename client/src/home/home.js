// Homepage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userName, name, roomName, roomSecret } from '../recoil_state';

function Homepage({ socket }) {
  const [nameForm, setNameForm] = useState("");
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [roomKey, setRoomKey] = useState("");
  const [userNameRecoil, setUserNameRecoil] = useRecoilState(userName);
  const [nameRecoil, setnameRecoil] = useRecoilState(name);
  const [roomNameRecoil, setroomNameRecoil] = useRecoilState(roomName);
  const [roomSecretRecoil, setRoomSecretRecoil] = useRecoilState(roomSecret);

  const sendData = () => {
    if (name !== "" && roomname !== "") {
      setUserNameRecoil(username);
      setnameRecoil(name);
      setroomNameRecoil(roomname);
      setRoomSecretRecoil(roomKey);

      socket.emit("joinRoom", { username, roomname,nameForm});
    } else {
      alert("Name and Roomname are required!");
      setNameForm("");
      setRoomname("");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray-700 rounded-lg">
        <h1 className="text-3xl text-white text-center mb-6">Welcome to Infinity</h1>
        <input
          className="h-12 w-full bg-gray-800 text-white px-4 rounded-md mb-4"
          type="text"
          placeholder="Input your Name"
          value={nameForm}
          onChange={(e) => {
            setNameForm(e.target.value);
            setUsername(e.target.value + Date.now());
          }}
        />
        <input
          className="h-12 w-full bg-gray-800 text-white px-4 rounded-md mb-4"
          type="text"
          placeholder="Input the room name"
          value={roomname}
          onChange={(e) => setRoomname(e.target.value)}
        />
        <input
          className="h-12 w-full bg-gray-800 text-white px-4 rounded-md mb-4"
          type="text"
          placeholder="Input the room secret key"
          value={roomKey}
          onChange={(e) => setRoomKey(e.target.value)}
        />
        <Link to={`/chat/${roomname}/${username}`}>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md w-full"
            onClick={sendData}
          >
            Join
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
