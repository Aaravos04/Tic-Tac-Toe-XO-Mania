import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTime = () => {
    let s = seconds % 60;
    let m = (seconds - s) / 60;

    s = (s < 10 ? "0" : "") + s.toString();
    m = (m < 10 ? "0" : "") + m.toString();
    return m + ":" + s;
  };

  return (
    <div className="h-fit flex items-center justify-center">
      <p className="text-[var(--purple-color)] text-lg font-semibold">{getTime()}</p>
    </div>
  );
};

export default Timer;
