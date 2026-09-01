import React from "react";
import { motion } from "motion/react";

const WinningLines = ({ index }) => {
  return [
    <motion.div
      animate={{ width: [0, "14rem"] }}
      className="h-1 absolute z-20 rounded-md bg-white/85 mx-2 top-7.5"
    />,

    <motion.div
      animate={{ width: [0, "14rem"] }}
      className="h-1 absolute z-20 rounded-md bg-white/85 mx-2 top-23.5"
    />,

    <motion.div
      animate={{ width: [0, "14rem"] }}
      className="h-1 absolute z-20 rounded-md bg-white/85 mx-2 top-39.5"
    />,

    <motion.div
      animate={{ height: [0, "11rem"] }}
      className="w-1 absolute z-20 rounded-md bg-white/85 my-2 left-9.5"
    />,

    <motion.div
      animate={{ height: [0, "11rem"] }}
      className="w-1 absolute z-20 rounded-md bg-white/85 my-2 left-29.5"
    />,

    <motion.div
      animate={{ height: [0, "11rem"] }}
      className="w-1 absolute z-20 rounded-md bg-white/85 my-2 left-49.5"
    />,

    <motion.div
      animate={{
        width: [0, "16.5rem"],
        left: ["1.075rem", "-0.75rem"],
        top: ["0.825rem", "5.875rem"],
      }}
      className="h-1 absolute z-20 rounded-md bg-white/85 rotate-38"
    />,

    <motion.div
      animate={{
        width: [0, "16.5rem"],
        right: ["1.075rem", "-0.75rem"],
        top: ["0.825rem", "5.875rem"],
      }}
      className="h-1 absolute z-20 rounded-md bg-white/85 -rotate-38"
    />,
  ][index];
};

export default WinningLines;
