import * as types from './types';

export default {
  [types.SET_PLAYER_TURN](state, payload) {
    state.player = payload;
  },
  [types.INIT_BOARD](state, payload) {
    state.board = payload;
  },
  [types.INIT_ATTACKS](state, payload) {
    state.attacks = payload;
  },
  [types.UPDATE_BOARD](state, payload) {
    state.board = payload;
  },
  [types.UPDATE_ATTACKS](state, payload) {
    state.attacks = payload;
  },
};
