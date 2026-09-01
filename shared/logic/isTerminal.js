import isDraw from "./isDraw.js"
import isWinning from "./isWinning.js"

export default (board) => {
    return isWinning(board) || isDraw(board);
}