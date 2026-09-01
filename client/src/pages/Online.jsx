import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { FaLock, FaArrowLeftLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { BsLightningChargeFill } from "react-icons/bs";

import Waiting from "./Waiting.jsx";
import Header from "../components/Header.jsx";

import socket from "../socket/socket.js";
import useSocket from "../context/useSocket.js";
import useOnlineGame from "../context/useOnlineGame.js";
import gameStatus from "../constants/gameStatus.js";

const Online = () => {
  const { matchMaking, update } = useSocket();
  const { status } = useOnlineGame();

  const quickMatch = () => {
    update({ matchMaking: true });
    socket.emit("match:find");
  };

  const isActive = status !== gameStatus.INACTIVE;
  if (isActive) return <Navigate to={"/game/online"} replace />;

  return matchMaking ? (
    <Waiting type={"public"} />
  ) : (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full mb-1.5">
        <Header>PLAY ONLINE</Header>

        <p className="text-center text-xs text-[var(--secondary-text)]">
          Select an online mode
        </p>
      </div>

      <div className="flex flex-col gap-2 text-[var(--primary-text)]">
        <button
          onClick={quickMatch}
          className="w-full cursor-pointer p-4 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex gap-5"
        >
          <div className="aspect-square p-3 bg-[var(--purple-color)]/75 rounded-lg flex items-center justify-center">
            <BsLightningChargeFill className="text-4xl text-[var(--purple-blend-light)]" />
          </div>

          <div className="text-left flex-1 flex flex-col justify-center leading-7">
            <p className="font-semibold">Quick Match</p>
            <p className="text-xs text-[var(--secondary-text)]">
              Find an opponent <br /> automatically
            </p>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward className="text-xl text-[var(--secondary-text)]" />
          </div>
        </button>

        <Link
          to={"/room"}
          className="w-full cursor-pointer p-4 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex gap-5"
        >
          <div className="aspect-square p-3 bg-[var(--blue-color)]/75 rounded-lg flex items-center justify-center">
            <FaLock className="text-3xl text-[var(--blue-blend-light)]" />
          </div>

          <div className="text-left flex-1 flex flex-col justify-center leading-7">
            <p className="font-semibold">Private Room</p>
            <p className="text-xs text-[var(--secondary-text)]">
              Create or join a room <br /> with a code
            </p>
          </div>

          <div className="flex items-center">
            <IoIosArrowForward className="text-xl text-[var(--secondary-text)]" />
          </div>
        </Link>
      </div>

      <Link
        to={"/home"}
        className="w-full flex items-center justify-center gap-2 text-white px-24 py-1 border border-[#2a3037] rounded-md cursor-pointer hover:bg-[var(--elevated-card-bg)] duration-250"
      >
        <FaArrowLeftLong />
        <p>Back</p>
      </Link>
    </div>
  );
};

export default Online;
