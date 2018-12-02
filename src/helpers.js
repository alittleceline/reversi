// Calculate playable squares

const buildPlayableBoard = (currentBoard) => {
  return currentBoard;
};

const buildPlayersTurn = (currentPlayer) => {
  return currentPlayer === 1 ? 2 : 1;
};

export {
  buildPlayableBoard,
  buildPlayersTurn,
};
