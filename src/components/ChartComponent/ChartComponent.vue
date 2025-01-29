<template>
  <div>
    <p>{{ chartData ? "Grafico" : "Sin datos" }}</p>
    <canvas ref="chartCanvas"></canvas>
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
          data: this.chartData, // Asume que chartData es el objeto adecuado para Chart.js
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Gráfico de ejemplo",
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
