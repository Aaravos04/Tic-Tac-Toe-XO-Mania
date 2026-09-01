import React from "react";
import { Link } from "react-router-dom";

import { FaUserFriends } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";

import Title from "../components/Title.jsx";
import useOnlineGame from "../context/useOnlineGame.js";
import gameStatus from "../constants/gameStatus.js";

const Home = () => {
  const { status } = useOnlineGame();
  const isActive = status !== gameStatus.INACTIVE;
  return (
    <div className="w-full py-1 aspect-square flex flex-col justify-between">
      <Title />
      <div className="flex flex-col gap-2 text-[var(--primary-text)]">
        <Link
          to={"/online"}
          className="w-full cursor-pointer p-2 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex gap-4"
        >
          <div className="w-12 aspect-square p-1.5 bg-[var(--purple-color)]/75 rounded-lg flex items-center justify-center">
            <TbWorld className="text-3xl text-[var(--purple-blend-light)]" />
          </div>

          <div className="text-left flex-1 flex flex-col justify-center">
            <p className="font-semibold">
              {isActive ? "Continue Playing" : "Play Online"}
            </p>
            
            <p className="text-xs text-[var(--secondary-text)]">
              Match with players worldwide
            </p>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward className="text-xl text-[var(--secondary-text)]" />
          </div>
        </Link>

        <Link
          to={"/bots"}
          className="w-full cursor-pointer p-2 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex gap-4"
        >
          <div className="w-12 aspect-square p-1.5 bg-[var(--green-color)]/75 rounded-lg flex items-center justify-center">
            <FaRobot className="text-3xl text-[var(--green-blend-light)]" />
          </div>

          <div className="text-left flex-1 flex flex-col justify-center">
            <p className="font-semibold">Play AI</p>
            <p className="text-xs text-[var(--secondary-text)]">
              Challenge the computer
            </p>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward className="text-xl text-[var(--secondary-text)]" />
          </div>
        </Link>

        <Link
          to={"/game/local"}
          className="w-full cursor-pointer p-2 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex gap-4"
        >
          <div className="w-12 aspect-square p-1.5 bg-[var(--amber-color)]/75 rounded-lg flex items-center justify-center">
            <FaUserFriends className="text-3xl text-[var(--amber-blend-light)]" />
          </div>

          <div className="text-left flex-1 flex flex-col justify-center">
            <p className="font-semibold">Local Match</p>
            <p className="text-xs text-[var(--secondary-text)]">
              Play with a friend on one device
            </p>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward className="text-xl text-[var(--secondary-text)]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
