import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userName, roomName, roomSecret } from "../recoil_state";
import { to_Decrypt, to_Encrypt } from "../aes.js";

function Chat({ socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const roomkey = useRecoilValue(roomSecret);
  const user = useRecoilValue(userName);
  const room = useRecoilValue(roomName);

  useEffect(() => {
    socket.on("message", async (data) => {
      // Decrypt the message
      const decryptedMessage = await to_Decrypt(data.text, data.name, roomkey);

      // Update the chat messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          userId: data.userId,
          username: data.username,
          name: data.name,
          text: decryptedMessage,
        },
      ]);
    });
  }, [socket, roomkey]);

  const sendData = async () => {
    if (text !== "") {
      // Encrypt the message
      const encryptedMessage = await to_Encrypt(text, roomkey);
      // Emit the encrypted message to the server
      socket.emit("chat", encryptedMessage);

      setText("");
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat flex flex-col h-screen bg-blue-100 p-4 rounded-xl max-w-md mx-auto">
        <div className="user-name text-start pb-2">
          <span className="font-bold text-gray-500">Chat Room:</span> {room}
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((i) => (
            <div
              className={`flex ${i.username === user ? "flex-row-reverse" : ""} mb-2`}
              key={i.text + Date.now()}
            >
              <div
                className={`${i.username === user ? "bg-emerald-700" : "bg-gray-900"
                  } rounded-lg p-2`}
              >
                {i.username !== user ? (
                  <p
                    className={`${i.username === user ? "text-right" : ""
                      } text-pink-700 text-sm`}
                  >
                    {i.name}
                  </p>
                ) : null}
                {i.text ? (
                  <p
                    className={`${i.username === user ? "text-right" : ""
                      } text-white font-medium`}
                  >
                    {i.text}
                  </p>
                ) : (
                  <p
                    className={`${i.username === user ? "text-right" : ""
                      } text-white font-medium`}
                  >
                    Wrong key
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="send flex items-center">
          <input
            type="text"
            placeholder="Enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-80 bg-gray-700 text-white px-2 py-1 rounded-l focus:outline-none"
          />
          <button
            onClick={sendData}
            className="w-20 bg-yellow-500 text-black rounded-r px-2 py-1"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
