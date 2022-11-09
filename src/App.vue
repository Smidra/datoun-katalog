<template>
  <h1>Datoun katalog</h1>
  <ais-instant-search :search-client="searchClient" index-name="firmy">

  <div class="left-panel">
    <h2>Kategorie</h2>
    <ais-menu attribute="vyrobny.kategorie"/>
    <ais-configure :hitsPerPage="8" />
  </div>

  <div class="right-panel">
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.jmeno_firmy }} / {{ item.vyrobny[0].lokalita }}</h2>
        {{ item.popisek_firmy }}
        <p><a :href=item.eshop>{{ item.eshop }}</a></p>
      </template>
    </ais-hits>
    <ais-pagination />
  </div>

</ais-instant-search>
</template>

<script>
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import 'instantsearch.css/themes/algolia.css';


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

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}

.ais-Hits-list {
  margin-top: 0;
  margin-bottom: 1em;
}

.ais-InstantSearch {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1em;
}
</style>