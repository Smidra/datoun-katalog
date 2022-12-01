<script setup>
import Functional from "./Functional.vue"
</script>

<template>
    <ais-hits>
        <template v-slot:item="{ item }">
            <div class="w-full">
                <!-- Collapse header with basic info -->
                <div class="w-full flex flex-row justify-between">
                    <n-h2 class="flex flex-row items-center">
                        <img width="40" :src="item.logo" />
                        <a class="mx-3">
                            {{ item.jmeno_firmy }}, {{ item.vyrobny[0].lokalita.hezkyNazev }}
                        </a>
                    </n-h2>
                    <a :href="item.eshop" target="_blank">
                        <n-button size="small" href="googl.com" target="_blank">e-shop</n-button>
                    </a>
                </div>
                <!-- After clicking "více" -->
                <n-collapse>
                    <n-collapse-item title="Více" name="1">
                        <n-p>{{ item.popisek_firmy }}</n-p>
                        <Functional :functional="item.funguje" />
                        <n-alert type="warning" :show-icon="false">
                            {{ item.poznamky_k_vyrobe }}
                        </n-alert>
                    </n-collapse-item>
                </n-collapse>
            </div>
        </template>
    </ais-hits>
</template>