import * as types from './types';

export default {
  [types.SET_PLAYER_TURN](state, payload) {
    state.player = payload;
    console.log('SET_PLAYER_TURN', state.player);
  },
  [types.INIT_BOARD](state, payload) {
    state.board = payload;
    console.log('INIT_BOARD');
  },
  [types.INIT_ATTACKS](state, payload) {
    state.attacks = payload;
    console.log('INIT_ATTACKS');
  },
  [types.UPDATE_BOARD](state, payload) {
    state.board = payload;
    console.log('UPDATE_BOARD');
  },
  [types.UPDATE_ATTACKS](state, payload) {
    state.attacks = payload;
    console.log('UPDATE_ATTACKS');
  },
};
