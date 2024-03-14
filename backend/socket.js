import { Server } from "socket.io";
let io;

export const init = (server) => {
  io = new Server(server, {cors: {origin: "http://localhost:5173", methods: ["GET", "POST"]}})
  return io;
}


export const getIo = () => {
  if (!io) {
    throw new Error("io not yet");
  }
  return io;
}
