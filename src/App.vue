<script setup>
import MenuComponent from "./components/Menu.vue"
import ResultsComponent from "./components/Results.vue"
import SearchBoxComponent from "./components/SearchBoxComponent.vue"
</script>

<template>
  <!-- Heading -->
  <div class="text-center font-sans font-semibold text-primary text-4xl p-6
  md:text-6xl md:p-10"><a href="/">Datoun katalog</a></div>
  <ais-instant-search :search-client="searchClient" index-name="firmy">

  <!-- Search box -->
  <SearchBoxComponent />

  <!-- Vertical spacing -->
  <div class="p-3"></div>

  <!-- NORMAL Menu is left and results are right -->
  <div class="flex flex-row mx-auto w-full md:w-3/4">
    <!-- LEFT is menu -->
    <div class="w-0 invisible md:visible md:w-1/4"><MenuComponent /></div>
    <!-- RIGHT are results -->
    <div class="px-2 md:p-0 md:w-3/4"><ResultsComponent /></div>
  </div>

  <!-- MOBILE Menu becomes a button on mobile screens -->
  <div class="z-20 dropdown dropdown-top flex justify-center">
    <!-- Button. Click to close copied form https://github.com/saadeghi/daisyui/issues/157 -->
    <label tabindex="0" class="btn btn-accent btn-circle px-20 fixed bottom-2 md:invisible" onclick="this.parentElement.classList.toggle('dropdown-open');document.activeElement.blur()" >Kategorie</label>
    <!-- Opened menu -->
    <div class="fixed bottom-16 flex justify-center w-full">
      <ul tabindex="0" class="dropdown-content bg-base-200 rounded-box p-6 w-full"><MenuComponent /></ul>
    </div>
  </div>

  </ais-instant-search>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

export default {
  data() {
    return {
      searchClient: instantMeiliSearch(
        "https://wiki.smid.io",
        "66cad08d67ad93aeb7549e78fe084c755946be1db4a4144c7a6de9ef32eb405f"
      ),
    };
  },
};
</script>