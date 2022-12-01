<script setup>
import { WorkOutlineOutlined, WorkOffOutlined } from "@vicons/material";
// Define props
let functional = defineProps(['functional'])
console.log(functional)

</script>

<template>
    <h1 v-if="functional">
        <n-icon-wrapper :size="24" :border-radius="10">
            <n-icon :size="18" :component="WorkOutlineOutlined" />
        </n-icon-wrapper>
        Funguje
    </h1>
    <h1 v-if="!functional">
        <n-icon-wrapper color="#D03050FF" :size="24" :border-radius="10">
            <n-icon :size="18" :component="WorkOffOutlined" />
        </n-icon-wrapper>
        Nefunguje
    </h1>
</template>