<script setup>
import { darkmodeStore } from '../stores/darkmode.js';
const darkmode = darkmodeStore();
</script>
<template>
    <div :class="{ 'darkmode' : darkmode.darkmode }">
        <slot />
    </div>
</template>
<style scoped>
    div {
        display: grid;
        grid-template-rows: 100px 1fr;
        min-width: 100vw;
        min-height: 100vh;
    }
</style>