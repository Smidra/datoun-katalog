<script setup>
import MenuComponent from "./components/Menu.vue"
import ResultsComponent from "./components/Results.vue"
</script>

<template>
  <!-- Heading -->
  <div class="text-center font-sans font-semibold text-primary text-4xl p-6
  md:text-6xl md:p-10"><a href="/">Datoun katalog</a></div>
  <ais-instant-search :search-client="searchClient" index-name="firmy">

  <!-- Search box -->
  <ais-search-box class="md:w-3/4 lg:w-1/2 mx-auto p-2" :class-names="{
    'ais-SearchBox-input': 'p-6 w-full rounded-lg border-2 border-primary hover:shadow-xl focus:font-bold',
    'ais-SearchBox-submitIcon': 'hidden',
    'ais-SearchBox-resetIcon': 'hidden',
  }" type="text" name="search" placeholder="Hlodej šmudlo..." />

  <!-- Vertical spacing -->
  <div class="p-3"></div>

  <!-- Menu is left and results are right -->
  <div class="flex flex-row mx-auto w-full md:w-3/4">
    <!-- LEFT is menu -->
    <div class="w-0 invisible md:visible md:w-1/4"><MenuComponent /></div>
    <!-- RIGHT are results -->
    <div class="px-2 md:p-0 md:w-3/4"><ResultsComponent /></div>
  </div>

  <!-- Menu becomes a button on mobile screens -->
  <div class="flex flex-col items-center md:invisible">
    <button tabindex="1" class="z-10 btn btn-accent fixed bottom-10 btn-circle px-20">Kategorie</button>
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