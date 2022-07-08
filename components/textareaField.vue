<template>
  <textarea
    @change="handleText"
    spellcheck="true"
    class="
      form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700
      focus:bg-white
      focus:border-blue-600
      focus:outline-none
    "
    rows="20"
    placeholder="Your message"
  ></textarea>

  <button
    @click="doStuff"
    :disabled="!buttonIsEnabled"
    :class=" { 'opacity-60' : !buttonIsEnabled } "
    class="
      inline-block
      px-7
      py-3
      bg-blue-600
      text-white
      font-medium
      text-sm
      leading-snug
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
    "
  >
    {{buttonText}}
  </button>
</template>

<script>
export default {
  name: "TextareaField",
  data() {
    return {
      submittedData: [],
      buttonIsEnabled: false,
      spaceCount: 0,
      spaceMinimum: 3
    };
  },
  props: {
    word: {
      type: String,
      default: "x",
    },
  },
  computed: {
    buttonText() {
      // return text based on count
      if (this.spaceCount < this.spaceMinimum) {
        return "you need " + (this.spaceMinimum - this.spaceCount) + " more"
      } else {
        return "Ready to Bingo!"
      }

    }
  },
  methods: {
    // TODO: get data from submit buttom
    getData() {
      // if less than 15

      console.log("ima clickin'");
    },

    // only enable button when 15 things are added
    handleText(event) {
      console.log(event.target.value);

      let text = event.target.value;

      // count how many commas
      console.log("commaCount", this.spaceCount);
      // this.commaCount = (text.match(/,/g) || []).length;
      this.spaceCount = (text.match(/[^\n]*\n[^\n]*/gi) || []).length

      if (this.spaceCount < this.spaceMinimum) {
        // enable button
        this.submittedData = [];
        this.buttonIsFalse = true;
      } else {
        console.log("we're in comma world!", text);
        this.buttonIsEnabled = true;
        this.submittedData = text.split(/\n/g);

}
    },

    // figure out how to sort it

    // new button to save the data in json

    // new button to share the url of this.

    doStuff() {
      console.log("ima clickin'");
    },

    toggleSelection() {
      this.isSelected = !this.isSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>