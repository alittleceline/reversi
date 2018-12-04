<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Reversi, player {{ currentPlayer }}'s turn</h1>
    <p>
      <button class="btn" @click="initGame(), listPossibleMoves(myBoard, 1, 2)">Reset board</button>
      <button class="btn" @click="nextPlayer()">Next</button>
    </p>
    <game-board
      :board="myBoard"
      :attacks="myAttacks" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import GameBoard from '@/components/GameBoard';
import { cloneBoard } from './helpers';

const P1 = 1;
const P2 = 2;

export default {
  name: 'App',
  components: {
    GameBoard,
  },
  created() {
    this.initGame(P1);
  },
  mounted() {
    this.$root.$on('player-played', (payload) => {
      this.dropPlayerPiece(this.currentPlayer, payload.x, payload.y);
    });
  },
  beforeDestroy() {
    this.$root.$off('player-played');
  },
  methods: {
    ...mapActions([
      'initGame',
      'updateBoard',
      'updateAttacks',
      'updateNextPlayer',
    ]),
    dropPlayerPiece(player, pieceX, pieceY) {
      const newBoard = cloneBoard(this.board);
      newBoard[pieceY][pieceX] = player;
      this.updateBoard(newBoard);
      this.nextPlayer();
    },
    nextPlayer() {
      const player = this.currentPlayer;
      const next = player === P1 ? P2 : P1;
      this.updateNextPlayer(next);
    },

  },
  computed: {
    ...mapGetters([
      'board',
      'attacks',
      'player',
    ]),
    myBoard() {
      return cloneBoard(this.board);
    },
    myAttacks() {
      return cloneBoard(this.attacks);
    },
    currentPlayer() {
      return this.player;
    },
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
