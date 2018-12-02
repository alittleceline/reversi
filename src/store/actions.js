import * as types from './types';
import { buildPlayableBoard, buildPlayersTurn } from '../helpers';

export const initBoard = ({ commit }) => {
  // 0 is an empty cell
  // 1 is a white piece
  // 2 is a black piece
  const initialBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]];

  commit(types.INIT_BOARD, initialBoard);
  commit(types.SET_PLAYER_TURN, 1);
};

export const updatePlayersTurn = ({ commit }) => {
  const currentTurn = buildPlayersTurn(this);
  commit(types.SET_PLAYER_TURN, currentTurn);
};

export const updateBoard = ({ commit }) => {
  const currentTurnBoard = buildPlayableBoard(this);
  commit(types.UPDATE_BOARD, currentTurnBoard);
};
