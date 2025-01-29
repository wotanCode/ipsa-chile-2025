<template>
  <div>
    <p v-if="isLoading" class="uk-text-muted">Cargando datos...</p>
    <p v-else-if="error" class="uk-text-danger">Error: {{ error }}</p>

    <canvas ref="chartCanvas"></canvas>

    <div class="uk-button-group uk-margin-top">
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        1M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        3M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        6M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        1A
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/dataStore";
import { Line } from "chart.js";

const store = useDataStore();
const { jsonData, isLoading, error } = storeToRefs(store);

const chartCanvas = ref(null);
const selectedData = ref(null);

const renderChart = () => {
  if (!selectedData.value || !chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext("2d");
  new Line(ctx, {
    type: "line",
    data: selectedData.value,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Gráfico",
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// Cargar datos cuando el componente se monta
onMounted(async () => {
  store.loadData();
  selectedData.value = jsonData.value["IPSA"]; // Seleccionar IPSA por defecto
  renderChart();
});
</script>

<style scoped>
.btnTime {
  color: #f1f1f1;
  border-radius: 8px;
  font-size: 0.85rem;
}

.btnTime:hover,
.btnTime:focus {
  color: #fff;
}
</style>
