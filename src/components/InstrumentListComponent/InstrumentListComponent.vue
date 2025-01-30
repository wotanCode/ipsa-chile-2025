<script setup>
import { onMounted } from "vue";
import { useInstrumentStore } from "@/stores/instrumentsStore";
import { storeToRefs } from "pinia";

const store = useInstrumentStore();
const { instrumentsData, isLoading, error } = storeToRefs(store);

const splitData = (data) => {
  const mid = Math.ceil(data.length / 2);
  return [data.slice(0, mid), data.slice(mid)];
};

const getClass = (value) => {
  return value < 0 ? "uk-text-danger" : "uk-text-success";
};

const formatValue = (value) => {
  return value ? value.toFixed(2) : "0.00";
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
        <table v-if="instrumentsData">
          <thead>
            <tr>
              <th><strong>Nombre</strong></th>
              <th>Último*</th>
              <th>Monto</th>
              <th>Var Día</th>
              <th>Var 30d**</th>
              <th>Año Actual</th>
              <th>12 Meses</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="instrument in splitData(
                instrumentsData.data.constituents
              )[0]"
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

        <table v-if="instrumentsData">
          <thead>
            <tr>
              <th><strong>Nombre</strong></th>
              <th>Último*</th>
              <th>Monto</th>
              <th>Var Día</th>
              <th>Var 30d**</th>
              <th>Año Actual</th>
              <th>12 Meses</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="instrument in splitData(
                instrumentsData.data.constituents
              )[1]"
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
