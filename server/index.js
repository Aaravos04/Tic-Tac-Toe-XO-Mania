import express from "express";
import http from "http";
import cors from "cors";

import { Server } from "socket.io";
import { config } from "dotenv";

import ioHandler from "./socket.js";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "https://tic-tac-toe-xo-mania.netlify.app/",
  },
});

app.use(cors());
app.use(express.json());

ioHandler(io);
config();

app.get("/", (req, res) => {
  res.send("Welcome to Tic-Tac-Toe API!");
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.`);
});
