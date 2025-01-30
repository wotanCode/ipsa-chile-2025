<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChartStore } from "@/stores/chartStore";

const store = useChartStore();
const { selectedKey, tabOptions, selectedTimeframe } = storeToRefs(store);
const { selectTab, setTimeframe } = store;
</script>

<template>
  <div class="tabContainer">
    <div class="tabs">
      <button
        v-for="option in tabOptions"
        :key="option.key"
        class="tab"
        :class="{ active: selectedKey === option.key }"
        @click="selectTab(option.key)"
      >
        {{ option.key }}
      </button>
    </div>

    <div class="timeframe-selector">
      <label for="timeframe">Periodo:</label>
      <select
        id="timeframe"
        v-model="selectedTimeframe"
        @change="setTimeframe(selectedTimeframe)"
      >
        <option value="1M">1 Mes</option>
        <option value="3M">3 Meses</option>
        <option value="6M">6 Meses</option>
        <option value="12M">1 Año</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.tabContainer {
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}
.tabs {
  display: flex;
  gap: 10px;
}

.tab {
  color: #f1f1f1;
  background: transparent;
  border: none;
  outline: none;
  appearance: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: border-bottom 0.3s, color 0.3s;
  border-bottom: 2px solid transparent;
}

.tab:hover,
.tab:focus {
  border-bottom: 2px solid #ccc;
  color: #fff;
}

.tab.active {
  border-bottom: 2px solid #007aff;
  color: #fff;
}

.timeframe-selector {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeframe-selector select {
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
