<template>
  <div id="app">
    <h1 v-text="'Reversi'" />
    <h2>{{ currentPlayersColor }} player's turn</h2>
    <p
      v-if="gameStopped"
      v-text="'Game over! Restart?'" />
    <p
      v-if="!gameStopped && impossibleTurns"
      v-text="'No moves available, please pass.'" />
    <p>
      <button
        v-text="'Restart game'"
        class="btn"
        @click="restart()" />
      <button
        v-if="!gameStopped && impossibleTurns"
        v-text="'Pass'"
        class="btn"
        @click="nextPlayer()" />
    </p>
    <p> black pieces: {{ playerPiecesCounter(playerOne) }}, white pieces: {{ playerPiecesCounter(playerTwo) }}</p>
    <game-board
      :board="myBoard"
      :attacks="myAttacks" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import GameBoard from '@/components/GameBoard';
import {
  BOARDSIZE,
  EMPTY,
  PLAYABLE,
  P1,
  P2,
  cloneBoard,
  getEmptyBoard,
  checkValidMove,
  applyMove,
} from './helpers';

export default {
  name: 'App',
  data() {
    return {
      impossibleTurns: 0,
      gameStopped: false,
    };
  },
  components: {
    GameBoard,
  },
  created() {
    this.restart();
  },
  mounted() {
    this.$root.$on('player-played', (payload) => {
      this.play(this.myBoard, this.currentPlayer, payload);
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
    restart() {
      this.initGame();
      const list = this.listValidMoves(this.myBoard, this.player);
      this.updateAttacks(list.validMoves);
    },
    listValidMoves(board, player) {
      // Returns all legal plays for the player with the specified color
      let hasValidMoves = false;
      const validMoves = getEmptyBoard();
      for (let y = 0; y < BOARDSIZE; y += 1) {
        for (let x = 0; x < BOARDSIZE; x += 1) {
          const square = { x, y };
          if (validMoves[square.y][square.x] === EMPTY && checkValidMove(board, player, square)) {
            validMoves[square.y][square.x] = 3;
            hasValidMoves = true;
          }
        }
      }
      return { hasValidMoves, validMoves };
    },
    play(board, player, coord) {
      const newAttacks = cloneBoard(this.myAttacks);
      // only allow click on playable squares
      if (newAttacks[coord.y][coord.x] === PLAYABLE) {
        const attack = applyMove(board, player, coord);
        console.log('applyMove', attack);
        this.updateBoard(attack);
        const next = this.player === P1 ? P2 : P1;
        // if valid moves are available, player can play, switch to next player's turn
        const list = this.listValidMoves(attack, next);
        if (list.hasValidMoves && this.impossibleTurns < 2) {
          this.updateAttacks(list.validMoves);
          this.impossibleTurns = 0;
          this.nextPlayer();
        // if player can not play: remember it!
        } else if (!list.hasValidMoves && this.impossibleTurns < 2) {
          this.impossibleTurns += 1;
        // if next player can not play either: game over!
        } else {
          this.gameStopped = true;
        }
      }
    },
    nextPlayer() {
      const next = this.player === P1 ? P2 : P1;
      this.updateNextPlayer(next);
    },
    playerPiecesCounter(player) {
      return this.myBoard.reduce((acc, line) => acc + line.filter(item => item === player).length, 0);
    },

  },
  computed: {
    ...mapGetters([
      'board',
      'attacks',
      'player',
    ]),
    playerOne() {
      return P1;
    },
    playerTwo() {
      return P2;
    },
    myBoard() {
      return cloneBoard(this.board);
    },
    myAttacks() {
      return cloneBoard(this.attacks);
    },
    currentPlayer() {
      return this.player;
    },
    currentPlayersColor() {
      return this.currentPlayer === P1 ? 'black' : 'white';
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
