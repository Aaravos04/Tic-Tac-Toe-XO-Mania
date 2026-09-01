import minimax from "../logic/minimax.js";

export default (board, player) => {
    return minimax(board, 2, player);
};
