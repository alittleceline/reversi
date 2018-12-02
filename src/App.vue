<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>
      <button class="btn" @click="initBoard">Reset board</button>
    </p>
    <game-board />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import GameBoard from '@/components/GameBoard';

export default {
  name: 'App',
  components: {
    GameBoard,
  },
  mounted() {
    this.initBoard();
  },
  methods: {
    ...mapActions([
      'initBoard',
    ]),
  },
  computed: {
    ...mapGetters([
      'board',
    ]),
  },
};
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
