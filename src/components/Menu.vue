<template>
    <h2 class="text-accent font-bold text-xl">Kategorie</h2>
    <ais-hierarchical-menu class="dark:text-base-content menu text-primary"
    :attributes="['vyrobny.kategorie.0', 'vyrobny.kategorie.1']"
        show-more>
        <template v-slot:showMoreLabel="{ isShowingMore }">
            {{ isShowingMore ? 'Méně kategorií' : 'Další kategorie' }}
        </template>
    </ais-hierarchical-menu>
</template>