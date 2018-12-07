// Constants
const BOARDSIZE = 8;
const EMPTY = 0;
const P1 = 1;
const P2 = 2;
const PLAYABLE = 3;
const DX = [-1, 0, 1, -1, 1, -1, 0, 1];
const DY = [-1, -1, -1, 0, 0, 1, 1, 1];

// Functions
// Create a deep copy of an Array (instead of a simple reference)
const cloneBoard = currentBoard => currentBoard.map(arr => arr.slice());

// Assign a 'reset' array for possible moves
const getEmptyBoard = () => ([
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]]);

// Return PLAYABLE if the specified player can play a piece at the specified coordinate
const checkValidMove = (board, player, squareCoord) => {
  // look in each direction from here; if we see the opponent color and then player's color
  for (let i = 0; i < DX.length; i += 1) {
    let sawOpponent = false;
    let x = squareCoord.x;
    let y = squareCoord.y;
    let currentSquare = 0;
    for (let d = 0; d < BOARDSIZE; d += 1) {
      x += DX[i];
      y += DY[i];
      // stop when we end up off the board
      if (x < 0 || x >= BOARDSIZE || y < 0 || y >= BOARDSIZE) {
        break;
      }
      currentSquare = board[y][x];
      if (currentSquare === 0) {
        break;
      } else if (currentSquare !== player) {
        sawOpponent = true;
      } else if (sawOpponent) return PLAYABLE;
      else break;
    }
  }
  return 0;
};

// Return an array with the new board pieces
const applyMove = (board, player, squareCoord) => {
  const movesBoard = cloneBoard(board);
  const opponent = player === P1 ? P2 : P1;
  // place this piece into the game state
  let toFlip = [{ y: squareCoord.y, x: squareCoord.x }];

  // determine where this piece captures other pieces
  for (let i = 0; i < DX.length; i += 1) {
    // look in this direction for captured pieces
    let y = squareCoord.y;
    let x = squareCoord.x;
    for (let dir = 0; dir < BOARDSIZE; dir += 1) {
      y += DY[i];
      x += DX[i];
      // stop when we end up off the board
      if (x < 0 || x >= BOARDSIZE || y < 0 || y >= BOARDSIZE) {
        break;
      }
      const piece = board[y][x];
      if (piece === EMPTY) {
        // Reset toFlip to just click coords
        toFlip = [{ y: squareCoord.y, x: squareCoord.x }];
        break;
      } else if (piece === opponent) {
        toFlip.push({ y, x });
      } else {
        toFlip.forEach((element) => {
          movesBoard[element.y][element.x] = player;
        });
      }
    }
  }
  // reset squares to check
  toFlip = [];
  return movesBoard;
};

export {
  BOARDSIZE,
  EMPTY,
  P1,
  P2,
  PLAYABLE,
  DX,
  DY,
  cloneBoard,
  checkValidMove,
  applyMove,
  getEmptyBoard,
};
