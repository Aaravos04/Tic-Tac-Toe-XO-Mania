export default (board, position) => {
    if(position < 0 || position > 9) return false;
    return board[position] === null;
};