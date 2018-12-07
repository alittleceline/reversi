<template>
  <div id="app">
    <h1 v-text="'Reversi'" />
    <h2 v-if="!gameStopped">{{ currentPlayersColor }} player's turn</h2>
    <section :class="{'layer': !gameStopped && impossibleTurns}">
      <p
        v-if="gameStopped"
        v-text="'Game over! Restart?'" />
      <p
        v-if="!gameStopped && impossibleTurns"
        v-text="'No moves available, please pass.'" />
      <div>
        <button
          v-text="'Restart game'"
          class="btn"
          :class="{'btn-main': (!gameStopped && impossibleTurns)}"
          @click="restart()" />
        <button
          v-if="!gameStopped && impossibleTurns"
          v-text="'Pass'"
          class="btn"
          :class="{'btn-main': (!gameStopped && impossibleTurns)}"
          @click="pass()" />
      </div>
    </section>
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
    pass() {
      this.nextPlayer();
      const list = this.listValidMoves(this.myBoard, this.player);
      this.checkIfPlayable(list.hasValidMoves);
      this.updateAttacks(list.validMoves);
    },
    listValidMoves(board, player) {
      // Returns all legal plays for the player with the specified color
      let hasValidMoves = false;
      const validMoves = cloneBoard(board);
      for (let y = 0; y < BOARDSIZE; y += 1) {
        for (let x = 0; x < BOARDSIZE; x += 1) {
          const square = { x, y };
          if (validMoves[square.y][square.x] === EMPTY && checkValidMove(board, player, square)) {
            validMoves[square.y][square.x] = PLAYABLE;
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
        this.updateBoard(attack);
        const next = this.player === P1 ? P2 : P1;
        // if valid moves are available, player can play, switch to next player's turn
        const list = this.listValidMoves(attack, next);
        this.updateAttacks(list.validMoves);
        this.checkIfPlayable(list.hasValidMoves);
        this.nextPlayer();
      }
    },
    checkIfPlayable(hasMoves) {
      if (hasMoves && this.impossibleTurns < 2) {
        this.impossibleTurns = 0;
      // if player can not play: remember it!
      } else if (!hasMoves && this.impossibleTurns < 2) {
        this.impossibleTurns += 1;
      // if next player can not play either: game over!
      } else {
        this.gameStopped = true;
      }
      // if no more empty space: game over!
      if (this.playerPiecesCounter(P1) + this.playerPiecesCounter(P2) === BOARDSIZE * BOARDSIZE) {
        this.gameStopped = true;
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

<style lang="scss">
@import './assets/reset';

body {
  --color: white;
  --bg-color: black;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  position: relative;
  text-align: center;
}

.btn {
  display: inline-block;
  color: var(--bg-color);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--bg-color);
  flex: 0 0 auto;
  font-size: 16px;
  line-height: 1.3;
  padding: 0.55rem 0.75rem;
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
}

.layer {
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;

  p {
    color: var(--color);
  }

  .btn {
    border-color: var(--color);
    color: var(--color);
  }

  .btn-main {
    background: var(--color);
    color: var(--bg-color);
    border-color: var(--color);
  }
}

</style>
