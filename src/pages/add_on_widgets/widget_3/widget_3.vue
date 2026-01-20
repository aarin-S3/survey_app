<template>
  <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 13px !important;">
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;">
        Outage Distribution by Cause
      </h3>
    </q-toolbar>
  </div>

  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import * as echarts from 'echarts';

const $q = useQuasar();
const chartRef = ref(null);
let myChart = null;
let intervalId = null;
let resizeObserver = null;

let outageCauseData = [
  { value: 45, name: 'Equipment Failure' },
  { value: 38, name: 'Vegetation (Trees)' },
  { value: 32, name: 'Weather / Storm' },
  { value: 30, name: 'Planned Maintenance' },
  { value: 28, name: 'Animal / Wildlife' },
  { value: 26, name: 'Third-Party Damage' },
  { value: 22, name: 'Lightning' },
  { value: 18, name: 'Unknown / Other' }
];

const deepDarkColors = ['#C24E4E', '#387B67', '#375A96', '#A0773C', '#876B9B', '#8C594A', '#B8933D', '#44475A'];
const lightColors = ['#EE6666', '#5470C6', '#91CC75', '#FAC858', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4'];

// --- SMART LAYOUT CALCULATOR ---
const getResponsiveSettings = () => {
  const width = chartRef.value ? chartRef.value.clientWidth : window.innerWidth;
  const isMobile = width < 550;
  const isTiny = width < 360;

  return {
    isMobile,
    isTiny,
    // Dynamic Radii: Use percentages for Rose charts so they scale with screen size automatically
    // Mobile: Smaller radius to prevent outer petals from getting clipped
    radius: isMobile ? ['10%', '55%'] : ['10%', '65%'],
    // Center logic: Move it down slightly on mobile to make room for the legend at the top
    center: isMobile ? ['50%', '55%'] : ['50%', '55%'],
    // Font adjustments
    fontSize: isMobile ? 11 : 13,
    itemGap: isMobile ? 5 : 15
  };
};

// --- Dynamic Option Generator ---
const getOption = () => {
  const isDark = $q.dark.isActive;
  const layout = getResponsiveSettings();

  return {
    backgroundColor: isDark ? '#121212' : '#ffffff',
    tooltip: {
      trigger: 'item',
      confine: true, // Prevents tooltip from being cut off
      backgroundColor: isDark ? 'rgba(50, 50, 50, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDark ? '#555' : '#ccc',
      textStyle: { color: isDark ? '#90a4ae' : '#333' },
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      top: 5,
      type: 'scroll', // Makes legend scrollable if it overflows on small screens
      textStyle: { color: isDark ? '#B0B0B0' : '#333333' },
      itemGap: layout.itemGap
    },
    animationDuration: 1000,
    animationDurationUpdate: 800,
    animationEasing: 'cubicInOut',
    animationEasingUpdate: 'cubicInOut',
    series: [
      {
        name: 'Outage Cause',
        type: 'pie',
        // Dynamic Radius and Center
        radius: layout.radius,
        center: layout.center,
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
          borderColor: isDark ? '#121212' : '#ffffff',
          borderWidth: 2
        },
        color: isDark ? deepDarkColors : lightColors,
        data: outageCauseData,
        label: {
          color: isDark ? '#C0C0C0' : '#333333',
          fontSize: layout.fontSize,
          // Hide labels on very tiny screens to avoid clutter, or show simple format
          show: !layout.isTiny, 
          formatter: '{b}' 
        },
        labelLine: {
          show: !layout.isTiny,
          length: layout.isMobile ? 5 : 15, // Short lines on mobile
          lineStyle: { color: isDark ? '#555' : '#ccc' }
        }
      }
    ]
  };
};

const simulateDynamicData = () => {
  if (!myChart) return;

  outageCauseData = outageCauseData.map(item => {
    const fluctuation = Math.floor((Math.random() - 0.5) * 15);
    let newValue = item.value + fluctuation;
    newValue = Math.max(5, newValue);
    newValue = Math.min(120, newValue);
    return { ...item, value: newValue };
  });

  myChart.setOption({ series: [{ data: outageCauseData }] });
};

watch(() => $q.dark.isActive, () => {
  if (myChart) myChart.setOption(getOption());
});

onMounted(() => {
  if (!chartRef.value) return;

  myChart = echarts.init(chartRef.value);
  myChart.setOption(getOption());

  // --- Resize Observer (Handles rotation/layout changes) ---
  resizeObserver = new ResizeObserver(() => {
    if (myChart) {
      myChart.resize();
      myChart.setOption(getOption()); // Recalculate radius/fonts
    }
  });
  resizeObserver.observe(chartRef.value);

  intervalId = setInterval(simulateDynamicData, 1000);
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (intervalId) clearInterval(intervalId);
  if (myChart) myChart.dispose();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  /* Default Responsive Height */
  height: 70vh;
  min-height: 400px;
  border: none;
}

/* Mobile Portrait */
@media (max-width: 600px) {
  .chart-container {
    height: 60vh;
    min-height: 350px;
  }
}

/* Mobile Landscape (Fix for short screens) */
@media (max-height: 500px) and (orientation: landscape) {
  .chart-container {
    height: 90vh; 
    min-height: 280px;
  }
}
</style>