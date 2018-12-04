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
import { cloneBoard, getNearbyPieces } from './helpers';

const EMPTY = 0;
const P1 = 1;
const P2 = 2;
const PLAYABLE = 3;

export default {
  name: 'App',
  components: {
    GameBoard,
  },
  created() {
    this.initGame(P1);
    this.listPossibleMoves(this.myAttacks, P1, P2);
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
    listPossibleMoves(board, player, opponent) {
      const movesBoard = cloneBoard(board);
      for (let y = 0; y < board.length; y += 1) {
        for (let x = 0; x < board.length; x += 1) {
          // if square is empty
          if (board[y][x] === EMPTY) {
            // look for opponent pieces around
            const pos = getNearbyPieces(board, x, y, opponent) || null;
            const moveDirection = pos ? this.getDirectionForMove(pos.x, pos.y, (pos.neighborX - pos.x), (pos.neighborY - pos.y)) : null;
            if (pos) {
              console.log('pos', pos);
              console.log('direction', moveDirection);
            }
            const playablePos = pos ? this.checkLineForMove(board, pos, moveDirection, player) : null;
            if (pos) {
              movesBoard[pos.y][pos.x] = PLAYABLE;
            }
          }
        }
      }
      this.updateAttacks(movesBoard);
    },
    getDirectionForMove(positionX, positionY, nextX, nextY) {
      let direction = [];
      // tl : top-left
      if (nextY === -1 && nextX === -1) { direction.push('tl'); }
      // tt : top
      if (nextY === -1 && nextX === 0) { direction.push('tt'); }
      // tr : top-right
      if (nextY === -1 && nextX === 1) { direction.push('tr'); }
      // rr : right
      if (nextY === 0 && nextX === 1) { direction.push('rr'); }
      // br : bottom-right
      if (nextY === 1 && nextX === 1) { direction.push('br'); }
      // bb : bottom
      if (nextY === 1 && nextX === 0) { direction.push('bb'); }
      // bl : bottom-left
      if (nextY === 1 && nextX === -1) { direction.push('bl'); }
      // ll : left
      if (nextY === 0 && nextX === -1) { direction.push('ll'); }
      return direction;
    },
    checkLineForMove(board, position, direction, player) {
      // Direction check : forward or backwards
      const increment = (direction === 'll' || direction === 'tt') ? -1 : 1;
      const nbOfSquares = board.length - position.neighborX + 1;
      let checkedSquare;
      // Horizontal check
      if (direction === 'rr' || direction === 'll') {
        for (let i = 0; i < nbOfSquares; i += 1) {
          const postionBeingChecked = position.neighborX + (i * increment);
          if (board[position.neighborY][postionBeingChecked] === player) {
            checkedSquare = {
              x: position.x,
              y: position.y,
            };
          }
        }
      }
      return checkedSquare;
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
      this.listPossibleMoves(this.board, next, player);
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
