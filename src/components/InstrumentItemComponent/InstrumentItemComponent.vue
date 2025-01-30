<script setup>
defineProps({
  instrument: Object,
  sortData: Function,
  getClass: Function,
  formatValue: Function,
});
</script>

<template>
  <tr :key="instrument.codeInstrument">
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
</template>
