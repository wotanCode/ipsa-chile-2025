<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/dataStore";
import { Line } from "chart.js";

const store = useDataStore();
const { jsonData, isLoading, error, selectedKey } = storeToRefs(store); // Accedemos a selectedKey

const chartCanvas = ref(null);
const chartInstance = ref(null);
const selectedData = ref(null);
const selectedTimeframe = ref("1M");

const timeframes = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1A": 365,
};

const renderChart = () => {
  if (!selectedData.value || !chartCanvas.value) return;

  const ctx = chartCanvas.value.getContext("2d");
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  chartInstance.value = new Line(ctx, {
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
          beginAtZero: false,
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });
};

const updateTimeframe = (timeframe) => {
  selectedTimeframe.value = timeframe;
  updateChartData();
};

const updateChartData = () => {
  const fullData = jsonData.value[selectedKey.value]; // Usamos el selectedKey
  if (!fullData) return;

  const days = timeframes[selectedTimeframe.value];
  const startIndex = Math.max(0, fullData.labels.length - days);

  selectedData.value = {
    labels: fullData.labels.slice(startIndex),
    datasets: fullData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(startIndex),
    })),
  };

  renderChart();
};

onMounted(async () => {
  store.loadData();
});

watch([jsonData, selectedKey], () => {
  updateChartData();
});
</script>

<template>
  <div>
    <p v-if="isLoading" class="uk-text-muted">Cargando datos...</p>
    <p v-else-if="error" class="uk-text-danger">Error: {{ error }}</p>
    <canvas v-else ref="chartCanvas"></canvas>

    <div class="uk-button-group uk-margin-top">
      <button
        v-for="(days, key) in timeframes"
        :key="key"
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
        :class="{ 'uk-active': selectedTimeframe === key }"
        @click="updateTimeframe(key)"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.btnTime {
  color: #f1f1f1;
  border-radius: 8px;
  font-size: 0.85rem;
}

.btnTime:hover,
.btnTime:focus {
  color: #fff;
  background-color: #007aff;
}

.btnTime.uk-active {
  color: #fff;
  background-color: #007aff;
}
</style>
