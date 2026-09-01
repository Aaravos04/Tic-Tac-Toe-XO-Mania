import React from "react";

import { FaRobot } from "react-icons/fa6";

const SelectBots = ({ difficulty, setDifficulty }) => {
  return (
    <div className="flex flex-col gap-1.5 text-[var(--primary-text)]">
      <button
        onClick={() => setDifficulty("easy")}
        className={`w-full cursor-pointer px-3.5 py-2.5 border border-[var(--green-color)]/60 rounded-lg flex gap-1.75 items-center ${difficulty === "easy" ? "bg-[var(--green-color)]/6" : "bg-[var(--elevated-card-bg)]"}`}
      >
        <div className="flex items-center justify-center">
          <div className="w-5 aspect-square rounded-full border-2 border-[var(--green-blend-dark)] p-0.5">
            {difficulty === "easy" && (
              <div className="w-full aspect-square rounded-full bg-[var(--green-blend-dark)]" />
            )}
          </div>
        </div>

        <div className="w-12 flex items-center justify-center">
          <FaRobot className="text-3xl text-[var(--green-blend-dark)]" />
        </div>

        <div className="text-left flex-1">
          <p className="text-sm">Easy</p>
          <p className="text-[0.6875rem] text-[var(--secondary-text)]">
            Learns the game
          </p>
        </div>

        <div className="h-fit px-1.5 bg-[var(--green-color)]/30 rounded-sm">
          <p className="text-[0.6875rem] text-[var(--green-blend-dark)]">
            BEGINNER
          </p>
        </div>
      </button>

      <button
        onClick={() => setDifficulty("medium")}
        className={`w-full cursor-pointer px-3.5 py-2.5 border border-[var(--amber-color)]/60 rounded-lg flex items-center gap-1.75 ${difficulty === "medium" ? "bg-[var(--amber-color)]/6" : "bg-[var(--elevated-card-bg)]"}`}
      >
        <div className="flex items-center justify-center">
          <div className="w-5 aspect-square rounded-full border-2 border-[var(--amber-blend-dark)] p-0.5">
            {difficulty === "medium" && (
              <div className="w-full aspect-square rounded-full bg-[var(--amber-blend-dark)]" />
            )}
          </div>
        </div>

        <div className="w-12 flex items-center justify-center">
          <FaRobot className="text-3xl text-[var(--amber-blend-dark)]" />
        </div>

        <div className="text-left flex-1">
          <p className="text-sm">Medium</p>
          <p className="text-[0.6875rem] text-[var(--secondary-text)]">
            Knows basic tactics
          </p>
        </div>

        <div className="h-fit px-1.5 bg-[var(--amber-color)]/30 rounded-sm">
          <p className="text-[0.6875rem] text-[var(--amber-blend-dark)]">
            INTERMEDIATE
          </p>
        </div>
      </button>

      <button
        onClick={() => setDifficulty("hard")}
        className={`w-full cursor-pointer px-3.5 py-2.5 border border-[var(--red-color)]/60 rounded-lg flex gap-1.75 items-center ${difficulty === "hard" ? "bg-[var(--red-color)]/6" : "bg-[var(--elevated-card-bg)]"}`}
      >
        <div className="flex items-center justify-center">
          <div className="w-5 aspect-square rounded-full border-2 border-[var(--red-blend-dark)] p-0.5">
            {difficulty === "hard" && (
              <div className="w-full aspect-square rounded-full bg-[var(--red-blend-dark)]" />
            )}
          </div>
        </div>

        <div className="w-12 flex items-center justify-center">
          <FaRobot className="text-3xl text-[var(--red-blend-dark)]" />
        </div>

        <div className="text-left flex-1">
          <p className="text-sm">Hard</p>
          <p className="text-[0.6875rem] text-[var(--secondary-text)]">
            Never makes mistakes
          </p>
        </div>

        <div className="h-fit px-1.5 bg-[var(--red-color)]/30 rounded-sm">
          <p className="text-[0.6875rem] text-[var(--red-blend-dark)]">
            ADVANCED
          </p>
        </div>
      </button>
    </div>
  );
};

export default SelectBots;
