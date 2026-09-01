import React from "react";

import Xmark from "./icons/Xmark";
import Omark from "./icons/Omark";

const Scoreboard = ({ useGame }) => {
  const { players } = useGame();

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex flex-1 gap-3 items-center justify-start">
        <div className="w-9 border text-[var(--purple-color)] aspect-square rounded-full flex items-center justify-center">
          {players.player.symbol === "x" ? (
            <Xmark size={14} />
          ) : (
            <Omark size={17} />
          )}
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-white text-xs">{players.player.name}</p>

          {players.player.symbol === "x" ? (
            <Xmark size={10} className="text-[var(--purple-color)]" />
          ) : (
            <Omark size={13} className="text-[var(--purple-color)]" />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-[var(--secondary-text)] text-[10px] pb-0.5">SCORE</p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-bold text-[var(--purple-color)]">
            {players.player.score}
          </p>
          <p className="text-[var(--secondary-text)] text-2xl font-black">:</p>
          <p className="text-2xl font-bold text-[var(--blue-color)]">
            {players.opponent.score}
          </p>
        </div>
      </div>

      <div className="flex flex-1 gap-3 items-center justify-end">
        <div className="flex flex-col items-end gap-1">
          <p className="text-white text-xs">{players.opponent.name}</p>

          {players.player.symbol === "o" ? (
            <Xmark size={10} className="text-[var(--blue-color)]" />
          ) : (
            <Omark size={13} className="text-[var(--blue-color)]" />
          )}
        </div>

        <div className="w-9 border text-[var(--blue-color)] aspect-square rounded-full flex items-center justify-center">
          {players.player.symbol === "o" ? (
            <Xmark size={14} />
          ) : (
            <Omark size={17} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
