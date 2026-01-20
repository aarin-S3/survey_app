<template>
   <!-- Bar Chart Container -->
   <div ref="chartjs_bar_chart" :class="chartClass"
      :style="$q.dark.isActive ? 'background:#1d1d1d !important; border-color:#1d1d1d;' : 'border: 1px solid lightgray;'">
      <!-- Bar Chart Canvas -->
      <canvas ref="myCanvas" class="chart-canvas"></canvas>
   </div>
</template>

<script src="./bar_chart.js"></script>

<style lang="sass" scoped>

.chart-container
  width: 100%
  border-radius: 4px
  padding-bottom: 4px !important
  padding: 4px !important
  background: white

.crew-container-height
  height: 235px !important

.tabulator-container
  width: 100%
  height: 100%
  background-color: white
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  
  .q-dark & 
    background-color: #1f1f1f
    color: #e0e0e0
    border: 1px solid #333
    box-shadow: 0 2px 10px rgba(255,255,255,0.05)

.table-outer-wrapper
  width: 100%
  // Height calculation for Desktop
  height: calc(100vh - 32.7vh)
  
  // Responsive height for smaller screens (prevent squishing)
  @media (max-width: 1024px)
    width: 96vw
    height: 600px
    margin-bottom: 10px

.responsive-chart-height
  // Height calculation for Desktop (Sidebar mode)
  height: calc((100vh - 34vh) / 3) !important
  min-height: 150px
  
  // Height for Tablet/Mobile (Horizontal Row mode)
  @media (max-width: 1023px)
    height: 250px !important
    margin-bottom: 5px

</style>
<style scoped>
.graph-container {
   width: 99%;
   height: 200px;
   min-height: 180px;
   border-radius: 4px;
   padding: 4px;
   background: white;
   position: relative;
   overflow: hidden;
}

.chart-container-dark{
   
}

.chart-canvas {
   width: 100%;
   height: 100%;
}
</style>