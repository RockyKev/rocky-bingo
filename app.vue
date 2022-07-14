

<template>
  <main>
    <PageHeader></PageHeader>

    <div class="flex" :class="{ 'show-sidebar': !sidebarOpen }">
      <div class="gameboard duration-300" ref="gameboard">
        <div
          class="board col-span-3 grid grid-cols-5 grid-rows-5 gap-2 p-4 h-full"
        >
          <!-- 25 bingo cells-->
          <BingoCell
            :word="item"
            v-for="(item, index) in words"
            :override="false"
            :key="`word-${index}`"
          />
        </div>
        <div class="lower-links mt-4">
          <!-- <a @click="uncheckAll">Uncheck All</a> | -->
          <!-- TODO: Uncheck all feature-->
          <a @click="exportToPDF">Export to PDF</a> |
          <label>Prefill with:</label>
          <select @change="prefillSelect($event)">
            <option value="tv_westworld_s4_ep1">
              WestWorld Season 4 Intro
            </option>
            <option value="tv_obiwan_s1">Obi Wan Series</option>
            <option value="etc_office">In a meeting</option>
          </select>
        </div>
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

        <TextareaField :restored-data="restoredData" @content="getContent" />
      </aside>
    </div>

    <!-- TODO: Put about page here-->
    <div v-show="isAboutShowing" class="about-content">COMING SOON</div>
  </main>
</template>

<script>
import BingoCell from "@/components/BingoCell.vue";
import TextareaField from "@/components/textareaField.vue";
import PageHeader from "./components/PageHeader.vue";
import { shuffle, decodeURIToData } from "@/js/shared.js";

