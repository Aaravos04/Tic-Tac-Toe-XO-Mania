import React from "react";

import useGame from "../context/useGame";

const StatusBar = () => {
  const {} = useGame();

  return (
    <div className="flex items-center justify-center gap-2 my-3 text-xs">

    </div>
  );
};

export default StatusBar;
