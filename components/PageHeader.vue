<template>
  <header>
    <nav
      class="
        flex flex-wrap
        items-center
        justify-between
        w-full
        py-4
        md:py-0
        px-4
        mb-2
        text-lg text-gray-700
        bg-blue-400
        drop-shadow-md
      "
    >
      <div>
        <a href="/">
          <h1 class="text-xl font-bold text-white">Rocky Bingo Generator</h1>
        </a>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        @click="showMobileMenu = !showMobileMenu"
        class="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <div
        :class="{ hidden: !showMobileMenu }"
        class="w-full md:flex md:items-center md:w-auto"
        id="menu"
      >
        <ul
          class="
            pt-4
            text-base text-gray-700
            md:flex md:justify-between md:pt-0
          "
        >
          <li>
            <a
              class="
                md:p-4
                py-2
                block
                hover:text-purple-200
                text-white
                font-bold
              "
              href="https://github.com/RockyKev/rocky-bingo"
              >Github</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
h1 {
  font-family: "Niconne", cursive;
  margin: 0;
  line-height: 1.2;
}
</style>