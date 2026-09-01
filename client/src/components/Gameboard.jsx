import React from "react";
import { motion } from "motion/react";

import { isWinning } from "@tic-tac-toe/shared";

import WinningLines from "./WinningLines.jsx";

import Xmark from "./icons/Xmark.jsx";
import Omark from "./icons/Omark.jsx";

const Gameboard = ({ useGame }) => {
  const { board, move, players: { player } } = useGame();
  return (
    <div className="flex items-center justify-center mt-4 mb-3">
      <div className="grid grid-cols-3 grid-rows-3 relative border border-[var(--horizontal-lines)] rounded-xl">
        {board.map((item, index) => {
          return item === null ? (
            <button
              key={index}
              className="h-16 w-20 aspect-square z-10"
              onClick={() => move(index)}
            ></button>
          ) : (
            <motion.div
              animate={{ scale: [0, 1] }}
              key={index}
              className="h-16 w-20 aspect-square z-10 flex items-center justify-center"
            >
              {item === "x" ? (
                <Xmark size={27} className={player.symbol === "x" ? "text-[var(--purple-color)]" : "text-[var(--blue-color)]"} />
              ) : item === "o" ? (
                <Omark size={33} className={player.symbol === "x" ? "text-[var(--blue-color)]" : "text-[var(--purple-color)]"} />
              ) : (
                ""
              )}
            </motion.div>
          );
        })}

        <div className="h-16 w-full absolute border-t border-b border-[var(--horizontal-lines)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-20 h-full absolute border-r border-l border-[var(--horizontal-lines)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        
        {isWinning(board) && (
          <WinningLines index={isWinning(board) - 1} />
        )}
      </div>
    </div>
  );
};

export default Gameboard;
