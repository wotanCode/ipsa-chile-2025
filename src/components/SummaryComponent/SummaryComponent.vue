<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResumeStore } from "@/stores/resumeStore";

const resumeStore = useResumeStore();
const { marketInfo, priceInfo } = storeToRefs(resumeStore);
</script>

<template>
  <div class="summary-container">
    <h3>DETALLES</h3>
    <hr />

    <div class="summary-section">
      <h4>COTIZACIÓN</h4>
      <p>{{ priceInfo?.datetimeLastPrice || "-" }}</p>
    </div>

    <hr />

    <div class="resume-section">
      <div class="merchant-info">
        <h4>MERCADO</h4>
        <p>
          <strong>{{ marketInfo?.marketName || "-" }}</strong>
        </p>
      </div>

      <ul>
        <li class="merchant-info">
          <p>Cierre anterior:</p>
          <p>{{ priceInfo?.closePrice || "-" }}</p>
        </li>
        <li class="merchant-info">
          <p>Máximo diario:</p>
          <p>{{ priceInfo?.maxDay || "-" }}</p>
        </li>
        <li class="merchant-info">
          <p>Mínimo diario:</p>
          <p>{{ priceInfo?.minDay || "-" }}</p>
        </li>
        <li class="merchant-info">
          <p>Máximo 52 semanas:</p>
          <p>{{ priceInfo?.max52W || "-" }}</p>
        </li>
        <li class="merchant-info">
          <p>Mínimo 52 semanas:</p>
          <p>{{ priceInfo?.min52W || "-" }}</p>
        </li>
      </ul>
    </div>

    <hr />

    <div class="resume-section">
      <h3>VARIACIÓN</h3>
      <ul>
        <li class="merchant-info">
          <p>1 mes:</p>
          <p
            :class="{
              'uk-text-success': priceInfo?.pct30D && priceInfo.pct30D > 0,
              'uk-text-danger': priceInfo?.pct30D && priceInfo.pct30D < 0,
            }"
          >
            {{
              priceInfo?.pct30D !== undefined
                ? (priceInfo.pct30D * 100).toFixed(2)
                : "-"
            }}%
          </p>
        </li>

        <li class="merchant-info">
          <p>1 año:</p>
          <p
            :class="{
              'uk-text-success': priceInfo?.pctRelCY && priceInfo.pctRelCY > 0,
              'uk-text-danger': priceInfo?.pctRelCY && priceInfo.pctRelCY < 0,
            }"
          >
            {{
              priceInfo?.pctRelW52 !== undefined
                ? (priceInfo.pctRelW52 * 100).toFixed(2)
                : "-"
            }}%
          </p>
        </li>

        <li class="merchant-info">
          <p>Año a la fecha:</p>

          <p
            :class="{
              'uk-text-success': priceInfo?.pctRelCY && priceInfo.pctRelCY > 0,
              'uk-text-danger': priceInfo?.pctRelCY && priceInfo.pctRelCY < 0,
            }"
          >
            {{
              priceInfo?.pctRelCY !== undefined
                ? (priceInfo.pctRelCY * 100).toFixed(2)
                : "-"
            }}%
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h3,
h4 {
  font-size: 1rem;
  font-weight: bold;
  color: #f1f1f1;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

ul {
  list-style: none;
  padding: 0;
}

p,
li {
  margin: 0;
  padding: 0;
  font-size: 12px;
}

hr {
  margin: 10px 0;
}

.summary-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #f1f1f1;
}

.summary-section,
.merchant-info {
  display: flex;
  justify-content: space-between;
}
</style>
