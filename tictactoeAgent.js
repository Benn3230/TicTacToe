// Tic Tac Toe
class Agent {
    constructor() {

    }

    minimax(board, isMaximizing) {
        const endCheck = board.gameOver();  // Check if board is full after current move, end game if it is

        if (endCheck === 1) {
            return 1;
        } else if (endCheck === 2) {
            return -1;
        } else if (endCheck === 3) {
            return 0;
        }

        // Best moves start outside possible range
        let bestMin = 2;
        let bestMax = -2;

        // If this player is max/X:
        if (isMaximizing) {

            // Let min have their turn, see if this is good for max...
            for (let i = 1; i <= board.cells.length; i++) {
                const tempBoard = board.clone();
                if (tempBoard.cellFree(i)) {
                    tempBoard.move(i);
                
                    // Recursive call, continue until all cells are filled
                    const newScore = this.minimax(tempBoard, !isMaximizing);    // Other player's turn!

                    // If this path is better than previous best path, update best score
                    if (newScore > bestMax) {
                        bestMax = newScore;
                    }
                }
            }
        // This player is min/O:
        } else {
            // Same code as before, but check for min scores instead of max...
            for (let i = 1; i <= board.cells.length; i++) {
                const tempBoard = board.clone();
                if (tempBoard.cellFree(i)) {
                    tempBoard.move(i);
                
                    const newScore = this.minimax(tempBoard, !isMaximizing);

                    if (newScore < bestMin) {
                        bestMin = newScore;
                    }
                }
            }
        }
        return isMaximizing ? bestMax : bestMin;
    }

    selectMove(board) {
        // Start best moves outside possible range (updated to one of {-1, 0, 1})
        let bestMin = 2;    
        let bestMax = -2;

        // Cell "0" is starting point, outside range (cells go from 1-9)
        let minMove = 0;
        let maxMove = 0;

        const swapPlayer = !board.playerOne;
        
        for (let i = 1; i <= board.cells.length; i++) {
            const tempBoard = board.clone();

            // If cell isn't free, can't make move there, so skip
            if (tempBoard.cellFree(i)) {
                tempBoard.move(i);
                
                // Other player makes their move after, find if this is good for min/max/neither
                const newScore = this.minimax(tempBoard, swapPlayer);

                if (newScore < bestMin) {
                    bestMin = newScore;
                    minMove = i;    // Best move for min (O's) is this cell
                }
                if (newScore > bestMax) {
                    bestMax = newScore;
                    maxMove = i;    // Best move for max (X's) is this cell
                }
            }
        }

        return swapPlayer ? minMove : maxMove;
    }

}