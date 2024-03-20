import dotenv from "dotenv";
dotenv.config()
import { Server } from "socket.io";
let io;

// console.log(process.env.NODE_ENV)
const origin = process.env.NODE_ENV === 'developement' ? "http://localhost:5173" : process.env.FRONT_URL

export const init = (server) => {
  io = new Server(server, {cors: {origin: origin, methods: ["GET", "POST"]}})
  return io;
}

let onlineUsers = [];

export const addNewUser = (data, socketId) => {
  !onlineUsers.some((user) => user.userId === data.userId) &&
    onlineUsers.push({ ...data, socketId });
};

export const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

export const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};


export const getIo = () => {
  if (!io) {
    throw new Error("io not yet");
  }
  return io;
}
