<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChartStore } from "@/stores/chartStore";
import { computed } from "vue";

const store = useChartStore();
const { selectedKey, jsonData, tabOptions } = storeToRefs(store);

const currentData = computed(() => {
  const tab = tabOptions.value.find((t) => t.key === selectedKey.value);
  const data = jsonData.value[selectedKey.value];

  return {
    name: tab?.name || "N/A",
    country: tab?.country || "N/A",
    currentValue:
      data?.datasets[0]?.data.at(-1)?.toLocaleString("es-CL") || "N/A",
    percentageChange: "-0.12%", // Placeholder, reemplazar con dato real si está disponible
    pointsChange: "-23,23", // Placeholder, igual que arriba
  };
});
</script>

<template>
  <div class="headerContainer">
    <h2 class="title">{{ currentData.name }}, {{ currentData.country }}</h2>

    <p>Índice:</p>
    <hr />

    <ul class="valuesContainer">
      <li class="valueItem">
        Valor actual:
        <span class="presentValue">
          <!-- ↑ -->
          ↓ {{ currentData.currentValue }}
        </span>
      </li>
      <li class="valueItem">
        Var. % Actual
        <span class="uk-text-danger">{{ currentData.percentageChange }}</span>
      </li>
      <li class="valueItem">
        Var. Puntos Actual:
        <span class="uk-text-danger">{{ currentData.pointsChange }}</span>
      </li>
    </ul>

    <hr />
  </div>
</template>

<style scoped>
p,
ul {
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
}

.headerContainer {
  display: flex;
  flex-direction: column;

  .title {
    color: var(--vt-c-white);
  }

  .valuesContainer {
    display: flex;
  }

  .valueItem {
    padding: 0 1rem 0 1rem;
  }

  .valueItem:first-child {
    padding-left: 0;
  }

  .valueItem:last-child {
    padding-right: 0;
  }

  .presentValue {
    color: var(--vt-c-white-mute);
  }
}
</style>
