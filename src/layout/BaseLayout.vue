<script setup lang="ts">
import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
</script>

<template>
  <div class="layoutContainer">
    <header>
      <SearchBarComponent />

      <div>
        <vk-button primary>Mi Botón</vk-button>
        <vk-icon icon="heart"></vk-icon>
      </div>
    </header>

    <main></main>
  </div>
</template>

<style scoped>
.layoutContainer {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
