<template>
    <div class="p-3 border rounded mx-3 bg-white ">
        <n-h2 class="pt-1">Kategorie</n-h2>
        <ais-hierarchical-menu class="dark:text-base-content menu text-primary" :show-parent-level="true"
            :attributes="['vyrobny.kategorie0', 'vyrobny.kategorie1', 'vyrobny.kategorie2']">
            <template v-slot:showMoreLabel="{ isShowingMore }">
                {{ isShowingMore ? 'Méně kategorií' : 'Další kategorie' }}
            </template>
        </ais-hierarchical-menu>
    </div>
</template>