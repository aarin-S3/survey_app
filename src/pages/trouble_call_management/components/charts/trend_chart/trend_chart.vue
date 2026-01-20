<template>
  <!-- Trend Chart Card -->
  <q-card flat bordered class="themed-card trend-chart-card" >
    <!-- Trend Chart Card Section -->
    <q-card-section class="trend-chart-card-section">
      <!-- Trend Chart Title -->
      <div class="text-subtitle2 text-weight-bold q-mb-sm trend-chart-title">
        {{ title }}
      </div>
      <!-- Trend Chart Wrapper -->
      <div class="trend-chart-wrapper">
        <!-- Trend Chart Canvas -->
        <canvas ref="chartRef"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script src="./trend_chart.js"></script>

<style scoped>
.trend-chart-card{
  margin-bottom: 10px;
  height: 230px;
}
.trend-chart-card-section{
  padding: 10px;
}
.trend-chart-title{
  font-size: 13px;
}
.trend-chart-wrapper{
  height: 190px;
}

</style>