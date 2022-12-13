<script setup>
import Functional from "./Functional.vue"
</script>

<template>
    <ais-hits>
        <template v-slot:item="{ item }">
            <div class="w-full">
                <n-collapse>
                    <n-collapse-item title="" name="1">

                        <!-- Collapse header with basic info -->
                        <template #header>
                            <div class="w-full flex flex-row justify-between ml-5 items-center">
                                <n-h2 class="my-0 flex flex-row items-center">
                                    <img style="max-height:45px;max-width:80px;height:auto;width:auto;" :src="item.logo" />
                                    <a class="ml-7">
                                        {{ item.jmeno_firmy }}
                                    </a>
                                    <a class="text-gray-400">
                                        ,&nbsp;{{ item.vyrobny[0].lokalita.hezkyNazev }} <!-- Unbreakable space -->
                                    </a>
                                </n-h2>
                                <a :href="item.eshop" target="_blank">
                                    <n-button size="small" href="googl.com" target="_blank">e-shop</n-button>
                                </a>
                            </div>
                        </template>

                        <!-- The dropdown content -->
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