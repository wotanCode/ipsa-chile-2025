<script setup lang="ts">
import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import ChartComponent from "@/components/ChartComponent/ChartComponent.vue";
import TabComponent from "@/components/TabComponent/TabComponent.vue";
</script>

<template>
  <div class="layoutContainer">
    <header class="headerContainer">
      <SearchBarComponent />
    </header>

    <main>
      <div class="primaryContainer">
        <HeaderComponent />

        <ChartComponent />
      </div>

      <div class="thirdContainer">
        <TabComponent />
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

  .primaryContainer {
    width: 70%;
  }
}
</style>
