<template>
  <h1>Datoun katalog</h1>
  <ais-instant-search :search-client="searchClient" index-name="firmy">
    <ais-search-box />
    <ais-hits>
      <template v-slot:item="{ item }">
        <h2>{{ item.jmeno_firmy }}</h2>
        {{ item.popisek_firmy }}
        <a :href=item.eshop>{{ item.eshop }}</a>
      </template>
    </ais-hits>
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

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>