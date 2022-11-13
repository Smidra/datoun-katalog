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
    <div class="w-0 invisible md:visible md:w-1/4">
      <ais-hierarchical-menu class="dark:text-base-content menu text-primary"
      :attributes="['vyrobny.kategorie']" show-more>
      <template v-slot:showMoreLabel="{ isShowingMore }">
        {{ isShowingMore ? 'Méně kategorií' : 'Další kategorie' }}
      </template>
      </ais-hierarchical-menu>
    </div>

    <!-- RIGHT are results -->
    <ais-hits class="px-2 md:p-0 md:w-3/4"><template v-slot:item="{ item }">
      <!-- The collapse itself -->
      <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 hover:text-accent">
    
        <!-- Name of the collapse -->
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          <a class="font-bold text-secondary">{{ item.jmeno_firmy }}
          </a> <a class="italic">{{ item.vyrobny[0].lokalita }}</a>
        </div>
        <!-- Inside the collapse -->
        <div class="collapse-content">
          <p class="text-base-content">{{ item.popisek_firmy }}<a :href=item.eshop>{{ item.eshop }}</a></p>
        </div>

      </div>
    </template></ais-hits>

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