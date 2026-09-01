import { create } from "zustand";
import gameStatus from "../constants/gameStatus";
import socket from "../socket/socket.js";

const useOnlineGame = create((set) => ({
  board: undefined,
  turn: undefined,
  status: gameStatus.INACTIVE,
  players: undefined,

  update: (updates) => set({ ...updates }),
  move: (index) => socket.emit("game:move", index),
  rematch: () => socket.emit("game:rematch"),
  leave: () => socket.emit("room:leave"),
}));

export default useOnlineGame;
