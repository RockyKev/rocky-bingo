<template>
  <textarea
    @change="checkSubmittedData"
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
    :disabled="!exportButtonIsEnabled"
    :class="{ 'opacity-60': !exportButtonIsEnabled }"
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

  <input
    v-show="exportInputIsShowing"
    @click="exportInputOnClick"
    v-model="exportInputField"
    placeholder="stuff"
    class=" form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
  />
</template>

<script>
import {
  shuffle,
  encodeDataToURL,
  encodeBase64,
  decodeBase64,
} from "@/js/shared.js";

// // https://stackoverflow.com/a/68681664/4096078
// import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

export default {
  name: "TextareaField",
  data() {
    return {
      buttonIsEnabled: false,
      exportInputIsShowing: false,
      exportInputField: "",
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
    exportButtonIsEnabled() {
      // check if these all have values
      return this.submittedData25.length &&
        this.submittedDataArray.length &&
        this.submittedData.length
        ? true
        : false;
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
      console.log("return 25 entries starting now");
      console.log("current value");
      console.log(value);
      // strip it so only 25 show up
      const newValue = value.length < 25 ? value : value.slice(0, 25);

      console.log("Before cleaning it up");
      console.log({ newValue });

      // replace number 13
      newValue[12] = "Free Space";

      return newValue;
    },
    shuffleButtonClicked() {
      // check if submitted data is the same

      console.log("this.submittedDataArray", this.submittedDataArray);

      // update with attribute/value
      this.submittedData25 = this.return25Entries(
        shuffle(this.submittedDataArray)
      );

      this.emitToParent("content", this.submittedData25);
    },
    exportButtonClicked() {

      // show the input
      this.exportInputIsShowing = true;

      // 1 - get what's in the content area
      console.log("exporting button now!");

      const preExportedData = {
        data: this.submittedData,
        dataArray: toRaw(this.submittedDataArray),
        data25: toRaw(this.submittedData25),
      };

      console.log(preExportedData);


      const baseUrl = 'localhost:3000';
      // 2 - turn it into a hash
      // console.log(encodeBase64(encodeDataToURL(preExportedData)))
      this.exportInputField = `${baseUrl}/?src=${encodeBase64(encodeDataToURL(preExportedData))}`;
      console.log(this.exportInputField);
      
      // TODO: 3 - it should add a popup saying the link is now in your clipboard.

    },
    exportInputOnClick() {
        // TODO: copy to clipboard

        console.log("ive been clicked!");
    },
    toggleSelection() {
      this.isSelected = !this.isSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>