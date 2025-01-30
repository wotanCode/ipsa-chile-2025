<script setup>
import { onMounted, ref } from "vue";
import { useInstrumentStore } from "@/stores/instrumentsStore";
import { storeToRefs } from "pinia";

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
              <th @click="sortData('name')">
                <strong>↑↓Nombre</strong>
              </th>
              <th @click="sortData('lastPrice')">
                <strong>↑↓Último*</strong>
              </th>
              <th @click="sortData('volumeMoney')">
                <strong>↑↓Monto</strong>
              </th>
              <th @click="sortData('pctDay')">
                <strong>↑↓Var Día</strong>
              </th>
              <th @click="sortData('pct30D')">
                <strong>↑↓Var 30d**</strong>
              </th>
              <th @click="sortData('pctCY')">
                <strong>↑↓Año Actual</strong>
              </th>
              <th @click="sortData('pct1Y')">
                <strong>↑↓12 Meses</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="instrument in splitData()[0]"
              :key="instrument.codeInstrument"
            >
              <td>
                <strong>{{ instrument.name }}</strong>
              </td>
              <td>{{ instrument.lastPrice }}</td>
              <td>{{ instrument.volumeMoney }}</td>
              <td :class="getClass(instrument.pctDay)">
                {{ formatValue(instrument.pctDay) }}%
              </td>
              <td :class="getClass(instrument.pct30D)">
                {{ formatValue(instrument.pct30D) }}%
              </td>
              <td :class="getClass(instrument.pctCY)">
                {{ formatValue(instrument.pctCY) }}%
              </td>
              <td :class="getClass(instrument.pct1Y)">
                {{ formatValue(instrument.pct1Y) }}%
              </td>
            </tr>
          </tbody>
        </table>

        <table v-if="instrumentsData && instrumentsData.data">
          <thead>
            <tr>
              <th @click="sortData('name')">
                <strong>↑↓Nombre</strong>
              </th>
              <th @click="sortData('lastPrice')">
                <strong>↑↓Último*</strong>
              </th>
              <th @click="sortData('volumeMoney')">
                <strong>↑↓Monto</strong>
              </th>
              <th @click="sortData('pctDay')">
                <strong>↑↓Var Día</strong>
              </th>
              <th @click="sortData('pct30D')">
                <strong>↑↓Var 30d**</strong>
              </th>
              <th @click="sortData('pctCY')">
                <strong>↑↓Año Actual</strong>
              </th>
              <th @click="sortData('pct1Y')">
                <strong>↑↓12 Meses</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="instrument in splitData()[1]"
              :key="instrument.codeInstrument"
            >
              <td>
                <strong>{{ instrument.name }}</strong>
              </td>
              <td>{{ instrument.lastPrice }}</td>
              <td>{{ instrument.volumeMoney }}</td>
              <td :class="getClass(instrument.pctDay)">
                {{ formatValue(instrument.pctDay) }}%
              </td>
              <td :class="getClass(instrument.pct30D)">
                {{ formatValue(instrument.pct30D) }}%
              </td>
              <td :class="getClass(instrument.pctCY)">
                {{ formatValue(instrument.pctCY) }}%
              </td>
              <td :class="getClass(instrument.pct1Y)">
                {{ formatValue(instrument.pct1Y) }}%
              </td>
            </tr>
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
</style>
