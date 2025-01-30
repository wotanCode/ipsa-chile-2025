<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resumeStore";

const resumeStore = useResumeStore();
const { marketInfo, priceInfo } = storeToRefs(resumeStore);
</script>

<template>
  <div class="summary-container">
    <!-- Sección 1: Cotización -->
    <div class="summary-section">
      <h3>Cotización</h3>
      <p>{{ priceInfo?.datetimeLastPrice || "-" }}</p>
    </div>

    <!-- Sección 2: Información del mercado -->
    <div class="summary-section">
      <h3>Mercado</h3>
      <p>
        <strong>{{ marketInfo?.marketName || "-" }}</strong>
      </p>
      <ul>
        <li>Cierre anterior: {{ priceInfo?.closePrice || "-" }}</li>
        <li>Máximo diario: {{ priceInfo?.maxDay || "-" }}</li>
        <li>Mínimo diario: {{ priceInfo?.minDay || "-" }}</li>
        <li>Máximo 52 semanas: {{ priceInfo?.max52W || "-" }}</li>
        <li>Mínimo 52 semanas: {{ priceInfo?.min52W || "-" }}</li>
      </ul>
    </div>

    <!-- Sección 3: Desempeño -->
    <div class="summary-section">
      <h3>Desempeño</h3>
      <ul>
        <li
          :class="{
            'uk-text-success': priceInfo?.pct30D > 0,
            'uk-text-danger': priceInfo?.pct30D < 0,
          }"
        >
          1 mes: {{ (priceInfo?.pct30D * 100).toFixed(2) }}%
        </li>
        <li
          :class="{
            'uk-text-success': priceInfo?.pctRelW52 > 0,
            'uk-text-danger': priceInfo?.pctRelW52 < 0,
          }"
        >
          1 año: {{ (priceInfo?.pctRelW52 * 100).toFixed(2) }}%
        </li>
        <li
          :class="{
            'uk-text-success': priceInfo?.pctRelCY > 0,
            'uk-text-danger': priceInfo?.pctRelCY < 0,
          }"
        >
          Año a la fecha: {{ (priceInfo?.pctRelCY * 100).toFixed(2) }}%
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.summary-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  color: #f1f1f1;
}

.summary-section {
  background: #2a2a2a;
  padding: 1rem;
  border-radius: 6px;
}

h3 {
  margin-bottom: 0.5rem;
  color: #fff;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.25rem 0;
}
</style>
