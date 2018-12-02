import * as types from './types';

export default {
  [types.INIT_BOARD](state, payload) {
    const currentState = state;
    currentState.board = payload;
  },
  [types.SET_PLAYER_TURN](state, payload) {
    const currentState = state;
    currentState.player = payload;
  },
  [types.UPDATE_BOARD](state, payload) {
    const currentState = state;
    currentState.board = payload;
  },
};
