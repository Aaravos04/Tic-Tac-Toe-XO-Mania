import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import Header from "../components/Header";
import useSocket from "../context/useSocket";
import socket from "../socket/socket";
import useOnlineGame from "../context/useOnlineGame";
import gameStatus from "../constants/gameStatus";
import Loading from "./Loading";
import Waiting from "./Waiting";

const Room = () => {
  const [roomIDinput, setRoomIDinput] = useState("");
  const { matchMaking, waiting, update } = useSocket();
  const { status } = useOnlineGame();

  const createRoom = () => {
    update({ waiting: true });
    socket.emit("room:create");
  };

  const joinRoom = () => {
    if (roomIDinput.length !== 6) return;
    update({ waiting: true, gameID: roomIDinput });
    socket.emit("room:join", roomIDinput);
  };

  const isActive = status !== gameStatus.INACTIVE;
  if (isActive) return <Navigate to={"/game/online"} replace />;
  if (waiting) return <Loading />;
  if (matchMaking) return <Waiting type={"private"} />;

  return (
    <div className="w-full flex flex-col justify-around gap-4">
      <div className="w-full mb-1.5">
        <Header>PRIVATE ROOM</Header>

        <p className="text-center text-xs text-[var(--secondary-text)]">
          Create a new room or join with a code
        </p>
      </div>

      <div className="flex flex-col gap-2 text-[var(--primary-text)]">
        <div className="w-full p-3 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex flex-col">
          <div className="flex gap-4">
            <div className="aspect-square p-3 rounded-lg flex items-center justify-center">
              <FaUserFriends className="text-4xl text-[var(--green-color)]/75" />
            </div>

            <div className="text-left flex-1 flex flex-col justify-center leading-7">
              <p className="font-semibold text-[var(--green-color)]">
                CREATE ROOM
              </p>
              <p className="text-xs w-36 text-[var(--secondary-text)]">
                Create a new room and share the code
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={createRoom}
              className="text-[var(--primary-text)] w-full py-1 bg-[var(--green-color)]/75 border border-[var(--green-blend-dark)] rounded-md cursor-pointer text-sm"
            >
              Create Room
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[var(--border-color)]">
          <hr className="flex-1" />
          <p className="font-medium text-sm">OR</p>
          <hr className="flex-1" />
        </div>

        <div className="w-full p-3 bg-[var(--elevated-card-bg)] border border-[var(--border-color)] rounded-lg flex flex-col">
          <div className="flex gap-4">
            <div className="aspect-square p-3 rounded-lg flex items-center justify-center">
              <GiExitDoor className="text-4xl text-[var(--blue-color)]" />
            </div>

            <div className="text-left flex-1 flex flex-col justify-center leading-7">
              <p className="font-semibold text-[var(--blue-color)]">
                JOIN ROOM
              </p>
              <p className="text-xs w-36 text-[var(--secondary-text)]">
                Enter the room code to join a friend
              </p>
            </div>
          </div>

          <div className="flex mt-3 gap-2">
            <input
              type="text"
              placeholder="Enter code"
              value={roomIDinput}
              onChange={(e) => {
                if (e.target.value.length <= 6)
                  setRoomIDinput(e.target.value.toUpperCase());
              }}
              className="border border-[var(--border-color)] bg-[var(--input-background)] rounded-md px-3 outline-none py-1 text-sm"
            />

            <button
              onClick={joinRoom}
              className="flex-1 text-[var(--primary-text)] px-3 py-1 bg-[var(--blue-color)]/75 border border-[var(--blue-blend-dark)] rounded-md cursor-pointer text-sm"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <Link
        to={"/online"}
        className="w-full flex items-center justify-center gap-2 text-[var(--primary-text)] px-24 py-1 border border-[#2a3037] rounded-md cursor-pointer hover:bg-[var(--elevated-card-bg)] duration-250"
      >
        <FaArrowLeftLong />
        <p>Back</p>
      </Link>
    </div>
  );
};

export default Room;
