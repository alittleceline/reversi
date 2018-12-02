import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  board: [],
};

console.log(getters);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
