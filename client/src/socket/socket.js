import { io } from "socket.io-client";

const socket = io("https://tic-tac-toe-xo-mania.onrender.com/");

socket.on("connect", () => {
  console.log("Socket connected!");
});

export default socket;
