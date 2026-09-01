import isDraw from "./isDraw.js";
import patterns from "../constants/winningCombinations.js";

const values = [2, 1, 2, 1, 3, 1, 2, 1, 2];

export default (board, player) => {
  if (isDraw(board)) return 0;

  for (let index = 0; index < patterns.length; index++) {
    if (
      board[patterns[index][0]] === board[patterns[index][1]] &&
      board[patterns[index][1]] === board[patterns[index][2]] &&
      board[patterns[index][0]] !== null
    )
      return board[patterns[index][0]] === player ? 1000 : -1000;
  }

  let score = 0;
  for (let index = 0; index < 9; index++) {
    if (board[index] === null) continue;
    score += board[index] === player ? values[index] : -values[index];
  }

  return score;
};
