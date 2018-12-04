// Create a deep copy of an Array (instead of a simple reference)
const cloneBoard = currentBoard => currentBoard.map(arr => arr.slice());


// List empty squares near players' pieces
const getNearbyPieces = (board, positionX, positionY, opponent) => {
  let availableSquare;

  // check each square around current position
  for (let nextY = -1; nextY < 2; nextY += 1) {
    for (let nextX = -1; nextX < 2; nextX += 1) {
      const nearbyX = positionX + (1 * nextX);
      const nearbyY = positionY + (1 * nextY);

      // as lons as we're in board's limits
      if ((nearbyX >= 0 && nearbyX < board.length) && (nearbyY >= 0 && nearbyY < board.length)) {
        if (board[nearbyX][nearbyY] === opponent) {
          availableSquare = {
            x: positionX,
            y: positionY,
            neighborX: nearbyX,
            neighborY: nearbyY,
          };
        }
      }
    }
  }
  return availableSquare;
};


export {
  cloneBoard,
  getNearbyPieces,
};
