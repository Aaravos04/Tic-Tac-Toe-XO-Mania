import evaluate from "./evaluate.js";
import isTerminal from "./isTerminal.js";
import isValid from "./isValid.js";

const apply = (board, player, index) => {
  const result = [...board];
  result[index] = player;
  return result;
};

const opponent = (player) => (player === "x" ? "o" : "x");

const minimax = (board, depth, maxPlayer, currentPlayer) => {
  if (isTerminal(board) || depth === 0)
    return [evaluate(board, maxPlayer), null];

  const maximize = currentPlayer === maxPlayer;

  let bestScore = maximize ? -Infinity : Infinity;
  let bestHeuristic = maximize ? -Infinity : Infinity;
  let bestMove = null;

  for (let index = 0; index < 9; index++) {
    if (!isValid(board, index)) continue;

    const nextBoard = apply(board, currentPlayer, index);

    const [score] = minimax(
      nextBoard,
      depth - 1,
      maxPlayer,
      opponent(currentPlayer)
    );

    const heuristic = evaluate(nextBoard, maxPlayer);

    if (maximize) {
      if (
        score > bestScore ||
        (score === bestScore && heuristic > bestHeuristic)
      ) {
        bestScore = score;
        bestHeuristic = heuristic;
        bestMove = index;
      }
    } else {
      if (
        score < bestScore ||
        (score === bestScore && heuristic < bestHeuristic)
      ) {
        bestScore = score;
        bestHeuristic = heuristic;
        bestMove = index;
      }
    }
  }

  return [bestScore, bestMove];
};

export default (board, depth, player) => {
  return minimax(board, depth, player, player)[1];
};