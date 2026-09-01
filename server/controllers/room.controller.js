import { nanoid } from "nanoid";

import Game from "../classes/Game.js";

import { gameRoom } from "../data/gameRoom.js";

const create = (socket) => {
  if (socket.data.gameID) {
    socket.emit("room:error", "Already in a room!");
    return;
  }

  let gameID = nanoid(6).toUpperCase();
  while (gameRoom.has(gameID)) gameID = nanoid(6).toUpperCase();

  const socketID = socket.id;
  const game = new Game(gameID);

  game.joinGame(socketID);
  gameRoom.set(gameID, game);

  socket.data.gameID = gameID;
  socket.join(gameID);
  socket.emit("room:created", { gameID });
};

const join = (io, socket, gameID) => {
  if (socket.data.gameID) {
    socket.emit("room:error", "Already in a room!");
    return;
  }

  const socketID = socket.id;
  const game = gameRoom.get(gameID);

  if (!game) {
    socket.emit("room:error", "Invalid room ID!");
    return;
  }

  const success = game.joinGame(socketID);
  if (!success) {
    socket.emit("room:error", "Room join failed!");
    return;
  }

  socket.data.gameID = gameID;
  socket.join(gameID);
  socket.emit("room:joined");

  if (game.isFull() && game.startRound()) {
    const socket1 = io.sockets.sockets.get(game.players[0].socketID);
    const socket2 = io.sockets.sockets.get(game.players[1].socketID);

    socket1.emit("game:start", { ...game.serialize(socket1.id) });
    socket2.emit("game:start", { ...game.serialize(socket2.id) });
  }
};

const leave = (io, socket) => {
  const gameID = socket.data.gameID;
  if (!gameID) return;

  const game = gameRoom.get(gameID);
  if (!game) {
    socket.data.gameID = null;
    return;
  }

  const socketID = socket.id;
  if (!game.getPlayer(socketID)) return;
  game.leaveGame(socketID);

  if (game.isEmpty()) {
    gameRoom.delete(gameID);
  } else {
    const opponentID = game.getOpponent(socketID)?.socketID;
    const opponent = io.sockets.sockets.get(opponentID);
    opponent?.emit("opponent:left");
  }

  socket.data.gameID = null;
  socket.leave(gameID);
  socket.emit("room:left");
};

export { create, join, leave };
