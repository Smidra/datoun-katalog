<script setup>
import { WorkOutlineOutlined, WorkOffOutlined } from "@vicons/material";
// Define props
let functional = defineProps(['functional'])

</script>

<template>
    <n-p class="flex flex-row" v-if="functional.functional">
        <n-icon-wrapper :size="24" :border-radius="10">
            <n-icon :size="18" :component="WorkOutlineOutlined" />
        </n-icon-wrapper>
        <a class="self-center mx-1"> Funguje </a>
    </n-p>
    <n-p class="flex flex-row" v-if="!functional.functional">
        <n-icon-wrapper color="#D03050FF" :size="24" :border-radius="10">
            <n-icon :size="18" :component="WorkOffOutlined" />
        </n-icon-wrapper>
        <a class="self-center mx-1"> Nefunguje </a>
    </n-p>
</template>