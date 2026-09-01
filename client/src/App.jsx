import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home.jsx";
import Bots from "./pages/Bots.jsx";
import Online from "./pages/Online.jsx";
import Room from "./pages/Room.jsx";
import NotFound from "./pages/NotFound.jsx";
import { OnlineGame, BotGame, LocalGame } from "./pages/Game.jsx";

import useSocket from "./context/useSocket.js";
import Loading from "./pages/Loading.jsx";

const App = () => {
  const { addListeners, removeListeners } = useSocket();
  useEffect(() => {
    addListeners();
    return removeListeners;
  }, []);

  return (
    <div className="w-full h-screen bg-[var(--main-background)] flex items-center justify-center font-inter">
      <div className="w-96 max-w-full bg-[var(--card-background)] border rounded-xl border-[var(--border-color)] px-6 py-5">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/bots" element={<Bots />} />

          <Route path="/online" element={<Online />} />
          <Route path="/room" element={<Room />} />

          <Route path="/game">
            <Route path="online" element={<OnlineGame />} />

            <Route path="bots">
              <Route path=":difficulty" element={<BotGame />} />
              <Route index element={<Navigate to="/bots" replace />} />
            </Route>
            
            <Route path="local" element={<LocalGame />} />
            <Route index element={<Navigate to="local" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="test" element={<Loading />} />
          <Route path="/" element={<Navigate to={"/home"} replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default App;
