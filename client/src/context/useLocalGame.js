import { create } from "zustand";
import gameStatus from "../constants/gameStatus";
import { isDraw, isValid, isWinning } from "@tic-tac-toe/shared";

const useLocalGame = create((set, get) => ({
  board: undefined,
  turn: undefined,
  status: gameStatus.INACTIVE,
  players: undefined,

  start: () => {
    set({
      board: Array(9).fill(null),
      turn: "x",
      status: gameStatus.RUNNING,

      players: {
        player: {
          name: "Player X",
          score: 0,
          symbol: "x",
        },
        opponent: {
          name: "Player O",
          score: 0,
          symbol: "o",
        },
      },
    });
  },
  move: (index) => {
    const { status, board, turn } = get();
    if (status !== gameStatus.RUNNING) return;
    if (!isValid(board, index)) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    set({ board: newBoard });

    const win = isWinning(newBoard);
    const draw = isDraw(newBoard);
    if (win || draw) {
      if (win) {
        const {
          players: { player, opponent },
        } = get();
        
        set({
          players: {
            player: {
              ...player,
              score: player.score + (player.symbol === turn),
            },
            opponent: {
              ...opponent,
              score: opponent.score + (opponent.symbol === turn),
            },
          },
        });
      }

      set({
        turn: null,
        status: gameStatus.FINISHED,
      });
    } else {
      set({ turn: turn === "x" ? "o" : "x" });
    }
  },
  rematch: () => {
    set({
      board: Array(9).fill(null),
      turn: "x",
      status: gameStatus.RUNNING,
    });
  },
  leave: () => {
    set({
      board: undefined,
      turn: undefined,
      status: gameStatus.INACTIVE,
      players: undefined,
    });
  },
}));

export default useLocalGame;
