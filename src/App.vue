<template>
  <div id="app">
    <ais-instant-search :search-client="searchClient" index-name="firmy">
      <ais-configure :query="searchQuery" :hitsPerPage="hitsPerPage" :page="page - 1"/>
      <!-- Header -->
      <cv-header aria-label="Carbon header">
        <cv-header-menu-button class="hamburger-menu" aria-label="Header menu" aria-controls="side-nav"
                               :active="expandedSideNav" @click="expandedSideNav = !expandedSideNav"/>
        <cv-skip-to-content href="#main-content">Skip to content</cv-skip-to-content>
        <cv-header-name href="#" prefix="Tohle je" class="header-name" @click="reloadPage">Datoun</cv-header-name>

        <cv-search v-model="searchQuery" placeholder="Search"></cv-search>

        <!-- Side Navigation -->
        <template v-slot:left-panels>
          <cv-side-nav id="side-nav" :rail="true" :fixed="useFixed" class="side-nav" :expanded="expandedSideNav">

            <ais-hierarchical-menu :show-parent-level="true"
                                   :attributes="['kategorie0', 'kategorie1', 'kategorie2']">
              <template v-slot="{ items, refine, canRefine }">
                <HierarchicalMenu :items="items" :refine="refine" :canRefine="canRefine">
                </HierarchicalMenu>
              </template>
            </ais-hierarchical-menu>

            <hr class="custom-divider"/>
            <cv-button kind="ghost" class="grey-text" @click="handleCreateNew">
              Přidat novou firmu
              <add-icon/>
            </cv-button>
            <EditModal v-model:visible="showModal"/>


            <cv-button kind="ghost" class="grey-text" @click="showAboutModal = true">
              O nás
            </cv-button>
            <AboutModal v-model:visible="showAboutModal"/>

          </cv-side-nav>
        </template>

      </cv-header>

      <!-- Main Content -->
      <main id="#main-content" class="padding-top">
        <ais-hits>
          <template v-slot="{ items }">
            <div class="tile-container">
              <ItemTile v-for="item in items" :key="item.objectID" :item="item"
                        @open-company-detail="detailModalItem = $event; showDetailModal = true"
                        @open-eshop="handleOpenEshop"/>
            </div>
          </template>
        </ais-hits>

      </main>

      <div class="bottom-absolute">
        <ais-pagination class="bottom-pagination">
          <template v-slot="{ nbHits }">
            <cv-pagination @change="onPaginationChange" :number-of-items="nbHits" :page="page" :pageSizes="[
                               { 'value': 12, 'selected': true }, 24, 48]" pageSizesLabel="Firem na stránku:">
              <template v-slot:range-text="{ scope }">
                <span>{{ scope.start }}-{{ scope.end }} ze {{ scope.items }}</span>
              </template>
              <template v-slot:of-n-pages="{ scope }">
                <span>ze {{ scope.pages }} stránek</span>
              </template>
            </cv-pagination>
          </template>
        </ais-pagination>
      </div>

    </ais-instant-search>
    <EditModal v-model:visible="showEditModal" :editedItem="editedItem"/>
    <CompanyDetailModal v-model:visible="showDetailModal" :item="detailModalItem" @edit="handleEditOpen()"
                        @open-eshop="handleOpenEshop"/>
    <AboutModal/>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.css"></style>
<style scoped>
:deep(.hamburger-menu) {
  display: none;
}

@media (max-width: 768px) {
  :deep(.hamburger-menu) {
    display: block;
  }
}

.header-name {
  font-size: 1.5rem;
}

.grey-text {
  color: #0f62fe;
}

.padding-top {
  padding-top: 1rem;
}
</style>
