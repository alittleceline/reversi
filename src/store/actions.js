import * as types from './types';
import { P1 } from '../helpers';

// 0 is an empty cell
// 1 is a black piece
// 2 is a white piece
// 3 is an attackable cell
const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]];

const attackBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]];

export const initGame = ({ commit }) => {
  commit(types.INIT_BOARD, initialBoard);
  commit(types.INIT_ATTACKS, attackBoard);
  commit(types.SET_PLAYER_TURN, P1);
};

export const updateNextPlayer = ({ commit }, payload) => {
  commit(types.SET_PLAYER_TURN, payload);
};

export const updateBoard = ({ commit }, payload) => {
  commit(types.UPDATE_BOARD, payload);
};

export const updateAttacks = ({ commit }, payload) => {
  commit(types.UPDATE_ATTACKS, payload);
};
