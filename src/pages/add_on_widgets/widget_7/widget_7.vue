<template>
  <q-page>
    <pageHeader :title="strTitle" />
    <div class="row justify-center">
      <Echart_donut :chart-data="ticketData" />
    </div>
  </q-page>
</template>

<script src="./widget_7.js"></script>

<!-- <template>
  <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 10px !important;">
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;">
        OMS Current Trouble Ticket Status
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
let animationInterval = null;

// --- Color Palette ---
const PIE_COLORS = [
  '#FF6B6B',  // Red - High Priority
  '#FFC400',  // Amber - Work in Progress
  '#58A6FF',  // Blue - Assigned
  '#03DAC6',  // Teal - Pending
  '#91CC75'   // Green - Closed
];

// --- Data Definition (Reactive) ---
const chartData = ref([
  { value: 120, name: 'Open - High Priority' },
  { value: 450, name: 'Work in Progress' },
  { value: 300, name: 'Assigned Dispatch' },
  { value: 180, name: 'Pending Feedback' },
  { value: 500, name: 'Closed Today' }
]);

// --- Helper: Random Integer Generator ---
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// --- Randomization Logic ---
const randomizeData = () => {
  // Update values randomly within realistic ranges
  chartData.value = [
    { value: getRandomInt(50, 150), name: 'Open - High Priority' },
    { value: getRandomInt(300, 500), name: 'Work in Progress' },
    { value: getRandomInt(200, 400), name: 'Assigned Dispatch' },
    { value: getRandomInt(100, 250), name: 'Pending Feedback' },
    { value: getRandomInt(400, 600), name: 'Closed Today' }
  ];

  if (myChart) {
    myChart.setOption({
      series: [
        { data: chartData.value }
      ]
    });
  }
};

// --- Dynamic Option Generator ---
const getChartOption = () => {
  const isDark = $q.dark.isActive;
  const isMobile = $q.screen.lt.md;

  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const textColor = isDark ? '#E8E8E8' : '#9e9e9e';
  const borderColor = isDark ? '#121212' : '#ffffff'; 

  return {
    backgroundColor: backgroundColor,
    color: PIE_COLORS,

    // --- Animation Config ---
    animationDuration: 1000,
    animationEasing: 'cubicInOut', // Smooth expansion/contraction of arcs

    tooltip: {
      trigger: 'item',
      formatter: '{b} <br/>Tickets: {c} ({d}%)',
      backgroundColor: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      textStyle: { 
        color: isDark ? '#E8E8E8' : '#333' 
      },
      borderColor: isDark ? '#333' : '#ccc',
      borderWidth: 1
    },

    legend: {
      top: '1%',
      left: 'center',
      textStyle: { color: textColor }
    },

    series: [
      {
        name: 'Trouble Ticket Status',
        type: 'pie',
        radius: ['40%', '70%'],
        center: isMobile ? ['50%', '43%'] : ['50%', '50%'],
        avoidLabelOverlap: false,

        itemStyle: {
          borderRadius: 10,
          borderColor: borderColor, 
          borderWidth: 3
        },

        label: {
          show: false,
          position: 'center'
        },

        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: textColor 
          }
        },

        labelLine: {
          show: false
        },

        data: chartData.value
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

  // Animate every 2 seconds
  animationInterval = setInterval(randomizeData, 2000);
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
  height: calc(100vh - 100px);
  border: none;
}
</style> -->