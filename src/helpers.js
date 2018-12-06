// Create a deep copy of an Array (instead of a simple reference)
const cloneBoard = currentBoard => currentBoard.map(arr => arr.slice());

export {
  cloneBoard,
};
