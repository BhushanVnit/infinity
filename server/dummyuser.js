
// Use an object as a dictionary
const usersByRoom = {}; 

// joins the user to the specific chatroom
function join_User(id, username, room, nameForm) {
  
  const p_user = { id, username, room, nameForm };

  if (!usersByRoom[room]) {
    usersByRoom[room] = [];
  }
  // Add the user to the specific room's array
  usersByRoom[room].push(p_user); 

  return p_user;
}


// The get_Current_User() function will
// take the id of the particular user to return the current user
function get_Current_User(id) {
  for (const room in usersByRoom) {
    const user = usersByRoom[room].find((p_user) => p_user.id === id);
    if (user) {
      return user;
    }
  }
  return null; // User not found
}

function get_Current_Users(room) {
  // Check if the room exists in usersByRoom
  if (usersByRoom[room]) {
    return usersByRoom[room];
  }
  
  return [];
}

//In the user_Disconnect() function, if a user disconnects 
// or leaves the chat,the function accepts a user id
// and deletes the user object from the array users.

function user_Disconnect(id) {
  for (const room in usersByRoom) {
    const users = usersByRoom[room];
    const index = users.findIndex((user) => user.id === id);
    
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
  }
  
  return null;
}
module.exports = {
  join_User,
  get_Current_User,
  get_Current_Users,
  user_Disconnect,
};
