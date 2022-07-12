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
  border: 5px solid lightcoral; // TODO: This color sucks
  border-radius: 35px;
  width: 100%;
  padding: 20px;

  background: transparent;
  transition: all 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86);

  &.hover {
    background: blue;
  }

  &.selected {
    background: lightgreen;
    border-color: darkcyan;
  }
  &:focus {
    border-color: blue;
    border-width: 6px;
    outline: 0;
  }
}
</style>