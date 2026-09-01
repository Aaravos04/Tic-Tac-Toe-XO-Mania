import { create } from "zustand";
import socket from "../socket/socket.js";
import useOnlineGame from "./useOnlineGame.js";
import { toast } from "react-toastify";
import gameStatus from "../constants/gameStatus.js";

const useSocket = create((set) => ({
  gameID: null,
  matchMaking: false,
  waiting: false,

  update: (updates) => {
    set({ ...updates });
  },

  addListeners: () => {
    socket.on("game:start", (state) => {
      useOnlineGame.getState().update(state);
    });

    socket.on("game:update", (state) => {
      useOnlineGame.getState().update(state);
    });

    socket.on("opponent:left", () => {
      toast.info("Opponent left the room!");
    });

    socket.on("rematch:accepted", (state) => {
      useOnlineGame.getState().update(state);
    });

    socket.on("rematch:requested", () => {
      toast.info("Rematch requested!");
    });

    socket.on("match:found", (state) => {
      set({
        gameID: state.data.gameID,
        matchMaking: false,
      });

      useOnlineGame.getState().update(state.game);
    });

    socket.on("match:cancelled", () => {
      set({ matchMaking: false });
    });

    socket.on("room:created", ({ gameID }) => {
      set({ gameID, waiting: false, matchMaking: true });
    });

    socket.on("room:joined", () => {
      set({ waiting: false });
    });

    socket.on("room:left", () => {
      set({ gameID: null });
      useOnlineGame.getState().update({
        board: undefined,
        turn: undefined,
        status: gameStatus.INACTIVE,
        players: undefined,
      });
    });

    socket.on("room:error", (message) => {
      set({ gameID: null, matchMaking: false, waiting: false });
      toast.error(message);
    });
  },

  removeListeners: () => {
    socket.off("game:start");
    socket.off("game:update");
    socket.off("opponent:left");

    socket.off("rematch:accepted");
    socket.off("rematch:requested");

    socket.off("match:found");
    socket.off("match:cancelled");

    socket.off("room:created");
    socket.off("room:joined");
    socket.off("room:left");
    socket.off("room:error");
  },
}));

export default useSocket;
