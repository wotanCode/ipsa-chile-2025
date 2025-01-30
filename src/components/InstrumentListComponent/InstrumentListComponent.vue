<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

import { useInstrumentStore } from "@/stores/instrumentsStore";

import InstrumentItemComponent from "@/components/InstrumentItemComponent/InstrumentItemComponent.vue";

const store = useInstrumentStore();
const { instrumentsData, isLoading, error } = storeToRefs(store);

const sortConfig = ref({
  field: "name",
  direction: "asc",
});

const getClass = (value) => {
  return value < 0 ? "uk-text-danger" : "uk-text-success";
};

const formatValue = (value) => {
  return value ? value.toFixed(2) : "0.00";
};

const sortData = (field) => {
  const direction =
    sortConfig.value.field === field && sortConfig.value.direction === "asc"
      ? "desc"
      : "asc";
  sortConfig.value = { field, direction };

  instrumentsData.value.data.constituents.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue < bValue) {
      return sortConfig.value.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.value.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

const splitData = () => {
  if (
    !instrumentsData.value ||
    !instrumentsData.value.data ||
    !instrumentsData.value.data.constituents
  ) {
    return [[], []];
  }
  const mid = Math.ceil(instrumentsData.value.data.constituents.length / 2);
  return [
    instrumentsData.value.data.constituents.slice(0, mid),
    instrumentsData.value.data.constituents.slice(mid),
  ];
};

onMounted(() => {
  store.loadInstruments();
});
</script>

<template>
  <div>
    <div v-if="isLoading">Cargando los datos, por favor espera...</div>

    <div v-if="error" class="uk-text-danger">
      Hubo un error al cargar los datos. Intenta nuevamente.
    </div>

    <div v-if="!isLoading && !error">
      <div class="half-table">
        <table v-if="instrumentsData && instrumentsData.data">
          <thead>
            <tr>
              <th @click="sortData('name')" class="clickable-header">
                <strong>↑↓Nombre</strong>
              </th>
              <th @click="sortData('lastPrice')" class="clickable-header">
                <strong>↑↓Último*</strong>
              </th>
              <th @click="sortData('volumeMoney')" class="clickable-header">
                <strong>↑↓Monto</strong>
              </th>
              <th @click="sortData('pctDay')" class="clickable-header">
                <strong>↑↓Var Día</strong>
              </th>
              <th @click="sortData('pct30D')" class="clickable-header">
                <strong>↑↓Var 30d**</strong>
              </th>
              <th @click="sortData('pctCY')" class="clickable-header">
                <strong>↑↓Año Actual</strong>
              </th>
              <th @click="sortData('pct1Y')" class="clickable-header">
                <strong>↑↓12 Meses</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <InstrumentItemComponent
              v-for="instrument in splitData()[0]"
              :key="instrument.codeInstrument"
              :instrument="instrument"
              :sortData="sortData"
              :getClass="getClass"
              :formatValue="formatValue"
            />
          </tbody>
        </table>

        <table v-if="instrumentsData && instrumentsData.data">
          <thead>
            <tr>
              <th @click="sortData('name')" class="clickable-header">
                <strong>↑↓Nombre</strong>
              </th>
              <th @click="sortData('lastPrice')" class="clickable-header">
                <strong>↑↓Último*</strong>
              </th>
              <th @click="sortData('volumeMoney')" class="clickable-header">
                <strong>↑↓Monto</strong>
              </th>
              <th @click="sortData('pctDay')" class="clickable-header">
                <strong>↑↓Var Día</strong>
              </th>
              <th @click="sortData('pct30D')" class="clickable-header">
                <strong>↑↓Var 30d**</strong>
              </th>
              <th @click="sortData('pctCY')" class="clickable-header">
                <strong>↑↓Año Actual</strong>
              </th>
              <th @click="sortData('pct1Y')" class="clickable-header">
                <strong>↑↓12 Meses</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <InstrumentItemComponent
              v-for="instrument in splitData()[1]"
              :key="instrument.codeInstrument"
              :instrument="instrument"
              :sortData="sortData"
              :getClass="getClass"
              :formatValue="formatValue"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
}

th,
td {
  padding: 4px;
}

.half-table {
  display: flex;
  justify-content: space-between;
}

.half-table table {
  width: 48%;
}

.clickable-header {
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.clickable-header:hover {
  background-color: #f0f0f0;
  color: #007bff;
}
</style>
