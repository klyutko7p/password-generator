<script setup lang="ts">
import Generator from './pages/Generator.vue';

</script>

<template>
  <div class="container mx-auto">
    <Generator></Generator>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Comfortaa:300,regular,500,600,700);
@import url("https://cdn-uicons.flaticon.com/uicons-brands/css/uicons-brands.css");
@import url('https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css');


:root {
  --main-color: #FF907C;
  --semi-color: white;
}

body {
  background-color: var(--main-color);
  color: var(--semi-color);
  font-family: 'Comfortaa', sans-serif;
}
</style>
