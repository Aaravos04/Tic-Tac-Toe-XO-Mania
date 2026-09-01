import { gameRoom } from "../data/gameRoom.js";

import gameStatus from "../constants/gameStatus.js";
import playerStatus from "../constants/playerStatus.js";
import { matchQueue } from "../data/matchQueue.js";

const move = (io, socket, index) => {
  const gameID = socket.data.gameID;
  if (!gameID) return;
  
  const socketID = socket.id;
  const game = gameRoom.get(gameID);
  if (!game) return;
  
  const player = game.getPlayer(socketID);
  if (!player || player.symbol !== game.turn) return;
  
  console.log("game:move", socket.id, index);
  if (game.makeMove(index)) {
    const socket1 = io.sockets.sockets.get(game.players[0].socketID);
    const socket2 = io.sockets.sockets.get(game.players[1].socketID);

    socket1.emit("game:update", { ...game.serialize(socket1.id) });
    socket2.emit("game:update", { ...game.serialize(socket2.id) });
  }
};

const rematch = (io, socket) => {
  const gameID = socket.data.gameID;
  if (!gameID) return;

  const socketID = socket.id;
  const game = gameRoom.get(gameID);
  if (!game) return;

  const player = game.getPlayer(socketID);
  if (!player) return;

  const opponent = game.getOpponent(socketID);
  if (!opponent || opponent.status === playerStatus.LEFT) return;
  if (game.status === gameStatus.RUNNING) return;

  player.rematch = true;
  game.status = gameStatus.WAITING;

  if (opponent.rematch) {
    player.rematch = false;
    opponent.rematch = false;

    if (game.startRound()) {
      const socket1 = io.sockets.sockets.get(game.players[0].socketID);
      const socket2 = io.sockets.sockets.get(game.players[1].socketID);

      socket1.emit("rematch:accepted", { ...game.serialize(socket1.id) });
      socket2.emit("rematch:accepted", { ...game.serialize(socket2.id) });
    }
  } else {
    const opponentSocket = io.sockets.sockets.get(opponent.socketID);
    opponentSocket.emit("rematch:requested");
  }
};

const disconnect = (io, socket) => {
  const gameID = socket.data.gameID;
  if (!gameID) return;

  const socketID = socket.id;
  if (matchQueue.includes(socketID)) {
    const idx = matchQueue.indexOf(socket.id);
    matchQueue.splice(idx, 1);

    socket.emit("match:cancelled");
    return;
  }

  const game = gameRoom.get(gameID);
  if (!game) return;

  const player = game.getPlayer(socketID);
  if (!player) return;

  player.status = playerStatus.DISCONNECTED;
  player.disconnectTimer = setTimeout(() => {
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
  }, 10000);

  socket.emit("game:disconnected");
};

export { move, rematch, disconnect };
