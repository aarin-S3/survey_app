<template>
  <div class="flex flex-center full-width">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script src="./nested_pie_chart.js"></script>

<style scoped>
.full-width { width: 100%; }
.chart-container {
  width: 100%;
  max-width: 1200px; 
  height: 85vh;
  min-height: 400px;
  border: none;
  border-bottom: none;
}
@media (max-width: 600px) {
  .chart-container { height: 70vh; min-height: 300px; }
}
</style>