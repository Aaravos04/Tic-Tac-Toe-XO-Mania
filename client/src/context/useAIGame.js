import { create } from "zustand";
import { easyBot, hardBot, mediumBot } from "@tic-tac-toe/shared";
import { isDraw, isValid, isWinning } from "@tic-tac-toe/shared";
import gameStatus from "../constants/gameStatus";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const bots = {
  easy: easyBot,
  medium: mediumBot,
  hard: hardBot,
};

const useAIGame = create((set, get) => ({
  board: undefined,
  turn: undefined,
  status: gameStatus.INACTIVE,
  players: undefined,

  difficulty: undefined,
  side: undefined,

  start: (difficulty, side) => {
    if (!side) side = "?";
    if (!["easy", "medium", "hard"].includes(difficulty)) return;
    if (!["x", "o", "?"].includes(side)) return;

    const playerSymbol =
      side === "?" ? (Math.random() < 0.5 ? "x" : "o") : side;
    const opponentSymbol = playerSymbol === "x" ? "o" : "x";

    set({
      board: Array(9).fill(null),
      turn: "x",
      status: gameStatus.RUNNING,

      difficulty,
      side: side ? side : "?",

      players: {
        player: {
          name: "You",
          score: 0,
          symbol: playerSymbol,
        },
        opponent: {
          name: "Bot",
          score: 0,
          symbol: opponentSymbol,
        },
      },
    });

    const { players, turn, botsMove } = get();
    const botsTurn = players.opponent.symbol === turn;
    if (botsTurn) botsMove();
  },
  move: (index) => {
    const { status, board, turn, players } = get();
    if (status !== gameStatus.RUNNING) return;
    if (turn !== players.player.symbol) return;
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
            player: { ...player, score: player.score + 1 },
            opponent: { ...opponent },
          },
        });
      }

      set({
        turn: null,
        status: gameStatus.FINISHED,
      });
    } else {
      set({ turn: turn === "x" ? "o" : "x" });
      get().botsMove();
    }
  },
  rematch: () => {
    set({
      board: Array(9).fill(null),
      turn: "x",
      status: gameStatus.RUNNING,
    });

    const { side } = get();
    if (side === "?" && Math.random() < 0.5) {
      const {
        players: { player, opponent },
      } = get();

      set({
        players: {
          player: { ...player, symbol: opponent.symbol },
          opponent: { ...opponent, symbol: player.symbol },
        },
      });
    }

    const { players, turn, botsMove } = get();
    const botsTurn = players.opponent.symbol === turn;
    if (botsTurn) botsMove();
  },
  leave: () => {
    set({
      board: undefined,
      turn: undefined,
      status: gameStatus.INACTIVE,
      players: undefined,
      difficulty: undefined,
    });
  },
  botsMove: async () => {
    await sleep(1000);
    const { board, turn, status, difficulty, players } = get();
    if (status !== gameStatus.RUNNING) return;
    if (turn !== players.opponent.symbol) return;

    const bot = bots[difficulty];
    const index = bot(board, turn);

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
            player: { ...player },
            opponent: { ...opponent, score: opponent.score + 1 },
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
}));

export default useAIGame;
