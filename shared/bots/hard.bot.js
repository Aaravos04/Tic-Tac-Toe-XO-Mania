import minimax from "../logic/minimax.js";

export default (board, player) => {
    return minimax(board, 9, player);
};
