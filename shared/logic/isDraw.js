import isWinning from "./isWinning.js";

export default (board) => {
    if(isWinning(board)) return false;
    for(let index = 0; index < 9; index++)
        if(board[index] === null) return false;
    return true;
};