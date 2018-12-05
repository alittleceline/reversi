<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Reversi, player {{ currentPlayer }}'s turn</h1>
    <p>
      <button class="btn" @click="initGame()">Reset board</button>
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

const BOARDSIZE = 8;
const EMPTY = 0;
const P1 = 1;
const P2 = 2;
const PLAYABLE = 3;
const DX = [-1, 0, 1, -1, 1, -1, 0, 1];
const DY = [-1, -1, -1, 0, 0, 1, 1, 1];

export default {
  name: 'App',
  components: {
    GameBoard,
  },
  created() {
    this.initGame(P1);
    this.listValidMoves(this.board, this.player);
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
    checkValidMove(board, player, squareCoord) {
      /** Returns true if the specified player can play a piece at the specified coordinate. */

      // look in each direction from this piece; if we see the other piece color and then one of our
      // own, then this is a legal move
      for (let i = 0; i < DX.length; i += 1) {
        let sawOpponent = false;
        let x = squareCoord.x;
        let y = squareCoord.y;
        for (let d = 0; d < BOARDSIZE; d += 1) {
          x += DX[i];
          y += DY[i];
          // stop when we end up off the board
          if (x < 0 || x > BOARDSIZE || y < 0 || y > BOARDSIZE) {
            break;
          }
          const currentSquare = board[y][x];
          if (currentSquare === 0) {
            break;
          } else if (currentSquare !== player) {
            sawOpponent = true;
          } else if (sawOpponent) return 1;
          else break;
        }
      }
      return 0;
    },
    listValidMoves(board, player) {
      /** Returns all legal plays for the player with the specified color. */
      const movesList = cloneBoard(this.attacks);
      for (let y = 0; y < BOARDSIZE; y += 1) {
        for (let x = 0; x < BOARDSIZE; x += 1) {
          const square = { x, y };
          if (movesList[square.y][square.x] === EMPTY && this.checkValidMove(board, player, square)) {
            movesList[square.y][square.x] = 1;
          }
        }
      }
      this.updateAttacks(movesList);
    },
    dropPlayerPiece(player, pieceX, pieceY) {
      const newBoard = cloneBoard(this.board);
      const newAttacks = cloneBoard(this.attacks);
      if (newAttacks[pieceY][pieceX] === PLAYABLE) {
        newBoard[pieceY][pieceX] = player;
        this.updateBoard(newBoard);
        this.updateAttacks(newBoard);
        this.nextPlayer();
      }
    },
    nextPlayer() {
      const player = this.currentPlayer;
      const next = player === P1 ? P2 : P1;
      this.updateNextPlayer(next);
      console.table(this.board);
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
