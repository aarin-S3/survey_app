<template>
  <!-- Multi Bar Chart Card -->
  <q-card flat bordered class="themed-card multi-bar-chart-card">
    <!-- Multi Bar Chart Card Section -->
    <q-card-section class="multi-bar-chart-card-section">
      <!-- Multi Bar Chart Title -->
      <div class="text-subtitle2 text-weight-bold q-mb-sm multi-bar-chart-title">
        {{ title }}
      </div>
      <!-- Multi Bar Chart Wrapper -->
      <div class="multi-bar-chart-wrapper">
        <!-- Multi Bar Chart Canvas --> 
        <canvas ref="multiBarChart"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script src="./multi_bar_chart.js"></script>

<style scoped>

  .multi-bar-chart-card{
    height: 243px; 
  }

  .multi-bar-chart-card-section{
    padding: 10px;
  }

  .multi-bar-chart-title{
    font-size: 11px;
  }

  .multi-bar-chart-wrapper{
    height: 198px;
  }

</style>
