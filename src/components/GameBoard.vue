<template name="game-board">
  <div class="gameboard-container">
    <div
      v-for="(row, yKey) in board"
      :key="yKey"
      class="gameboard-row">
      <game-square
        v-for="(item, xKey) in row"
        :key="xKey"
        :value="item"
        :is-attackable="attacks[yKey][xKey]"
        class="gameboard-square"
        @click.native="$root.$emit('player-played', { x: xKey, y: yKey })" />
    </div>
  </div>
</template>

<script>
import GameSquare from '@/components/GameSquare';

export default {
  name: 'GameBoard',
  components: {
    GameSquare,
  },
  props: {
    board: {
      type: Array,
      required: true,
    },
    attacks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.gameboard-container {
  margin: 0 auto;
  max-width: 700px;
}

.gameboard-row {
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
}
</style>
