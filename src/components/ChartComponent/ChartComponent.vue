<template>
  <div>
    <canvas ref="chartCanvas"></canvas>

    <div class="uk-button-group uk-margin-top">
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        1M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        3M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        6M
      </button>
      <button
        class="uk-button uk-button-small uk-button-default uk-text-bold btnTime"
      >
        1A
      </button>
    </div>
  </div>
</template>

<script>
import { Line } from "chart.js";

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chartData) {
        const ctx = this.$refs.chartCanvas.getContext("2d");
        new Line(ctx, {
          type: "line",
          data: this.chartData,
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Gráfico",
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.btnTime {
  color: #f1f1f1;
  border-radius: 8px;
  font-size: 0.85rem;
}
</style>
