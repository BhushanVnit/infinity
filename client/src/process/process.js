import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { roomName } from "../recoil_state";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
function Process() {
  const [users, setUsers] = useState([]);
  const room = useRecoilValue(roomName);

  useEffect(() => {
    const fetchUsers = async () => {

      try {

        const response = await axios.get(`${REACT_APP_BACKEND_URL}/users/${room}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [room]);

  return (
    <div className="w-64 p-4">
      <h2 className="text-2xl font-bold mb-4">Currently active users</h2>
      {users.map((user) => (
        <div className="flex items-center space-x-2 mb-2" key={user.id + user.username}>
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <h3 className="text-lg font-medium">{user.username}</h3>
        </div>
      ))}
    </div>


  );
}

export default Process;
