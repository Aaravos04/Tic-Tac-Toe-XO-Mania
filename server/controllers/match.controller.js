import { nanoid } from "nanoid";

import Game from "../classes/Game.js";

import { matchQueue } from "../data/matchQueue.js";
import { gameRoom } from "../data/gameRoom.js";

const find = (io, socket) => {
  if (socket.data.gameID) {
    socket.emit("room:error", "Already in a room!");
    return;
  }

  const socketID = socket.id;
  if (matchQueue.includes(socketID)) return;

  matchQueue.push(socketID);
  if (matchQueue.length <= 1) return;

  let gameID = nanoid(6).toUpperCase();
  while (gameRoom.has(gameID)) gameID = nanoid(6).toUpperCase();

  const game = new Game(gameID);
  gameRoom.set(gameID, game);

  game.on("timeout", () => {}); // TODO

  const socket1 = io.sockets.sockets.get(matchQueue.shift());
  const socket2 = io.sockets.sockets.get(matchQueue.shift());

  game.joinGame(socket1.id);
  game.joinGame(socket2.id);

  socket1.join(gameID);
  socket2.join(gameID);

  socket1.data.gameID = gameID;
  socket2.data.gameID = gameID;

  game.startRound();
  socket1.emit("match:found", {
    game: { ...game.serialize(socket1.id) },
    data: { gameID },
  });

  socket2.emit("match:found", {
    game: { ...game.serialize(socket2.id) },
    data: { gameID },
  });
};

const cancel = (socket) => {
  const idx = matchQueue.indexOf(socket.id);
  if (idx !== -1) {
    matchQueue.splice(idx, 1);
    socket.emit("match:cancelled");
  }
};

export { find, cancel };
