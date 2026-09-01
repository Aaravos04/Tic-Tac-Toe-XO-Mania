import React from "react";

import Xmark from "./icons/Xmark.jsx";
import Omark from "./icons/Omark.jsx";

import { BsQuestionLg } from "react-icons/bs";

const SelectSide = ({ side, setSide }) => {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => setSide("x")}
        className={`py-1.5 flex flex-col flex-1 gap-1 items-center justify-center border rounded-md ${side === "x" ? "text-[var(--purple-color)]/80 bg-[var(--purple-color)]/8" : "text-[var(--purple-color)]/50"}`}
      >
        <div className="h-8 aspect-square flex items-center justify-center">
          <Xmark size={23} />
        </div>

        <p className="text-[0.6875rem] flex gap-1 items-center justify-center">
          Play as
          <Xmark size={8} />
        </p>
      </button>

      <button
        onClick={() => setSide("?")}
        className={`py-1.5 flex flex-col flex-1 gap-1 items-center justify-center border rounded-md ${side === "?" ? "text-[var(--primary-text)]/80 bg-[var(--primary-text)]/8" : "text-[var(--primary-text)]/50"}`}
      >
        <div className="h-8 aspect-square flex items-center justify-center">
          <BsQuestionLg size={31} />
        </div>
        <p className="text-[0.6875rem]">Random</p>
      </button>

      <button
        onClick={() => setSide("o")}
        className={`py-1.5 flex flex-col flex-1 gap-1 items-center justify-center border rounded-md ${side === "o" ? "text-[var(--blue-color)]/80 bg-[var(--blue-color)]/8" : "text-[var(--blue-color)]/50"}`}
      >
        <div className="h-8 aspect-square flex items-center justify-center">
          <Omark size={27} />
        </div>

        <p className="text-[0.6875rem] flex gap-1 items-center justify-center">
          Play as
          <Omark size={10} />
        </p>
      </button>
    </div>
  );
};

export default SelectSide;
