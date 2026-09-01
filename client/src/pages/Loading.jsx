import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

import Xmark from "../components/icons/Xmark";
import Omark from "../components/icons/Omark";

const board = ["x", null, "o", null, "x", null, "o", null, "x"];

const Loading = () => {
  return (
    <div className="py-6">
      <div className="flex items-center justify-center">
        <div className="grid grid-rows-3 grid-flow-col relative border rounded-3xl w-fit z-0 board">
          {board.map((item, index) => {
            return (
              <div
                key={index}
                className="h-16 aspect-square z-10 flex items-center justify-center"
              >
                {item === "x" ? (
                  <Xmark
                    size={27}
                    className="text-[var(--purple-color)] drop-shadow-[0px_0px_4px_var(--purple-color)]"
                  />
                ) : item === "o" ? (
                  <Omark
                    size={33}
                    className="text-[var(--blue-color)] drop-shadow-[0px_0px_4px_var(--blue-color)]"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}

          <div className="h-16 w-full absolute border-t border-b border-[var(--horizontal-lines)]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="w-16 h-full absolute border-r border-l border-[var(--horizontal-lines)]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      <div className="py-4 flex items-center justify-center gap-4">
        {[...Array(3)].map((_, idx) => (
          <motion.div
            key={idx}
            className="h-2 aspect-square rounded-full"
            animate={{
              // opacity: [0.25, 1, 0.25],
              scale: [1, 1.3, 1],
              backgroundColor: ["#8b5cf6", "#4d8dff", "#8b5cf6"],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: idx * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <p className="text-2xl text-[var(--secondary-text)] text-center">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
