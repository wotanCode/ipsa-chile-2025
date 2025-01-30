<script setup>
import { onMounted } from "vue";
import { useInstrumentStore } from "@/stores/instrumentsStore";
import { storeToRefs } from "pinia";

const store = useInstrumentStore();
const { instrumentsData, isLoading, error } = storeToRefs(store);

onMounted(() => {
  store.loadInstruments();
});
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Último*</th>
          <th>Monto</th>
          <th>Var Día</th>
          <th>Var 30d</th>
          <th>Año Actual</th>
          <th>12 Meses</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="instrument in instrumentsData?.data.constituents"
          :key="instrument.codeInstrument"
        >
          <td>{{ instrument.name }}</td>
          <td>{{ instrument.lastPrice }}</td>
          <td>{{ instrument.volumeMoney }}</td>
          <td>{{ instrument.pctDay }}%</td>
          <td>{{ instrument.pct30D }}%</td>
          <td>{{ instrument.pctCY }}%</td>
          <td>{{ instrument.pct1Y }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f4f4f4;
}
</style>
