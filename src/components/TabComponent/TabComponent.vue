<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/dataStore";

const store = useDataStore();
const { selectedKey } = storeToRefs(store);
const { selectTab } = store;

const options = ["AGUASA", "ANDINAB", "BCI", "BSANTANDER", "CAP", "IPSA"];
</script>

<template>
  <div class="headerContainer">
    <div class="tabs">
      <!-- Generar los tabs usando las opciones del store -->
      <button
        v-for="(label, key) in options"
        :key="key"
        class="tab"
        :class="{ active: selectedKey === label }"
        @click="selectTab(label)"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.headerContainer {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.tabs {
  display: flex;
  gap: 10px;
}

.tab {
  background: transparent;
  border: 2px solid #ccc;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.tab:hover {
  background-color: #007aff;
  color: white;
}

.tab.active {
  background-color: #007aff;
  color: white;
  font-weight: bold;
}
</style>
