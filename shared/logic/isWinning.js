import patterns from '../constants/winningCombinations.js'

export default (board) => {
    for(let i = 0; i < patterns.length; i++) {
        if(
            board[patterns[i][0]] === board[patterns[i][1]] &&
            board[patterns[i][1]] === board[patterns[i][2]] &&
            board[patterns[i][0]] !== null
        )
            return i + 1;
    }

    return false;
};