<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useDataStore } from "@/stores/dataStore";

import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import ChartComponent from "@/components/ChartComponent/ChartComponent.vue";

const store = useDataStore();
const { jsonData, isLoading, error } = storeToRefs(store);

const aguasaData = ref(jsonData.value["IPSA"]);

onMounted(() => {
  store.loadData();
  // Ejemplo de cómo acceder a los datos de AGUASA
  aguasaData.value = jsonData.value["IPSA"];
});
</script>

<template>
  <div class="layoutContainer">
    <header class="headerContainer">
      <SearchBarComponent />
    </header>

    <main>
      <div class="primaryContainer">
        <HeaderComponent />

        <div>
          <ChartComponent
            v-if="aguasaData && !isLoading"
            :chartData="aguasaData"
          />

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="isLoading">Cargando gráfico...</p>
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

  .primaryContainer {
    width: 70%;
  }
}
</style>
