<template>
  <!-- <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 13px !important;">
      <h3 
        :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;"
      >
        Weekly Incident Volume by Reporting Source
      </h3>
    </q-toolbar>
  </div> -->
  
  <div class="chart-wrapper">
    <div ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script src="./stacked_radial_bar_chart.js"></script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 80vh; /* Matches original style */
  min-height: 400px;
  position: relative;
}

.chart-container {
  width: 100%;
  height: 100%;
  border: none;
}
</style>