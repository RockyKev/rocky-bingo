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
    v-model="submittedData"
  ></textarea>

  <button
    @click="bingoButtonClicked"
    :disabled="!buttonIsEnabled"
    :class="{ 'opacity-60': !buttonIsEnabled }"
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
    {{ buttonText }}
  </button>
  <button
    @click="shuffleButtonClicked"
    :disabled="!buttonIsEnabled"
    :class="{ 'opacity-60': !buttonIsEnabled }"
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
    Shuffle
  </button>

  <button
    @click="exportButtonClicked"
    :disabled="!buttonIsEnabled"
    :class="{ 'opacity-60': !buttonIsEnabled }"
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
    Export
  </button>
</template>

<script>
import { shuffle } from "@/js/shared.js";

export default {
  name: "TextareaField",
  data() {
    return {
      buttonIsEnabled: false,
      spaceCount: 0,
      spaceMinimum: 25,
      submittedData25: [],
      submittedDataArray: [],
      submittedData: `jack
john
sarah
steve
william
spogue
john
sarah
steve
william
john
sarah
steve
william
spogue
john
sarah
steve
william
john
sarah
steve
william
spogue
john
sarah
steve
william
spogue
john
sarah
steve
william
spogue`,
    };
  },
  computed: {
    buttonText() {
      // return text based on count
      if (this.spaceCount < this.spaceMinimum) {
        this.buttonIsEnabled = false;
        return "you need " + (this.spaceMinimum - this.spaceCount) + " more";
      } else {
        this.buttonIsEnabled = true;
        return "Ready to Bingo!";
      }
    },
  },
  mounted() {
    this.checkSubmittedData();
  },
  methods: {
    
    emitToParent(attributeName, value) {
      // emit upwards
      // this.$emit('content', this.submittedDataArray);
      console.log("I've emitted", attributeName);
      console.log(value);
      this.$emit(attributeName, value);
    },

    checkSubmittedData() {
      let text = this.submittedData;

      console.log("commaCount", this.spaceCount);
      this.spaceCount = (text.match(/[^\n]*\n[^\n]*/gi) || []).length;

      if (this.spaceCount < this.spaceMinimum) {
        this.submittedDataArray = [];
      } else {
        // only enable button when 25 things are added
        this.submittedDataArray = text.split(/\n/g);
      }
    },

    // new button to save the data in json

    // new button to share the url of this.

    bingoButtonClicked() {
      // run it to check the values
      this.checkSubmittedData();

      console.log("Before emitting to parent!");
      console.log(this.submittedDataArray);

      // update with attribute/value
      this.submittedData25 = this.return25Entries(this.submittedDataArray);

      if (this.submittedData25.length === 25) {
        this.emitToParent("content", this.submittedData25);
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    },
    return25Entries(value) {
      console.log("return 25 entries starting now")
      console.log("current value")
      console.log(value);
      // strip it so only 15 show up
      const newValue = value.length < 25 ? value : value.splice(0, 25);

      console.log("Before cleaning it up");
      console.log({ newValue });

      // replace number 13
      newValue[12] = "Free Space";

      return newValue;
    },
    shuffleButtonClicked() {
      console.log("this.submittedDataArray", this.submittedDataArray);

      this.submittedDataArray = shuffle(this.submittedDataArray);
      this.emitToParent();
    },
    exportButtonClicked() {
      // 1 - get what's in the content area
      const preExportedData = [this.submittedData, this.submittedDataArray];

      // 2 - turn it into a hash

      // 3 - add it to the URL

      // 4 - it should add a popup saying the link is now in your clipboard.
    },
    toggleSelection() {
      this.isSelected = !this.isSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>