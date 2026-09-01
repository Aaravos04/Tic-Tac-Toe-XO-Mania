import React from "react";

import Xmark from "./icons/Xmark.jsx";
import Omark from "./icons/Omark.jsx";

const Title = () => {
  return (
    <div className="w-full relative my-2.5">
      <p className="w-full flex justify-center gap-2.5 font-bold text-4xl mb-1.5 font-heading">
        <span className="text-[var(--purple-color)]">TIC</span>
        <span className="text-[var(--primary-text)]">TAC</span>
        <span className="text-[var(--blue-color)]">TOE</span>
      </p>

      <p className="text-center text-sm text-[var(--secondary-text)]">
        Choose your game mode
      </p>

      <Xmark
        size={9}
        className="absolute text-[var(--blue-color)] left-5 top-2"
      />
      <Omark
        size={12}
        className="absolute text-[var(--purple-color)] left-3 bottom-3"
      />
      <Omark
        size={12}
        className="absolute text-[var(--purple-color)] right-5 top-2"
      />
      <Xmark
        size={9}
        className="absolute text-[var(--blue-color)] right-3 bottom-3"
      />
    </div>
  );
};

export default Title;
