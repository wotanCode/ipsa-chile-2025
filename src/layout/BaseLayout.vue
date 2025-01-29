<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useDataStore } from "@/stores/dataStore";

import SearchBarComponent from "@/components/SearchBarComponent/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent/HeaderComponent.vue";
import ChartComponent from "@/components/ChartComponent/ChartComponent.vue";

const store = useDataStore();
const { jsonData, isLoading, error } = storeToRefs(store);

const aguasaData = ref(jsonData.value["AGUASA"]);

onMounted(() => {
  store.loadData();
  // Ejemplo de cómo acceder a los datos de AGUASA
  aguasaData.value = jsonData.value["AGUASA"];
});
</script>

<template>
  <div class="layoutContainer">
    <header class="headerContainer">
      <SearchBarComponent />
    </header>

    <main>
      <div>
        <HeaderComponent />

        <p>Justo aqui va el grafico</p>
        <!-- Mostrar datos solo si están disponibles -->
        <!-- <ChartComponent
          v-if="aguasaData && !isLoading"
          :chartData="aguasaData"
        /> -->

        <ChartComponent
          v-if="aguasaData && !isLoading"
          :chartData="aguasaData"
        />

        <!-- Mostrar mensaje si hay error -->
        <p v-if="error" class="error">{{ error }}</p>
        <!-- Mostrar mensaje de carga -->
        <p v-if="isLoading">Cargando gráfico...</p>
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
