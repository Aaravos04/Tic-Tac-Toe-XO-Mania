import React from "react";

import Xmark from "../components/icons/Xmark.jsx";
import Omark from "../components/icons/Omark.jsx";
import { LuHouse } from "react-icons/lu";
import { Link } from "react-router-dom";
import { SiGhostery } from "react-icons/si";

const NotFound = () => {
  return (
    <div>
      <div className="w-full relative my-2.5">
        <p className="w-full flex justify-center gap-2.5 font-bold text-6xl mb-1.5 font-heading">
          <span className="text-[var(--purple-color)]">4</span>
          <span className="text-[var(--primary-text)]">0</span>
          <span className="text-[var(--blue-color)]">4</span>
        </p>

        <Xmark
          size={9}
          className="absolute text-[var(--blue-color)] left-15 top-2"
        />
        <Omark
          size={12}
          className="absolute text-[var(--purple-color)] left-12 bottom-2"
        />
        <Omark
          size={12}
          className="absolute text-[var(--purple-color)] right-12 top-2"
        />
        <Xmark
          size={9}
          className="absolute text-[var(--blue-color)] right-15 bottom-2"
        />
      </div>

      <div className="flex items-center justify-center">
        <p className="text-center text-xs text-[var(--secondary-text)] max-w-50">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 my-5 mx-4">
        <hr className="flex-1 text-[var(--border-color)]" />
        <Xmark size={9} className="text-[var(--purple-color)]" />
        <Omark size={12} className="text-[var(--primary-text)]" />
        <Xmark size={9} className="text-[var(--blue-color)]" />
        <hr className="flex-1 text-[var(--border-color)]" />
      </div>

      <div className="flex flex-col justify-center gap-2 my-2 mx-4">
        <div className="w-full flex items-center gap-2.5 px-4 py-2 rounded-md border border-[var(--border-color)] bg-[var(--elevated-card-bg)]">
          <div className="flex items-center justify-center p-1">
            <SiGhostery className="text-3xl text-[var(--primary-text)]" />
          </div>

          <div>
            <p className="text-[var(--primary-text)] text-xs my-1.25">
              Looks like this move leads nowhere.
            </p>
            <p className="text-[var(--secondary-text)] text-xs my-1.25">
              Let's get you back on the board.
            </p>
          </div>
        </div>

        <Link
          to={"/home"}
          className="flex items-center justify-center text-sm gap-2 px-12 py-1.5 text-[var(--primary-text)] border border-[var(--border-color)] rounded-md hover:bg-[var(--elevated-card-bg)] duration-250"
        >
          <LuHouse />
          <p>Go Home</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
