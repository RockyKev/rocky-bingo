<template>
  <textarea
    @change="checkSubmittedData"
    spellcheck="true"
    class="textarea"
    rows="20"
    v-model="submittedData"
  ></textarea>

  <button
    @click="bingoButtonClicked"
    :disabled="!buttonIsEnabled"
    :class="{ 'opacity-60': !buttonIsEnabled }"
    class="primary-button"
  >
    {{ buttonText }}
  </button>
  <button
    @click="shuffleButtonClicked"
    :disabled="!buttonIsEnabled"
    :class="{ 'opacity-60': !buttonIsEnabled }"
    class="primary-button"
  >
    Shuffle
  </button>

  <button
    @click="exportButtonClicked"
    :disabled="!exportButtonIsEnabled"
    :class="{ 'opacity-60': !exportButtonIsEnabled }"
    class="primary-button"
  >
    Export
  </button>

  <input
    v-show="exportInputIsShowing"
    @click="exportInputOnClick"
    v-model="exportInputField"
    placeholder="stuff"
    class="textarea"
  />
</template>

<script>
import { shuffle, encodeDataToURI } from "@/js/shared.js";

export default {
  name: "TextareaField",
  props: {
    restoredData: null,
  },
  data() {
    return {
      buttonIsEnabled: false,
      exportInputIsShowing: false,
      exportInputField: "",
      spaceCount: 0,
      spaceMinimum: 25 - 1,
      submittedData25: [],
      submittedDataArray: [],
      submittedData: `Hamburgers\nSushi\nPancakes\nNoodles\nChocolate\nBlueberries\nSalmon\nBanana\nIce Cream\nHam\nOysters\nMashed potatoes\nSoup\nAsparagus\nSteak\nChicken\nPizza\nWaffles\nBeef\nMozzarella cheese\nBacon\nCorned beef\nAvocado\nPasta\nPineapple\nPeanut Butter`,
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
    // check if there's prop data
    if (typeof this.restoredData === "object") {
      this.submittedData25 = this.restoredData.data25;
      this.submittedDataArray = this.restoredData.dataArray;
      this.submittedData = this.restoredData.data;

      this.checkSubmittedData();
    } else {
      // check default stuff
      this.checkSubmittedData();
    }
  },
  methods: {
    emitToParent(attributeName, value) {
      // emit upwards
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
    bingoButtonClicked() {
      // run it to check the values
      this.checkSubmittedData();

      // update with attribute/value
      this.submittedData25 = this.return25Entries(this.submittedDataArray);

      if (this.submittedData25.length === 25) {
        this.emitToParent("content", this.submittedData25);
      } else {
        console.error("SOMETHING WENT WRONG WITH THE BINGO BUTTON!");
      }
    },
    return25Entries(value) {
      // strip it so only 25 show up
      const newValue = value.length < 25 ? value : value.slice(0, 25);

      // replace number 13
      newValue[12] = "Free Space";

      return newValue;
    },
    shuffleButtonClicked() {
      // update with attribute/value
      this.submittedData25 = this.return25Entries(
        shuffle(this.submittedDataArray)
      );

      this.emitToParent("content", this.submittedData25);
    },
    exportButtonClicked() {
      // show the input
      this.exportInputIsShowing = true;

      // 1 - get all the import data
      const preExportedData = {
        data: this.submittedData,
        dataArray: toRaw(this.submittedDataArray),
        data25: toRaw(this.submittedData25),
      };

      // const baseUrl = 'localhost:3000';
      const baseUrl = window.location.origin;

      // 2 - turn it into a hash
      const base64 = encodeDataToURI(preExportedData);

      console.log("finished baseUri, now exporting to input field");
      this.exportInputField = `${baseUrl}/?src=${base64}`;

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
.textarea {
  @apply block
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
      focus:outline-none;
}

.primary-button {
  @apply inline-block
      px-7
      py-3
      bg-blue-700
      text-white
      font-medium
      text-sm
      leading-snug
      uppercase
      rounded
      shadow-md
      hover:bg-blue-800 hover:shadow-lg
      focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-900 active:shadow-lg
      transition
      duration-150
      ease-in-out;
}
</style>

