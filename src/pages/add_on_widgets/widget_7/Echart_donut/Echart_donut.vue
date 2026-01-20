<template>
  <div class="chart-wrapper">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script src="./Echart_donut.js"></script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: calc(100vh - 100px);
  min-height: 400px;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
  border: none;
}
</style>