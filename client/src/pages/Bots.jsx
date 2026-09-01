import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaPlay, FaArrowLeftLong } from "react-icons/fa6";

import Header from "../components/Header.jsx";
import SelectBots from "../components/SelectBots.jsx";
import SelectSide from "../components/SelectSide.jsx";

const Bots = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [side, setSide] = useState("?");
  const navigate = useNavigate();

  const startGame = () => {
    const query = side === "?" ? "" : `?side=${side}`;
    navigate(`/game/bots/${difficulty}${query}`);
  };

  return (
    <div className="h-full w-full flex flex-col justify-between gap-3">
      <div className="w-full mb-1">
        <Header>CHOOSE DIFFICULTY</Header>

        <p className="text-center text-xs text-[var(--secondary-text)]">
          Select your opponent's skill level
        </p>
      </div>

      <div>
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--secondary-text)]/60" />
          <p className="text-[0.6875rem] text-[var(--secondary-text)]/60">
            DIFFICULTY
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--secondary-text)]/60 to-transparent" />
        </div>

        <SelectBots difficulty={difficulty} setDifficulty={setDifficulty} />
      </div>

      <div>
        <div className="flex items-center justify-center gap-2 my-1">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--secondary-text)]/60" />
          <p className="text-[0.6875rem] text-[var(--secondary-text)]/60">
            CHOOSE YOUR SIDE
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[var(--secondary-text)]/60 to-transparent" />
        </div>

        <SelectSide side={side} setSide={setSide} />
      </div>

      <div>
        <button
          onClick={startGame}
          className="w-full mt-1 mb-1.5 flex items-center justify-center gap-2 text-[var(--primary-text)] py-1 bg-[var(--green-color)]/75 border border-[var(--green-blend-dark)] rounded-md cursor-pointer hover:bg-[var(--green-color)]/50 duration-250"
        >
          <FaPlay className="text-[var(--green-blend-light)]" />
          <p className="text-sm">Start Game</p>
        </button>

        <Link
          to={"/home"}
          className="flex items-center justify-center gap-2 text-[var(--primary-text)] text-sm py-1 border border-[var(--border-color)] rounded-md cursor-pointer hover:bg-[var(--elevated-card-bg)] duration-250"
        >
          <FaArrowLeftLong />
          <p>Back</p>
        </Link>
      </div>
    </div>
  );
};

export default Bots;
