import {atom} from "recoil";

const userName =atom({
    key:"username",
    default:""
  });

const name =atom({
    key:"name",
    default:""
  });
const roomName = atom({
    key:"roomname",
    default:""
})


const roomSecret = atom({
  key: "roomSectre",
  default: 12345
});

  export {userName,name, roomName, roomSecret};