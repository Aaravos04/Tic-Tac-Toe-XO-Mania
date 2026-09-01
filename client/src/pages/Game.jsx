import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { isDraw } from "@tic-tac-toe/shared";

import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { TbRefresh } from "react-icons/tb";
import { MdOutlineExitToApp } from "react-icons/md";

import Scoreboard from "../components/Scoreboard.jsx";
import Gameboard from "../components/Gameboard.jsx";
import Loading from "./Loading.jsx";

import gameStatus from "../constants/gameStatus.js";
import useLocalGame from "../context/useLocalGame.js";
import useAIGame from "../context/useAIGame.js";
import useOnlineGame from "../context/useOnlineGame.js";

const Game = ({ useGame }) => {
  const navigate = useNavigate();
  const { board, status, rematch, leave } = useGame();

  const leaveGame = () => {
    navigate("/home");
    leave();
  };

  useEffect(() => {
    if (status === gameStatus.FINISHED) {
      if (isDraw(board)) {
        toast.info("Game Draw!");
      } else {
        const count = board.filter(e => e !== null).length;
        const winner = count % 2 == 0 ? "O" : "X";
        toast.info(`${winner} Won!`);
      }
    }
  }, [status]);

  return (
    <div className="py-1">
      <Scoreboard useGame={useGame} />
      <hr className="text-[#2a3037]" />
      <Gameboard useGame={useGame} />

      <div className="flex gap-2">
        <button
          onClick={rematch}
          className="flex items-center justify-center gap-1.5 flex-1 border rounded-md py-1 text-sm text-purple-500 cursor-pointer"
        >
          <TbRefresh />
          <p>Rematch</p>
        </button>

        <button
          onClick={leaveGame}
          className="flex items-center justify-center gap-1.5 flex-1 border rounded-md py-1 text-sm text-red-500 cursor-pointer"
        >
          <MdOutlineExitToApp />
          <p>Leave Match</p>
        </button>
      </div>
    </div>
  );
};

const OnlineGame = () => {
  const { status } = useOnlineGame();
  const isActive = status !== gameStatus.INACTIVE;

  return isActive ? (
    <Game useGame={useOnlineGame} />
  ) : (
    <Navigate to={"/online"} replace />
  );
};

const BotGame = () => {
  const { difficulty } = useParams();
  const { status, start } = useAIGame();

  const [searchParams] = useSearchParams();
  const side = searchParams.get("side");

  const sides = ["x", "o"];
  const difficulties = ["easy", "medium", "hard"];
  const isActive = status !== gameStatus.INACTIVE;

  useEffect(() => {
    if (!difficulties.includes(difficulty)) return;
    if (side && !sides.includes(side)) return;
    if (!isActive) start(difficulty, side);
  }, [difficulty, side]);

  if (!difficulties.includes(difficulty))
    return <Navigate to={"/bots"} replace />;

  if (side && !sides.includes(side))
    return <Navigate to={`/game/bots/${difficulty}`} replace />;

  return isActive ? <Game useGame={useAIGame} /> : <Loading />;
};

const LocalGame = () => {
  const { status, start } = useLocalGame();
  const isActive = status !== gameStatus.INACTIVE;

  useEffect(() => {
    if (!isActive) start();
  }, []);

  return isActive ? <Game useGame={useLocalGame} /> : <Loading />;
};

export { OnlineGame, BotGame, LocalGame };
