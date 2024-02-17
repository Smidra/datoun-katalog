<template>
    <div id="app">
        <ais-instant-search :search-client="searchClient" index-name="firmy">
            <ais-configure :query="searchQuery" />
            <!-- Header -->
            <cv-header aria-label="Carbon header">
                <cv-header-menu-button class="hamburger-menu" aria-label="Header menu" aria-controls="side-nav"
                    :active="expandedSideNav" @click="expandedSideNav = !expandedSideNav" />
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

                        <hr class="custom-divider" />
                        <cv-button kind="ghost" class="grey-text" @click="showModal = true">
                            Přidat novou firmu<add-icon />
                        </cv-button>

                        <EditModal v-model:visible="showModal" />

                    </cv-side-nav>
                </template>

            </cv-header>

            <!-- Main Content -->
            <main>
                <ais-hits>
                    <template v-slot="{ items }">
                        <div class="tile-container">
                            <ItemTile v-for="item in items" :key="item.objectID" :item="item" />
                        </div>
                    </template>
                </ais-hits>
            </main>

        </ais-instant-search>
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
    /* Adjust as needed */
}

.grey-text {
    /* color: #5A6872; */
    color: #0f62fe;
}
</style>
