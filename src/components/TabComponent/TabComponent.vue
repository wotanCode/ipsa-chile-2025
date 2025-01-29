<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDataStore } from "@/stores/dataStore";

const store = useDataStore();
const { selectedKey } = storeToRefs(store);
const { selectTab } = store;

const options = ["AGUASA", "ANDINAB", "BCI", "BSANTANDER", "CAP", "IPSA"];
</script>

<template>
  <div class="tabContainer">
    <div class="tabs">
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
.tabContainer {
  border-bottom: 2px solid #ccc;
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
</style>
