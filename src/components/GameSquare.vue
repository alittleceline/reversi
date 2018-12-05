<template name="game-square">
  <div :class="squareState" />
</template>

<script>
export default {
  name: 'GameSquare',
  props: {
    value: {
      type: Number,
      required: true,
    },
    isAttackable: {
      type: Number,
      required: true,
    },
  },
  computed: {
    squareState() {
      let state = 'empty';
      if (this.isAttackable === 1) {
        state = 'playable';
      }
      if (this.value === 1) {
        state = 'black';
      }
      if (this.value === 2) {
        state = 'white';
      }
      return state;
    },
  },
};
</script>

<style lang="scss">
.gameboard-square {
  --square-padding: 5%;

  background-color: #23613e;
  box-shadow: 0 0 0 1px grey;
  padding-top: 100%;
  position: relative;

  &::after {
    background-color: transparent;
    border-radius: 50%;
    bottom: var(--square-padding);
    content: "";
    display: block;
    left: var(--square-padding);
    position: absolute;
    right: var(--square-padding);
    top: var(--square-padding);
  }
}

.black {
  &::after {
    background-color: black;
  }
}

.white {
  &::after {
    background-color: white;
  }
}

.playable {
  cursor: pointer;

  &::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
