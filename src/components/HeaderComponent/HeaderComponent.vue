<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useChartStore } from "@/stores/chartStore";
import { computed } from "vue";

const store = useChartStore();
const { selectedKey, jsonData, tabOptions, selectedTimeframe } =
  storeToRefs(store);

const timeframeMapping: Record<string, number> = {
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "12M": 365,
};

const currentData = computed(() => {
  const tab = tabOptions.value.find((t) => t.key === selectedKey.value);
  const data = jsonData.value[selectedKey.value];

  if (!data || !data.datasets[0]?.data.length) {
    return {
      name: tab?.name || "N/A",
      country: tab?.country || "N/A",
      currentValue: "N/A",
      percentageChange: "N/A",
      pointsChange: "N/A",
    };
  }

  const prices = data.datasets[0]?.data;
  const lastPrice = prices.at(-1);

  const daysAgo = timeframeMapping[selectedTimeframe.value] || 30;
  const pastIndex = Math.max(prices.length - 1 - daysAgo, 0);
  const pastPrice = prices[pastIndex];

  if (typeof lastPrice !== "number" || typeof pastPrice !== "number") {
    return {
      name: tab?.name || "N/A",
      country: tab?.country || "N/A",
      currentValue: "N/A",
      percentageChange: "N/A",
      pointsChange: "N/A",
    };
  }

  const pointsChange = lastPrice - pastPrice;
  const percentageChange = (pointsChange / pastPrice) * 100;

  return {
    name: tab?.name || "N/A",
    country: tab?.country || "N/A",
    currentValue: lastPrice.toLocaleString("es-CL"),
    percentageChange: `${percentageChange.toFixed(2)}%`,
    pointsChange: pointsChange.toLocaleString("es-CL"),
    pointsChangeNegative: pointsChange < 0,
    percentageChangeNegative: percentageChange < 0,
    pointsChangePositive: pointsChange > 0,
    percentageChangePositive: percentageChange > 0,
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
        <span
          :class="{
            'uk-text-danger': currentData.percentageChangeNegative,
            'uk-text-success': currentData.percentageChangePositive,
          }"
        >
          {{ currentData.percentageChange }}
        </span>
      </li>
      <li class="valueItem">
        Var. Puntos Actual:
        <span
          :class="{
            'uk-text-danger': currentData.pointsChangeNegative,
            'uk-text-success': currentData.pointsChangePositive,
          }"
        >
          {{ currentData.pointsChange }}
        </span>
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
