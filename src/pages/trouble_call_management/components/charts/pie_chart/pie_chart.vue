<template>
  <!-- Pie Chart Card -->
  <q-card flat bordered class="themed-card pie-chart-card">
    <!-- Pie Chart Card Section -->
    <q-card-section class="pie-chart-card-section">
      <!-- Pie Chart Title -->
      <div class="text-subtitle2 text-weight-bold q-mb-sm pie-chart-title">
        {{ title }}
      </div>
      <!-- Pie Chart Wrapper -->
      <div class="pie-chart-wrapper">
        <!-- Pie Chart Canvas -->
        <canvas class="pie-chart-canvas" ref="pieChart"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script src="./pie_chart.js"></script>

<style scoped>

.pie-chart-card{
  height: 243px;
}

.pie-chart-card-section{
  padding: 10px;
}

.pie-chart-title{
  font-size: 11px;
}

.pie-chart-wrapper{
  height: 198px; 
  display: flex; 
  align-items: center;
}

.pie-chart-canvas{
  max-width: 100%; 
  max-height: 200px;
}
</style>