export default {
  name: "App",
  components: { BingoCell, TextareaField, PageHeader },
  data() {
    return {
      restoredData: "",
      sidebarOpen: false,
      isAboutShowing: false,
      words: [
        "Hamburgers",
        "Banana",
        "Mozzarella cheese",
        "Free Space",
        "Noodles",
        "Pizza",
        "Ham",
        "Blueberries",
        "Mashed potatoes",
        "Pasta",
        "Pancakes",
        "Corned beef",
        "Avocado",
        "Steak",
        "Bacon",
        "Oysters",
        "Waffles",
        "Pineapple",
        "Chicken",
        "Salmon",
        "Chocolate",
        "Sushi",
        "Asparagus",
        "Beef",
        "Ice Cream",
      ],
    };
  },

  methods: {
    exportToPDF() {
      // https://stackoverflow.com/a/24825130/4096078

      const domElement = this.$refs.gameboard;
      this.$domToImage(domElement);
    },
    fillWith(event) {
      const selected = event;

      const jsObject = decodeURIToData(selected);

      // pass this to sidebar
      this.restoredData = jsObject;

      // pass this to current data
      this.words = this.restoredData.data25;
      console.log("clicked fillWith", selected);
    },
    prefillSelect(event) {
      // TODO: this should come from a JSON file
      const importedData = {
        tv_westworld_s4_ep1:
          "JTdCJTIyZGF0YSUyMiUzQSUyMk1hZXZlJTIwbWVudGlvbnMlMjBkYXVnaHRlciU1Q25NYWV2ZSUyMGhhY2tzJTIwc29tZXRoaW5nJTVDbk1hZXZlJTIwbmV3JTIwc3VwZXJwb3dlciU1Q25TbmFya3klMjBjb21tZW50JTIwYnklMjBTdHViYnMlNUNuV2lsbGlhbSUyMGRvZXMlMjBiYWQlMjB0aGluZ3MlNUNuJTVDJTIyVGhlc2UlMjB2aW9sZW50JTIwZGVsaWdodHMuLi4uJTVDJTIyJTVDbkRvbG9yZXMlMjBuZXclMjBvdXRmaXQlMjAlNUNuRG9sb3JlcyUyMHNhdmVzJTIwdGhlJTIwZGF5JTVDbldpbGxpYW0lMjBnb2VzJTIwYWdhaW5zdCUyMERvbG9yZXMlNUNuQ2FsZWIlMjBpcyUyMHJlY2tsZXNzJTVDbkZ1dHVyZSUyMHRlY2glMjBTaG93biU1Q25DeWJlcnB1bmslMjBtb21lbnQlNUNuRmFtb3VzJTIwc29uZyUyQyUyMFdlc3R3b3JsZC1yZW1peGVkJTVDbk5ldyUyMFdvcmxkJTVDbkFJJTIwZ29lcyUyMGNyYXp5JTVDbkNvbnNjaW91c25lc3MlMjBxdWVzdGlvbiU1Q25Gb3JkJTIwc2hvd3MlMjB1cCUyMHRvJTIwdGVsbCUyMGElMjB0YWxlJTVDblNvbWVvbmUlMjBzYXlzJTIwYSUyMEFjdGlvbiUyMEhlcm8lMjBsaW5lJTVDblNhbXVyYWklMjBTd29yZCU1Q250aGUlMjBodW1hbiUyMGlzJTIwYWN0dWFsbHklMjBhJTIwaG9zdCU1Q25mbGFzaGJhY2slMjB0byUyMFNlYXNvbiUyMDElNUNuTXVsdGlwbGUlMjBEb2xvcmVzJTVDblNob2d1bndvcmxkJTIwdnMlMjBXZXN0V29ybGQlNUNuSHVtYW4lMjBIb3N0JTIwcm9tYW5jZSUyMHNjZW5lJTVDbldpbGxpYW0lMjBtZWV0cyUyMGZhbWlseSUyMGFnYWluJTIyJTJDJTIyZGF0YUFycmF5JTIyJTNBJTVCJTIyTWFldmUlMjBtZW50aW9ucyUyMGRhdWdodGVyJTIyJTJDJTIyTWFldmUlMjBoYWNrcyUyMHNvbWV0aGluZyUyMiUyQyUyMk1hZXZlJTIwbmV3JTIwc3VwZXJwb3dlciUyMiUyQyUyMlNuYXJreSUyMGNvbW1lbnQlMjBieSUyMFN0dWJicyUyMiUyQyUyMldpbGxpYW0lMjBkb2VzJTIwYmFkJTIwdGhpbmdzJTIyJTJDJTIyJTVDJTIyVGhlc2UlMjB2aW9sZW50JTIwZGVsaWdodHMuLi4uJTVDJTIyJTIyJTJDJTIyRG9sb3JlcyUyMG5ldyUyMG91dGZpdCUyMCUyMiUyQyUyMkRvbG9yZXMlMjBzYXZlcyUyMHRoZSUyMGRheSUyMiUyQyUyMldpbGxpYW0lMjBnb2VzJTIwYWdhaW5zdCUyMERvbG9yZXMlMjIlMkMlMjJDYWxlYiUyMGlzJTIwcmVja2xlc3MlMjIlMkMlMjJGdXR1cmUlMjB0ZWNoJTIwU2hvd24lMjIlMkMlMjJDeWJlcnB1bmslMjBtb21lbnQlMjIlMkMlMjJGYW1vdXMlMjBzb25nJTJDJTIwV2VzdHdvcmxkLXJlbWl4ZWQlMjIlMkMlMjJOZXclMjBXb3JsZCUyMiUyQyUyMkFJJTIwZ29lcyUyMGNyYXp5JTIyJTJDJTIyQ29uc2Npb3VzbmVzcyUyMHF1ZXN0aW9uJTIyJTJDJTIyRm9yZCUyMHNob3dzJTIwdXAlMjB0byUyMHRlbGwlMjBhJTIwdGFsZSUyMiUyQyUyMlNvbWVvbmUlMjBzYXlzJTIwYSUyMEFjdGlvbiUyMEhlcm8lMjBsaW5lJTIyJTJDJTIyU2FtdXJhaSUyMFN3b3JkJTIyJTJDJTIydGhlJTIwaHVtYW4lMjBpcyUyMGFjdHVhbGx5JTIwYSUyMGhvc3QlMjIlMkMlMjJmbGFzaGJhY2slMjB0byUyMFNlYXNvbiUyMDElMjIlMkMlMjJNdWx0aXBsZSUyMERvbG9yZXMlMjIlMkMlMjJTaG9ndW53b3JsZCUyMHZzJTIwV2VzdFdvcmxkJTIyJTJDJTIySHVtYW4lMjBIb3N0JTIwcm9tYW5jZSUyMHNjZW5lJTIyJTJDJTIyV2lsbGlhbSUyMG1lZXRzJTIwZmFtaWx5JTIwYWdhaW4lMjIlNUQlMkMlMjJkYXRhMjUlMjIlM0ElNUIlMjJNYWV2ZSUyMG1lbnRpb25zJTIwZGF1Z2h0ZXIlMjIlMkMlMjJNYWV2ZSUyMGhhY2tzJTIwc29tZXRoaW5nJTIyJTJDJTIyTWFldmUlMjBuZXclMjBzdXBlcnBvd2VyJTIyJTJDJTIyU25hcmt5JTIwY29tbWVudCUyMGJ5JTIwU3R1YmJzJTIyJTJDJTIyV2lsbGlhbSUyMGRvZXMlMjBiYWQlMjB0aGluZ3MlMjIlMkMlMjIlNUMlMjJUaGVzZSUyMHZpb2xlbnQlMjBkZWxpZ2h0cy4uLi4lNUMlMjIlMjIlMkMlMjJEb2xvcmVzJTIwbmV3JTIwb3V0Zml0JTIwJTIyJTJDJTIyRG9sb3JlcyUyMHNhdmVzJTIwdGhlJTIwZGF5JTIyJTJDJTIyV2lsbGlhbSUyMGdvZXMlMjBhZ2FpbnN0JTIwRG9sb3JlcyUyMiUyQyUyMkNhbGViJTIwaXMlMjByZWNrbGVzcyUyMiUyQyUyMkZ1dHVyZSUyMHRlY2glMjBTaG93biUyMiUyQyUyMkN5YmVycHVuayUyMG1vbWVudCUyMiUyQyUyMkZyZWUlMjBTcGFjZSUyMiUyQyUyMk5ldyUyMFdvcmxkJTIyJTJDJTIyQUklMjBnb2VzJTIwY3JhenklMjIlMkMlMjJDb25zY2lvdXNuZXNzJTIwcXVlc3Rpb24lMjIlMkMlMjJGb3JkJTIwc2hvd3MlMjB1cCUyMHRvJTIwdGVsbCUyMGElMjB0YWxlJTIyJTJDJTIyU29tZW9uZSUyMHNheXMlMjBhJTIwQWN0aW9uJTIwSGVybyUyMGxpbmUlMjIlMkMlMjJTYW11cmFpJTIwU3dvcmQlMjIlMkMlMjJ0aGUlMjBodW1hbiUyMGlzJTIwYWN0dWFsbHklMjBhJTIwaG9zdCUyMiUyQyUyMmZsYXNoYmFjayUyMHRvJTIwU2Vhc29uJTIwMSUyMiUyQyUyMk11bHRpcGxlJTIwRG9sb3JlcyUyMiUyQyUyMlNob2d1bndvcmxkJTIwdnMlMjBXZXN0V29ybGQlMjIlMkMlMjJIdW1hbiUyMEhvc3QlMjByb21hbmNlJTIwc2NlbmUlMjIlMkMlMjJXaWxsaWFtJTIwbWVldHMlMjBmYW1pbHklMjBhZ2FpbiUyMiU1RCU3RA==",
        tv_obiwan_s1:
          "JTdCJTIyZGF0YSUyMiUzQSUyMkhpZ2glMjBHcm91bmQlNUNuVGFsayUyMGFib3V0JTIwU2FuZCU1Q25OZXclMjBjb2xvciUyMGxpZ2h0c2FiZXIlNUNuWW9kYSUyMGd1ZXN0JTIwYXBwZWFyYW5jZSU1Q25BJTIwTWFuZGFsb3JpYW4lMjBhcHBlYXJzJTVDbk9iaS13YW4lMjBmaWdodHMlMjBWYWRlciU1Q25KZWRpJTIwTWluZCUyMFRyaWNrJTVDbk9iaS13YW4lMjB1c2VzJTIwYSUyMHdlYXBvbiU1Q25OZXclMjBjaGFyYWN0ZXIlMjBtYWRlJTIwanVzdCUyMHRvJTIwYmVjb21lJTIwYSUyMHRveSU1Q25PcmRlciUyMDY2JTIwZmxhc2hiYWNrJTVDblF1aS1nb24lMjBKaW5uJTIwJTVDbkJhY3RhdGFuayUyMCU1Q25BbGllbiUyMHNwZWFraW5nJTIwYWxpZW4lNUNuQ29tcGV0ZW50JTIwU3Rvcm0lMjB0cm9vcGVyJTVDblVuY2xlJTIwT3dlbiUyRkF1bnQlMjBCZXJ1JTVDbldlJTIwbmVlZCUyMHlvdSUyME9iaS13YW4hJTVDbm1lZXRpbmclMjBvdGhlciUyMEplZGklNUNubmV3JTIwSmVkaSUyMHBvd2VyJTVDbkFuYWtpbidzJTIwbGlnaHRzYWJlciU1Q25PYmktd2FuJTIwY3JpZXMlNUNuQ2xvbmVzJTVDblBhZG1lJTIwZmxhc2hiYWNrJTVDblBvbGl0aWNzJTIwdGFsayU1Q25JbnF1aXNpdG9ycyUyMHBsYXklMjBkaXJ0eSU1Q25CYWNrc3RhYmJpbmclMjBieSUyMFNpdGglNUNuUmlkaW5nJTIwYmlnJTIwYmVhc3QlMjIlMkMlMjJkYXRhQXJyYXklMjIlM0ElNUIlMjJIaWdoJTIwR3JvdW5kJTIyJTJDJTIyVGFsayUyMGFib3V0JTIwU2FuZCUyMiUyQyUyMk5ldyUyMGNvbG9yJTIwbGlnaHRzYWJlciUyMiUyQyUyMllvZGElMjBndWVzdCUyMGFwcGVhcmFuY2UlMjIlMkMlMjJBJTIwTWFuZGFsb3JpYW4lMjBhcHBlYXJzJTIyJTJDJTIyT2JpLXdhbiUyMGZpZ2h0cyUyMFZhZGVyJTIyJTJDJTIySmVkaSUyME1pbmQlMjBUcmljayUyMiUyQyUyMk9iaS13YW4lMjB1c2VzJTIwYSUyMHdlYXBvbiUyMiUyQyUyMk5ldyUyMGNoYXJhY3RlciUyMG1hZGUlMjBqdXN0JTIwdG8lMjBiZWNvbWUlMjBhJTIwdG95JTIyJTJDJTIyT3JkZXIlMjA2NiUyMGZsYXNoYmFjayUyMiUyQyUyMlF1aS1nb24lMjBKaW5uJTIwJTIyJTJDJTIyQmFjdGF0YW5rJTIwJTIyJTJDJTIyQWxpZW4lMjBzcGVha2luZyUyMGFsaWVuJTIyJTJDJTIyQ29tcGV0ZW50JTIwU3Rvcm0lMjB0cm9vcGVyJTIyJTJDJTIyVW5jbGUlMjBPd2VuJTJGQXVudCUyMEJlcnUlMjIlMkMlMjJXZSUyMG5lZWQlMjB5b3UlMjBPYmktd2FuISUyMiUyQyUyMm1lZXRpbmclMjBvdGhlciUyMEplZGklMjIlMkMlMjJuZXclMjBKZWRpJTIwcG93ZXIlMjIlMkMlMjJBbmFraW4ncyUyMGxpZ2h0c2FiZXIlMjIlMkMlMjJPYmktd2FuJTIwY3JpZXMlMjIlMkMlMjJDbG9uZXMlMjIlMkMlMjJQYWRtZSUyMGZsYXNoYmFjayUyMiUyQyUyMlBvbGl0aWNzJTIwdGFsayUyMiUyQyUyMklucXVpc2l0b3JzJTIwcGxheSUyMGRpcnR5JTIyJTJDJTIyQmFja3N0YWJiaW5nJTIwYnklMjBTaXRoJTIyJTJDJTIyUmlkaW5nJTIwYmlnJTIwYmVhc3QlMjIlNUQlMkMlMjJkYXRhMjUlMjIlM0ElNUIlMjJIaWdoJTIwR3JvdW5kJTIyJTJDJTIyVGFsayUyMGFib3V0JTIwU2FuZCUyMiUyQyUyMk5ldyUyMGNvbG9yJTIwbGlnaHRzYWJlciUyMiUyQyUyMllvZGElMjBndWVzdCUyMGFwcGVhcmFuY2UlMjIlMkMlMjJBJTIwTWFuZGFsb3JpYW4lMjBhcHBlYXJzJTIyJTJDJTIyT2JpLXdhbiUyMGZpZ2h0cyUyMFZhZGVyJTIyJTJDJTIySmVkaSUyME1pbmQlMjBUcmljayUyMiUyQyUyMk9iaS13YW4lMjB1c2VzJTIwYSUyMHdlYXBvbiUyMiUyQyUyMk5ldyUyMGNoYXJhY3RlciUyMG1hZGUlMjBqdXN0JTIwdG8lMjBiZWNvbWUlMjBhJTIwdG95JTIyJTJDJTIyT3JkZXIlMjA2NiUyMGZsYXNoYmFjayUyMiUyQyUyMlF1aS1nb24lMjBKaW5uJTIwJTIyJTJDJTIyQmFjdGF0YW5rJTIwJTIyJTJDJTIyRnJlZSUyMFNwYWNlJTIyJTJDJTIyQ29tcGV0ZW50JTIwU3Rvcm0lMjB0cm9vcGVyJTIyJTJDJTIyVW5jbGUlMjBPd2VuJTJGQXVudCUyMEJlcnUlMjIlMkMlMjJXZSUyMG5lZWQlMjB5b3UlMjBPYmktd2FuISUyMiUyQyUyMm1lZXRpbmclMjBvdGhlciUyMEplZGklMjIlMkMlMjJuZXclMjBKZWRpJTIwcG93ZXIlMjIlMkMlMjJBbmFraW4ncyUyMGxpZ2h0c2FiZXIlMjIlMkMlMjJPYmktd2FuJTIwY3JpZXMlMjIlMkMlMjJDbG9uZXMlMjIlMkMlMjJQYWRtZSUyMGZsYXNoYmFjayUyMiUyQyUyMlBvbGl0aWNzJTIwdGFsayUyMiUyQyUyMklucXVpc2l0b3JzJTIwcGxheSUyMGRpcnR5JTIyJTJDJTIyQmFja3N0YWJiaW5nJTIwYnklMjBTaXRoJTIyJTVEJTdE",
        etc_office:
          "JTdCJTIyZGF0YSUyMiUzQSUyMiU1QyUyMkhleSUyMHlvdSdyZSUyMG11dGVkJTVDJTIyJTVDbiU1QyUyMkNhbiUyMHlvdSUyMGhlYXIlMjBtZSUzRiU1QyUyMiU1Q24lNUMlMjJDYW4lMjB5b3UlMjBzZWUlMjBteSUyMHZpZGVvJTNGJTVDJTIyJTVDbiU1QyUyMkhvdydzJTIwZXZlcnlib2R5J3MlMjB3ZWVrZW5kJTNGJTVDJTIyJTVDbiU1QyUyMiU1Qm5hbWUlNUQlMkMlMjBjYW4lMjB5b3UlMjBtdXRlJTNGJTVDJTIyJTVDbkludGVycnVwdGluZyUyMHNvbWVib2R5JTVDbkRvZyUyMGJhcmtpbmclNUNuQ2F0JTIwb24tc2NyZWVuJTVDbkpva2UlMjBiYWNrZ3JvdW5kJTVDbmF3a3dhcmQlMjBzaWxlbmNlJTVDblJvYm90aWMlMjB2b2ljZSU1Q25DYW1lcmElMjBvbiUyMG90aGVyJTIwc2NyZWVuJTVDblNvbWVvbmUlMjBpcyUyMGxhdGUlNUNuQmFuZHdpZHRoJTIwaXNzdWUlNUNuRHJpbmtpbmclMkZlYXRpbmclNUNuQmVkJTIwSGVhZCU1Q25DcmVlcHklMjBsaWdodGluZyU1Q25ZYXduaW5nJTVDbk9idmlvdXNseSUyMGRpc3RyYWN0ZWQlNUNuZGlmZmVyZW50JTIwY29udm8lMjBpbiUyMGNoYXQlNUNuZW1vamklMjBhYnVzZSU1Q25PZmYtdG9waWMlMjBxdWVzdGlvbiU1Q25Kb2tlJTIwbm9ib2R5JTIwbGF1Z2hzJTVDbmNvdWdoJTJGc25lZXplJTVDbiUyMiUyQyUyMmRhdGFBcnJheSUyMiUzQSU1QiUyMkludGVycnVwdGluZyUyMHNvbWVib2R5JTIyJTJDJTIyRHJpbmtpbmclMkZlYXRpbmclMjIlMkMlMjIlNUMlMjIlNUJuYW1lJTVEJTJDJTIwY2FuJTIweW91JTIwbXV0ZSUzRiU1QyUyMiUyMiUyQyUyMiU1QyUyMkhvdydzJTIwZXZlcnlib2R5J3MlMjB3ZWVrZW5kJTNGJTVDJTIyJTIyJTJDJTIyYXdrd2FyZCUyMHNpbGVuY2UlMjIlMkMlMjJPZmYtdG9waWMlMjBxdWVzdGlvbiUyMiUyQyUyMmRpZmZlcmVudCUyMGNvbnZvJTIwaW4lMjBjaGF0JTIyJTJDJTIyQ2FtZXJhJTIwb24lMjBvdGhlciUyMHNjcmVlbiUyMiUyQyUyMkNyZWVweSUyMGxpZ2h0aW5nJTIyJTJDJTIyQmFuZHdpZHRoJTIwaXNzdWUlMjIlMkMlMjJKb2tlJTIwYmFja2dyb3VuZCUyMiUyQyUyMmVtb2ppJTIwYWJ1c2UlMjIlMkMlMjJSb2JvdGljJTIwdm9pY2UlMjIlMkMlMjIlNUMlMjJIZXklMjB5b3UncmUlMjBtdXRlZCU1QyUyMiUyMiUyQyUyMmNvdWdoJTJGc25lZXplJTIyJTJDJTIyQmVkJTIwSGVhZCUyMiUyQyUyMiUyMiUyQyUyMllhd25pbmclMjIlMkMlMjJEb2clMjBiYXJraW5nJTIyJTJDJTIySm9rZSUyMG5vYm9keSUyMGxhdWdocyUyMiUyQyUyMkNhdCUyMG9uLXNjcmVlbiUyMiUyQyUyMiU1QyUyMkNhbiUyMHlvdSUyMHNlZSUyMG15JTIwdmlkZW8lM0YlNUMlMjIlMjIlMkMlMjJPYnZpb3VzbHklMjBkaXN0cmFjdGVkJTIyJTJDJTIyJTVDJTIyQ2FuJTIweW91JTIwaGVhciUyMG1lJTNGJTVDJTIyJTIyJTJDJTIyU29tZW9uZSUyMGlzJTIwbGF0ZSUyMiU1RCUyQyUyMmRhdGEyNSUyMiUzQSU1QiUyMkludGVycnVwdGluZyUyMHNvbWVib2R5JTIyJTJDJTIyRHJpbmtpbmclMkZlYXRpbmclMjIlMkMlMjIlNUMlMjIlNUJuYW1lJTVEJTJDJTIwY2FuJTIweW91JTIwbXV0ZSUzRiU1QyUyMiUyMiUyQyUyMiU1QyUyMkhvdydzJTIwZXZlcnlib2R5J3MlMjB3ZWVrZW5kJTNGJTVDJTIyJTIyJTJDJTIyYXdrd2FyZCUyMHNpbGVuY2UlMjIlMkMlMjJPZmYtdG9waWMlMjBxdWVzdGlvbiUyMiUyQyUyMmRpZmZlcmVudCUyMGNvbnZvJTIwaW4lMjBjaGF0JTIyJTJDJTIyQ2FtZXJhJTIwb24lMjBvdGhlciUyMHNjcmVlbiUyMiUyQyUyMkNyZWVweSUyMGxpZ2h0aW5nJTIyJTJDJTIyQmFuZHdpZHRoJTIwaXNzdWUlMjIlMkMlMjJKb2tlJTIwYmFja2dyb3VuZCUyMiUyQyUyMmVtb2ppJTIwYWJ1c2UlMjIlMkMlMjJGcmVlJTIwU3BhY2UlMjIlMkMlMjIlNUMlMjJIZXklMjB5b3UncmUlMjBtdXRlZCU1QyUyMiUyMiUyQyUyMmNvdWdoJTJGc25lZXplJTIyJTJDJTIyQmVkJTIwSGVhZCUyMiUyQyUyMiUyMiUyQyUyMllhd25pbmclMjIlMkMlMjJEb2clMjBiYXJraW5nJTIyJTJDJTIySm9rZSUyMG5vYm9keSUyMGxhdWdocyUyMiUyQyUyMkNhdCUyMG9uLXNjcmVlbiUyMiUyQyUyMiU1QyUyMkNhbiUyMHlvdSUyMHNlZSUyMG15JTIwdmlkZW8lM0YlNUMlMjIlMjIlMkMlMjJPYnZpb3VzbHklMjBkaXN0cmFjdGVkJTIyJTJDJTIyJTVDJTIyQ2FuJTIweW91JTIwaGVhciUyMG1lJTNGJTVDJTIyJTIyJTJDJTIyU29tZW9uZSUyMGlzJTIwbGF0ZSUyMiU1RCU3RA==",
      };
      console.log("prefilling!");
      console.log(event.target.value);
      this.fillWith(importedData[event.target.value]);
    },
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
      // // pass this to current data
      this.fillWith(this.$route.query.src);
    }

    // TODO: BUG here! Will create multiple Free Space
    // this.words = shuffle(this.words);
    this.words[12] = "Free Space";
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  overflow-x: hidden; /* Hide vertical scrollbar */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gameboard {
  border: 2px solid lightgray;
  background: white;
  border-radius: 5px;
  justify-content: space-evenly;
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
  .gameboard {
    flex-shrink: 0;
    flex-basis: 75%;
  }

  .sidebar {
    flex-basis: 25%;
  }
}
</style>
