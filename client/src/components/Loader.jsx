import React from "react";

import { motion } from "motion/react";
import { LuLoader } from "react-icons/lu";

import Xmark from "../components/icons/Xmark.jsx";
import Omark from "../components/icons/Omark.jsx";

const Loader = () => {
  return (
    <div className="h-fit flex items-center justify-center relative mx-24 mb-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <LuLoader className="text-[var(--purple-color)] text-6xl drop-shadow-[0_0_3px_var(--purple-color)]" />
      </motion.div>

      <Xmark
        size={7}
        className="absolute text-[var(--blue-color)]/80 left-0 bottom-8"
      />
      <Omark
        size={10}
        className="absolute text-[var(--purple-color)]/80 left-3 bottom-1"
      />
      <Omark
        size={10}
        className="absolute text-[var(--purple-color)]/80 right-4 top-0"
      />
      <Xmark
        size={7}
        className="absolute text-[var(--blue-color)]/80 right-0 top-6"
      />
    </div>
  );
};

export default Loader;
