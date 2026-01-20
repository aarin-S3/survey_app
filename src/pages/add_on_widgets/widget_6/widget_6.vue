<template>
  <q-page class="">
    <pageHeader :title="strTitle"/>
    <div class="row justify-center">
      <stackedRadialBarChart 
        :customer-calls="dataCustomerCalls"
        :scada-data="dataSCADA"
        :mobile-data="dataMobileReport"
      />
    </div>
  </q-page>
</template>

<script src="./widget_6.js"></script>
<!-- <template>
  <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 13px !important;">
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;">
        Weekly Incident Volume by Reporting Source 
      </h3>
    </q-toolbar>
  </div>
  <div ref="chartRef" class="chart-container" style="height: 80vh"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import * as echarts from 'echarts';

const $q = useQuasar();
const chartRef = ref(null);
let myChart = null;
let animationInterval = null;

// --- Data Definitions (Reactive) ---
const angleCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Converted to refs for reactivity
const dataCustomerCalls = ref([120, 80, 75, 90, 150, 110, 95]);
const dataSCADA = ref([50, 40, 35, 45, 60, 30, 25]);
const dataMobileReport = ref([20, 15, 10, 18, 25, 12, 8]);

const legendData = ['Customer Calls', 'SCADA/ADMS Trip', 'Mobile Crew Report'];

// --- Helper: Random Integer Generator ---
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- Randomization Logic ---
const randomizeData = () => {
  // Generate random data for each day of the week (7 items)
  // We maintain the scale: Calls > SCADA > Mobile to keep the chart realistic
  dataCustomerCalls.value = angleCategories.map(() => getRandomInt(70, 160));
  dataSCADA.value = angleCategories.map(() => getRandomInt(20, 70));
  dataMobileReport.value = angleCategories.map(() => getRandomInt(5, 30));

  if (myChart) {
    myChart.setOption({
      series: [
        { data: dataCustomerCalls.value },
        { data: dataSCADA.value },
        { data: dataMobileReport.value }
      ]
    });
  }
};

// --- Dynamic Option Generator ---
const getChartOption = () => {
  const isDark = $q.dark.isActive;
  const isMobile = $q.screen.lt.md;

  // Define colors based on mode
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#ccc' : '#333333';
  const legendColor = isDark ? '#B0B0B0' : '#555555';
  const splitLineColor = isDark ? '#333' : '#e0e0e0';

  return {
    backgroundColor: backgroundColor,

    // --- Animation Config ---
    animationDuration: 1500,
    animationEasing: 'cubicOut', // Smooth outward expansion
    // This delay creates the "Rotational Ripple" effect
    // Data points update sequentially around the clock (Mon -> Sun)
    animationDelay: function (idx) {
      return idx * 100; 
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} incidents',
      backgroundColor: isDark ? 'rgba(50,50,50,0.7)' : 'rgba(255,255,255,0.9)',
      textStyle: {
        color: isDark ? '#fff' : '#333'
      }
    },
    legend: {
      show: true,
      data: legendData,
      top: 10,
      bottom: 0,
      textStyle: { color: legendColor }
    },
    polar: {
      center: isMobile ? ['50%', '50%'] : ['50%', '55%'],
      radius: ['0%', '65%'] 
      // radius: isMobile ? ['20%', '70%'] : ['20%', '80%']
    },
    // Angle Axis (Categories: Days of the Week)
    angleAxis: {
      type: 'category',
      data: angleCategories,
      axisLabel: { color: textColor },
      z: 10 
    },
    // Radial Axis (Values: Incident Count)
    radiusAxis: {
      axisLabel: { color: textColor },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        type: 'bar',
        data: dataCustomerCalls.value,
        coordinateSystem: 'polar',
        name: legendData[0],
        stack: 'incident_stack',
        emphasis: { focus: 'series' }
      },
      {
        type: 'bar',
        data: dataSCADA.value,
        coordinateSystem: 'polar',
        name: legendData[1],
        stack: 'incident_stack',
        emphasis: { focus: 'series' }
      },
      {
        type: 'bar',
        data: dataMobileReport.value,
        coordinateSystem: 'polar',
        name: legendData[2],
        stack: 'incident_stack',
        emphasis: { focus: 'series' }
      }
    ]
  };
};

const updateChart = () => {
  if (myChart) {
    myChart.setOption(getChartOption());
  }
};

// --- Lifecycle & Watchers ---

watch(() => $q.dark.isActive, () => {
  updateChart();
});

onMounted(() => {
  if (!chartRef.value) return;

  myChart = echarts.init(chartRef.value);
  updateChart();

  window.addEventListener('resize', handleResize);

  // Update data every 2.5 seconds
  animationInterval = setInterval(randomizeData, 2500);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (animationInterval) clearInterval(animationInterval);
  if (myChart) {
    myChart.dispose();
  }
});

const handleResize = () => {
  if (myChart) {
    myChart.resize();
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  border: none;
}
</style> -->