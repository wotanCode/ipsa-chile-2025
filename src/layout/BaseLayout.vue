<script setup lang="ts">
import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
</script>

<template>
  <div class="layoutContainer">
    <header class="headerContainer">
      <SearchBarComponent />
    </header>

    <main>
      <div>
        <HeaderComponent />

        <div>
          <h2>RESUMEN</h2>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layoutContainer {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  gap: 2rem;
}
</style>
