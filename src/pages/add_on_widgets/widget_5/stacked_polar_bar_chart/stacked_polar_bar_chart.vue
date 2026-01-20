<template>
  
  <div class="chart-wrapper">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script src="./stacked_polar_bar_chart.js"></script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 400px;
  border-radius: 10px;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
  border: none;
}
</style>