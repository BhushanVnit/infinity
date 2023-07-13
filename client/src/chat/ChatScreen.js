import React, { useState } from "react";
import Chat from './chat';
import Process from '../process/process';

const ChatScreen = ({socket}) => {
    const [showProcess, setShowProcess] = useState(false);

    const toggleProcess = () => {
      setShowProcess((prevShowProcess) => !prevShowProcess);
    };
  
    const hideProcess = () => {
      setShowProcess(false);
    };
  
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-grow">
          <Chat socket={socket} />
        </div>
  
        {!showProcess && (
          <button
            className="fixed top-0 right-0 m-4 bg-blue-500 text-white rounded p-2"
            onClick={toggleProcess}
          >
            Acive users
          </button>
        )}

        {showProcess && (
          <div className="fixed right-0 top-0 h-screen bg-gray-900 bg-opacity-75 p-4">
            <button
              className="absolute top-0 right-0 m-4 bg-red-500 text-white rounded p-2"
              onClick={hideProcess}
            >
              Hide
            </button>
            <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
              <Process />
            </div>
          </div>
        )}
      </div>
    );
}

export default ChatScreen;
