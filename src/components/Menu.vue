<template>
    <h2 class="text-accent font-bold text-xl">Kategorie</h2>
    <ais-hierarchical-menu
    class="dark:text-base-content menu text-primary"
    :show-parent-level="true"
    :attributes="['vyrobny.kategorie0', 'vyrobny.kategorie1', 'vyrobny.kategorie2']" >
        <template v-slot:showMoreLabel="{ isShowingMore }">
            {{ isShowingMore ? 'Méně kategorií' : 'Další kategorie' }}
        </template>
    </ais-hierarchical-menu>
</template>