
<template>
  <header class="header">
    <h1 class="header-title">Katalog českých výrobků</h1>
  </header>
  <p class="disclaimer">
    Kopie dema meilisearch instantsearch nacucunutá na https://wiki.smid.io
  </p>
  <div class="container">
    <ais-instant-search
      :search-client="searchClient"
      index-name="firmy"
    >
      <div class="search-panel__filters">
        <h2>Kategorie</h2>
        <ais-refinement-list attribute="vyrobny.kategorie" />
      </div>
      <div class="search-panel__results">
        <app-debounced-search-box :delay="10" class="ais-SearchBox-input" />
        <ais-hits>
          <template v-slot:item="{ item }">
            <div>
              <div class="hit-name">
                <ais-highlight :hit="item" attribute="jmeno_firmy" />
              </div>
              <!-- <img :src="item.image" align="left" :alt="item.image" /> -->
              <div class="hit-description">
                <ais-snippet :hit="item" attribute="popisek_firmy" />
              </div>
              <div class="hit-info">ID: {{ item.id }}</div>
              <div class="hit-info">Jméno: {{ item.jmeno_firmy }}</div>
              <div class="hit-info">Lokalita: {{ item.jmeno_firmy }}</div>
              <div class="hit-info">Eshop: {{ item.eshop }}</div>
            </div>
          </template>
        </ais-hits>
        <ais-configure
          :attributesToSnippet="['description:50']"
          snippetEllipsisText="…"
        />
      </div>
      <ais-pagination />
    </ais-instant-search>
  </div>
</template>

<script>
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import AppDebouncedSearchBox from "./DebouncedSearchBox";

export default {
  components: {
    AppDebouncedSearchBox,
  },
  data() {
    return {
      searchClient: instantMeiliSearch(
        "https://wiki.smid.io",
        "66cad08d67ad93aeb7549e78fe084c755946be1db4a4144c7a6de9ef32eb405f",
        {
          paginationTotalHits: 40,
          finitePagination: true,
        }
      ),
    };
  },
};
</script>
<style>
body,
h1 {
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.ais-Hits-item {
  margin-bottom: 1em;
  width: calc(50% - 1rem);
}

.ais-Hits-item img {
  margin-right: 1em;
  width: 100%;
  height: 100%;
  margin-bottom: 0.5em;
}

.ais-Highlight-highlighted {
  background: cyan;
  font-style: normal;
}

.disclaimer {
  margin-left: 1em;
}

.hit-name {
  margin-bottom: 0.5em;
}

.hit-info {
  font-size: 90%;
}

.header {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.5rem 1rem;
  background-image: linear-gradient(to right, #4dba87, #2f9088);
  color: #fff;
  margin-bottom: 1rem;
}

.header-title {
  font-size: 1.2rem;
  font-weight: normal;
}

.hit-description {
  font-size: 90%;
  margin-bottom: 0.5em;
  color: grey;
}

.header-title::after {
  content: " ▸ ";
  padding: 0 0.5rem;
}

.header-subtitle {
  font-size: 1.2rem;
}

.container {
  padding: 1rem;
}

.ais-InstantSearch {
  max-width: 960px;
  overflow: hidden;
  margin: 0;
}

.search-panel__filters {
  float: left;
  width: 200px;
}

.search-panel__results {
  margin-left: 210px;
}

.ais-SearchBox {
  margin-bottom: 2rem;
}

.ais-Pagination {
  margin: 2rem auto;
  text-align: center;
}
.ais-SearchBox-form {
  margin-bottom: 20px;
}
</style>


