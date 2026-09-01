import * as Match from "./controllers/match.controller.js";
import * as Game from "./controllers/game.controller.js";
import * as Room from "./controllers/room.controller.js";

const ioHandler = (io) => {
  io.on("connection", (socket) => {
    socket.on("match:find", () => Match.find(io, socket)); // Find an online match
    socket.on("match:cancel", () => Match.cancel(socket)); // Cancel a matchmaking request

    socket.on("game:move", (index) => Game.move(io, socket, index)); // Make a move
    socket.on("game:rematch", () => Game.rematch(io, socket)); // Request for rematch

    socket.on("room:create", () => Room.create(socket)); // Request a private room
    socket.on("room:join", (roomID) => Room.join(io, socket, roomID)); // Request to join a room
    socket.on("room:leave", () => Room.leave(io, socket)); // Leave the game

    socket.on("disconnect", () => Game.disconnect(io, socket)); // Handle socket disconnect
  });
};

export default ioHandler;
