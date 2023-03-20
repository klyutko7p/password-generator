<template>
    <div>
        <Credits :title="title"></Credits>
        <Generator></Generator>
    </div>
</template>

<script setup lang="ts">
import Credits from '@/components/Credits.vue';
import Generator from '@/components/Generator.vue';
import { ref } from '@vue/runtime-core';
let title = ref("Password Generator")
</script>
