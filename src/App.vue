<template>
  <div class="text-center font-sans text-6xl font-semibold
   text-sky-500 p-10">
    Datoun katalog
  </div>

  <ais-instant-search :search-client="searchClient" index-name="firmy">

    <!-- <h2>Kategorie</h2>
  <ais-menu attribute="vyrobny.kategorie" /> -->

    <!-- class="w-10 mx-20 my-4 p-4 rounded-lg border-2 border-indigo-500 hover:shadow-xl" -->

    <ais-search-box class="md:w-3/4 lg:w-1/2 mx-auto p-2" :class-names="{
      'ais-SearchBox-input': 'p-6 w-full rounded-lg border-2 border-indigo-500 hover:shadow-xl',
      'ais-SearchBox-submitIcon': 'hidden',
      'ais-SearchBox-resetIcon': 'hidden',
    }" type="text" name="search" placeholder="Hlodej šmudlo..." />

    <div class="p-4"></div>
    <!-- <div
      class="md:w-3/4 lg:w-1/2 mx-auto p-2 grid w-11/12 p-6 mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 "> -->
    <div class="flex flex-row w-3/4 mx-auto">
      
      <div class="basis-1/4">
        <ais-menu class="menu bg-base-100 w-56 p-2 rounded-box" attribute="vyrobny.kategorie" />
      </div>

      <ais-hits class="basis-3/4">

        <template v-slot:item="{ item }">
          <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box p-1">
            <div class="collapse-title text-xl font-medium">
              {{ item.jmeno_firmy }} / {{ item.vyrobny[0].lokalita }}
            </div>
            <div class="collapse-content"> 
              <p>{{ item.popisek_firmy }}<a :href=item.eshop>{{ item.eshop }}</a></p>
            </div>
          </div>
        </template>
      </ais-hits>

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