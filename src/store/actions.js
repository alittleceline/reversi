import * as types from './types';

// 0 is an empty cell
// 1 is a black piece
// 2 is a white piece
const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]];

export const initGame = ({ commit }, payload) => {
  console.log('initGame');
  commit(types.INIT_BOARD, initialBoard);
  commit(types.INIT_ATTACKS, initialBoard);
  commit(types.SET_PLAYER_TURN, payload);
};

export const updateNextPlayer = ({ commit }, payload) => {
  console.table(payload);
  console.log('updateNextPlayer', payload);
  commit(types.SET_PLAYER_TURN, payload);
};

export const updateBoard = ({ commit }, payload) => {
  console.log('updateBoard');
  commit(types.UPDATE_BOARD, payload);
};

export const updateAttacks = ({ commit }, payload) => {
  console.log('updateAttacks');
  commit(types.UPDATE_ATTACKS, payload);
};
