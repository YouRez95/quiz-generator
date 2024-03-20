import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BASE_URL
export default function socketConnection () {
  // const userData = localStorage.getItem("user")
  //     ? JSON.parse(localStorage.getItem("user"))
  //     : null;

  // let userId;
  // if (userData){
  //   userId = userData.user._id
  // } else {
  //   userId = null
  // }

  const socket = io(URL);
  return socket;
}