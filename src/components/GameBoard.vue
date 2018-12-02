<template name="game-board">
  <div class="gameboard-container">
    <div
      v-for="(row, xKey) in board"
      :key="xKey"
      class="gameboard-row">
      <game-square
        v-for="(item, yKey) in row"
        :key="yKey"
        :value="item"
        class="gameboard-square" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import GameSquare from '@/components/GameSquare';

export default {
  name: 'GameBoard',
  components: {
    GameSquare,
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
.gameboard-container {
  margin: 0 auto;
  max-width: 700px;
}

.gameboard-row {
  display: grid;
  grid-template-columns: repeat(8, 12.5%);
}
</style>
