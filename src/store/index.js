import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  board: [],
  attacks: [],
  player: 1,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
