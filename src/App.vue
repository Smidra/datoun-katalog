<script setup>
import MenuComponent from "./components/Menu.vue"
import ResultsComponent from "./components/Results.vue"
import SearchBoxComponent from "./components/SearchBoxComponent.vue"
import algoliasearch from "algoliasearch"
import 'instantsearch.css/themes/satellite-min.css';
import Statistics from "./components/statistics.vue"

const searchClient = algoliasearch('S27OT8U78J', '6c71ae31ec984a2185234a501482d57a')
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Heading -->
    <n-h1 class="text-center text-5xl p-6 md:text-6xl md:pt-10">
      <a href="/">Datoun</a>
    </n-h1>

    <ais-instant-search :search-client="searchClient" index-name="firmy">
      <!-- Search box -->
      <SearchBoxComponent />
      <!-- Vertical spacing -->
      <div class="p-3"></div>

      <!-- NORMAL Menu is left and results are right -->
      <div class="flex flex-row mx-auto w-full md:w-full lg:w-3/4">
        <!-- LEFT is menu -->
        <div class="w-0 invisible md:visible md:min-w-fit md:w-3/12">
          <MenuComponent />
          <!-- <Statistics /> -->
        </div>
        <!-- RIGHT are results -->
        <div class="mb-52 w-full px-2 md:p-0 md:w-9/12">
          <ResultsComponent />
        </div>
      </div>

      <!-- MOBILE Menu becomes a button on mobile screens -->
      <!-- <div class="z-20 dropdown dropdown-top flex justify-center"> -->
      <!-- Button. Click to close copied form https://github.com/saadeghi/daisyui/issues/157 -->
      <!-- <label tabindex="0" class="btn btn-accent btn-circle px-20 fixed bottom-2 md:invisible"
        onclick="this.parentElement.classList.toggle('dropdown-open');document.activeElement.blur()">Kategorie</label> -->
      <!-- Opened menu -->
      <!-- <div class="fixed bottom-16 flex justify-center w-full">
        <ul tabindex="0" class="dropdown-content bg-base-200 rounded-box p-6 w-full">
          <MenuComponent />
        </ul>
      </div>
    </div> -->

    </ais-instant-search>
  </div>
</template>
