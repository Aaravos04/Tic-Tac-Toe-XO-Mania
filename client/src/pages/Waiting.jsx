import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuCopy, LuCheck } from "react-icons/lu";
import { TbBulb } from "react-icons/tb";

import Timer from "../components/Timer.jsx";
import Loader from "../components/Loader.jsx";

import useSocket from "../context/useSocket.js";
import socket from "../socket/socket.js";
import useOnlineGame from "../context/useOnlineGame.js";
import gameStatus from "../constants/gameStatus.js";

const Waiting = ({ type }) => {
  const navigate = useNavigate();
  const { update, gameID } = useSocket();
  const { status } = useOnlineGame();
  const [state, setState] = useState(true);

  const cancelMatch = (redirect) => {
    if (type === "public") {
      socket.emit("match:cancel");
    } else {
      socket.emit("room:leave");
    }

    update({ matchMaking: false });
    if (redirect) navigate("/bots");
  };

  useEffect(() => {
    const isActive = status !== gameStatus.INACTIVE;
    if (isActive) navigate(`/game/online`);
  }, [status]);

  useEffect(() => {
    return () => {
      const currStatus = useSocket.getState().status;
      const isActive = currStatus !== gameStatus.INACTIVE;
      if (!isActive) cancelMatch(false);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-around gap-4 my-1">
      <p className="text-center font-bold text-xl text-[var(--purple-color)]/85">
        {type === "public" ? "FINDING OPPONENT" : "WAITING FOR OPPONENT"}
      </p>

      <Loader />

      <div className="flex flex-col items-center justify-center">
        <p className="mb-1 text-xs text-[var(--secondary-text)] text-center max-w-60">
          {type === "public"
            ? "Searching for an opponent..."
            : "Waiting for your friend to join..."}
        </p>

        {type === "public" ? (
          <Timer />
        ) : (
          <div className="border border-[var(--border-color)] rounded-md flex items-center gap-3 px-3 py-1.5 mt-1.5 text-[var(--secondary-text)]">
            <p>{gameID}</p>
            <div className="border-r h-6 w-1 border-[var(--border-color)]" />

            {state ? (
              <LuCopy
                className="cursor-pointer text-[var(--purple-color)]"
                onClick={() => {
                  navigator.clipboard.writeText(gameID);
                  setState(false);
                  setTimeout(() => setState(true), 1000);
                }}
              />
            ) : (
              <LuCheck className="cursor-pointer" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-2 my-2 mx-4">
        {type === "private" && (
          <div className="w-full flex items-center gap-2 px-2 py-2 rounded-md border border-[var(--border-color)] bg-[var(--elevated-card-bg)]">
            <div className="flex items-center justify-center p-1">
              <TbBulb className="text-3xl text-[var(--purple-blend-dark)]" />
            </div>

            <div>
              <p className="text-[var(--primary-text)] text-xs my-1.25">
                Share this code with a friend.
              </p>
              <p className="text-[var(--secondary-text)] text-xs my-1.25">
                The game starts when someone joins!
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => cancelMatch(false)}
          className="text-red-500/85 border rounded-sm w-full text-sm py-1 cursor-pointer text-center"
        >
          Cancel
        </button>
      </div>

      {type === "public" && (
        <>
          <hr className="text-[var(--border-color)]" />

          <div>
            <p className="mb-2 text-xs text-[var(--secondary-text)] text-center">
              No opponent yet?
            </p>

            <div className="flex items-center justify-center mx-4">
              <button
                onClick={() => cancelMatch(true)}
                className="text-green-500/85 border rounded-sm w-full text-sm py-1 cursor-pointer text-center"
              >
                Play AI Instead
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Waiting;
