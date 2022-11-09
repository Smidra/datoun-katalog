<template>
    <ais-instant-search index-name="demo_ecommerce" :search-client="searchClient">
      
      <div class="left-panel">
        <ais-clear-refinements />
        <h2>Brands</h2>
        <ais-refinement-list attribute="brand" searchable />
        <ais-configure :hitsPerPage="8" />
      </div>

      <div class="right-panel">
        <ais-search-box />
        <ais-hits>
          <template v-slot:item="{ item }">
            <h2>{{ item.name }}</h2>
          </template>
        </ais-hits>
        <ais-pagination />
      </div>

    </ais-instant-search>
  </template>
  