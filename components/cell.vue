<template>
  <button
    @click="toggleSelection"
    @keydown.enter="toggleSelection"
    :class="{ selected: isSelected }"
  >
    {{ this.word }}
  </button>
</template>

<script>
export default {
  name: "CellButton",
  data() {
    return {
      isSelected: false,
    };
  },
  props: {
    word: {
      type: String,
      default: "x",
    },
  },
  methods: {
    toggleSelection() {
      this.isSelected = !this.isSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  border: 5px solid red;
  border-radius: 35px;
  //   min-width: 75px;
  //   min-height: 75px;
  //   width: 100px;
  //   height: 100px;
  width: 100%;
  height: 100%;
  padding: 20px;

  background: transparent;
  transition: all 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);

    &.hover {
    background: blue;
  }


  &.selected {
    background: pink;
  }
  &:focus {
    border-color: orange;
    outline: 0;
  }
}
</style>