

<template>
  <main>
    <PageHeader></PageHeader>

    <!-- TODO: Add navbar -->

    <div class="flex" :class="{ 'show-sidebar': !sidebarOpen }">
      <div
        class="
          board
          col-span-3
          grid grid-cols-5 grid-rows-5
          gap-2
          p-4
          duration-300
        "
      >
        <BingoCell
          :word="item"
          v-for="(item, index) in words"
          :key="`word-${index}`"
        />
      </div>

      <aside class="sidebar flex-shrink-0 relative duration-300 pl-4">
        <button
          class="
            absolute
            -left-8
            top-64
            rotate-90
            bg-slate-100
            p-1
            rounded-sm
            button-border
          "
          @click="sidebarOpen = !sidebarOpen"
        >
          Sidebar
        </button>

        <!-- <div class="h-64 bg-gray-900"></div> -->
        <!-- <nav class="flex-1 flex flex-col bg-white">
          <a href="#" class="p-2">Nav Link 1</a>
          <a href="#" class="p-2">Nav Link 2</a>
          <a href="#" class="p-2">Nav Link 3</a>
        </nav> -->

        <TextareaField :restored-data="restoredData" @content="getContent" />
      </aside>

      <!-- <div class="sidebar">
         add shuffle button -->
      <!-- add a-z button -->

      <!-- </div>  -->
    </div>
  </main>
</template>

<script>
import BingoCell from "@/components/BingoCell.vue";
import TextareaField from "@/components/TextareaField.vue";
import PageHeader from "./components/PageHeader.vue";
import { shuffle, decodeURIToData } from "@/js/shared.js";

export default {
  name: "App",
  components: { BingoCell, TextareaField, PageHeader },
  data() {
    return {
      restoredData: "",
      sidebarOpen: false,
      words: [
        "Lighthouse",
        "Primary color",
        "sans-serif",
        "SEO",
        "graphic profile",
        "secondary color",
        "color wheel",
        "UI/UX",
        "gitmoji",
        "React",
        "Vue",
        "Sass",
        "Free Space",
        "Photoshop",
        "Figma",
        "pull request",
        "API",
        "a11y",
        "Internet Explorer",
        "WordPress",
        "Heroku",
        "HTML",
        "router",
        "responsive",
        "agile",
      ],
    };
  },

  methods: {
    // TODO: Get the url string

    // shuffle(array) {
    //   let currentIndex = array.length;
    //   let randomIndex;
    //   while (currentIndex !== 0) {
    //     randomIndex = Math.floor(Math.random() * currentIndex);
    //     // eslint-disable-next-line no-plusplus
    //     currentIndex--;
    //     // And swap it with the current element.
    //     // eslint-disable-next-line no-param-reassign
    //     [array[currentIndex], array[randomIndex]] = [
    //       array[randomIndex],
    //       array[currentIndex],
    //     ];
    //   }
    //   return array;
    // },
    getContent(value) {
      console.log(
        "I'm getting the content from the child! Passing it over to this.words"
      );
      console.log({ value });
      this.words = value;
    },
  },
  created() {
    console.log("App been mounted", this.words);

    if (this.$route.query.src) {
      console.log("data found. Decoding data!");
      const uriParam = decodeURIToData(this.$route.query.src);
      console.log("finished decodeURIToData");

      // pass this to sidebar
      console.log(uriParam);
      this.restoredData = uriParam;
      console.log("data successfully restored");

      // pass this to current data
      this.words = this.restoredData.data25;
    }

    this.words = shuffle(this.words);
    console.log("App been shuffled", this.words);
    console.log(this.$route.query.src);
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  // overflow-x: hidden; /* Hide vertical scrollbar */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.board {
  // margin: 30px auto;
  border: 3px solid black;
  // padding: 15px;
  border-radius: 5px;
  // display: flex;
  // flex-wrap: wrap;
  justify-content: space-evenly;
  // gap: 20px;
  // width: 140 * 5px;
  flex-shrink: 0;
  flex-basis: 99%;
}

.sidebar {
  flex-basis: 1%;

  .button-border {
    $border: solid lightgray 1px;
    border-bottom: $border;
    border-left: $border;
    border-right: $border;
  }
}

.show-sidebar {
  .board {
    flex-shrink: 0;
    flex-basis: 75%;
  }

  .sidebar {
    flex-basis: 25%;
  }
}
</style>
