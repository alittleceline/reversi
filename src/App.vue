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
      let pos = [];
      let moveDirectionList = [];
      for (let y = 0; y < board.length; y += 1) {
        for (let x = 0; x < board.length; x += 1) {
          // if square is empty
          if (board[y][x] === EMPTY) {
            // look for opponent pieces around
            pos = getNearbyPieces(board, x, y, opponent) || null;
            if (pos.length > 0) {
              moveDirectionList = pos.map(item => this.getDirectionForMove(item));
              const playablePos = moveDirectionList.length > 0 ? this.checkLineForMove(board, moveDirectionList, player) : null;
            }
            if (moveDirectionList.length > 0) {
              console.log('moveDirectionList', moveDirectionList);
              //   movesBoard[pos.y][pos.x] = PLAYABLE;
            }
          }
        }
      }
      this.updateAttacks(movesBoard);
    },
    getDirectionForMove(item) {
      const nextY = item.neighborY - item.y;
      const nextX = item.neighborX - item.x;
      let move = item;
      // tl : top-left
      if (nextY === -1 && nextX === -1) { move.direction = 'tl'; }
      // tt : top
      if (nextY === -1 && nextX === 0) { move.direction = 'tt'; }
      // tr : top-right
      if (nextY === -1 && nextX === 1) { move.direction = 'tr'; }
      // rr : right
      if (nextY === 0 && nextX === 1) { move.direction = 'rr'; }
      // br : bottom-right
      if (nextY === 1 && nextX === 1) { move.direction = 'br'; }
      // bb : bottom
      if (nextY === 1 && nextX === 0) { move.direction = 'bb'; }
      // bl : bottom-left
      if (nextY === 1 && nextX === -1) { move.direction = 'bl'; }
      // ll : left
      if (nextY === 0 && nextX === -1) { move.direction = 'll'; }
      return move;
    },
    checkLineForMove(board, moves, player) {
      let checkedSquare;
      const horizontalMoves = moves.filter(move => {
        return move.direction === 'll' || move.direction === 'rr';
        // // Direction check : forward or backwards
        // const increment = (dir === 'll' || dir === 'tt') ? -1 : 1;
        // const nbOfSquares = board.length - (position.x + 1);
        // // Horizontal check
        // if (dir === 'rr' || dir === 'll') {
        //   for (let i = 0; i < nbOfSquares; i += 1) {
        //     const postionBeingChecked = position.neighborX + (i * increment);
        //     if (board[position.x][postionBeingChecked] === player) {
        //       checkedSquare = {
        //         x: position.x,
        //         y: position.y,
        //       };
        //     }
        //   }
        // }
      });
      console.log('horizontalMoves', horizontalMoves);
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
