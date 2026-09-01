import { EventEmitter } from "events";
import { isValid, isDraw, isWinning } from "@tic-tac-toe/shared";

import Player from "./Player.js";

import playerStatus from "../constants/playerStatus.js";
import gameStatus from "../constants/gameStatus.js";

const TURN_TIME = 30000;

class Game extends EventEmitter {
  constructor(gameID) {
    super();

    this.gameID = gameID;
    this.board = Array(9).fill(null);
    this.status = gameStatus.WAITING;

    this.turn = null;
    this.moveTimer = null;
    this.players = [];
  }

  makeMove(index) {
    if (this.status !== gameStatus.RUNNING) return false;
    if (!isValid(this.board, index)) return false;

    clearTimeout(this.moveTimer);
    this.board[index] = this.turn;
    this.moveTimer = null;

    const won = isWinning(this.board);
    const draw = isDraw(this.board);

    if (won || draw) {
      if (won) {
        this.players[0].symbol === this.turn
          ? this.players[0].score++
          : this.players[1].score++;
      }

      this.status = gameStatus.FINISHED;
      this.turn = null;
    } else {
      this.turn = this.turn === "x" ? "o" : "x";
      this.moveTimer = setTimeout(() => this.emit("timeout"), TURN_TIME);
    }

    return true;
  }

  startRound() {
    if (this.status !== gameStatus.WAITING) return false;
    if (this.players.length < 2) return false;
    
    const rand = Math.random();
    this.players[0].symbol = rand < 0.5 ? "x" : "o";
    this.players[1].symbol = rand < 0.5 ? "o" : "x";
    
    this.turn = "x";
    this.status = gameStatus.RUNNING;
    this.board = Array(9).fill(null);
    this.moveTimer = setTimeout(() => this.emit("timeout"), TURN_TIME);
    return true;
  }

  joinGame(socketID) {
    if (this.players.length === 2) return false;
    if (this.getPlayer(socketID)) return false;

    const rejoinKey = crypto.randomUUID();
    const player = new Player(socketID, rejoinKey);

    this.players.push(player);
    return true;
  }

  rejoinGame(socketID, symbol, rejoinKey) {
    const player = this.players.find(
      (p) =>
        p.symbol === symbol &&
        p.rejoinKey === rejoinKey &&
        p.status === playerStatus.DISCONNECTED,
    );

    if (!player) return false;
    player.socketID = socketID;

    clearTimeout(player.disconnectTimer);
    player.disconnectTimer = null;

    player.status = playerStatus.CONNECTED;
    return true;
  }

  leaveGame(socketID) {
    const player = this.getPlayer(socketID);
    if (!player) return false;

    clearTimeout(player.disconnectTimer);
    player.disconnectTimer = null;

    player.rejoinKey = null;
    player.status = playerStatus.LEFT;
    player.rematch = false;
    return true;
  }

  serialize(socketID) {
    return {
      board: this.board,
      status: this.status,
      turn: this.turn,

      players: {
        player: {
          name: "You",
          score: this.players.find((player) => player.socketID === socketID)
            .score,
          symbol: this.players.find((player) => player.socketID === socketID)
            .symbol,
        },
        opponent: {
          name: "Opponent",
          score: this.players.find((player) => player.socketID !== socketID)
            .score,
          symbol: this.players.find((player) => player.socketID !== socketID)
            .symbol,
        },
      },
    };
  }

  getPlayer(socketID) {
    return this.players.find((player) => player.socketID === socketID);
  }

  getOpponent(socketID) {
    if (!this.getPlayer(socketID)) return null;
    return this.players.find((player) => player.socketID !== socketID);
  }
  
  isEmpty() {
    return this.players.every((player) => player.status === playerStatus.LEFT);
  }

  isFull() {
    return (
      this.players.length === 2 &&
      this.players.every((player) => player.status === playerStatus.CONNECTED)
    );
  }
}

export default Game;
