<template>
  <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 13px !important;">
      <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''"
        style="font-size: 1rem; display: inline-block; font-weight: 400; padding: 0px 8px;">
        OMS Control Room Shift Performance Profile
      </h3>
    </q-toolbar>
  </div>

  <div ref="chartRef" class="chart-container responsive-height"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import * as echarts from 'echarts';

const $q = useQuasar();
const chartRef = ref(null);
let myChart = null;
let resizeObserver = null;

// --- Data Definitions ---
const radar1Indicators = [
  { text: 'Restoration (min)', max: 120, abbr: 'Rest.' },
  { text: 'SAIDI (min)', max: 100, abbr: 'SAIDI' },
  { text: 'TCOMS Queue', max: 200, abbr: 'Queue' },
  { text: 'Error Rate (%)', max: 5, abbr: 'Errors' },
  { text: 'Dispatch (min)', max: 45, abbr: 'Disp.' }
];

const radar2Indicators = [
  { text: 'Accuracy', max: 100, abbr: 'Acc.' },
  { text: 'Planned Adherence', max: 100, abbr: 'Planned' },
  { text: 'SLDC Reporting', max: 100, abbr: 'SLDC' },
  { text: 'Work Order Comp.', max: 100, abbr: 'WO Comp.' },
  { text: 'GPS Tracking', max: 100, abbr: 'GPS' },
  { text: 'SCADA Health', max: 100, abbr: 'SCADA' }
];

const dataShiftA = [
  [75, 60, 150, 3.5, 30],
  [99, 99, 99.5, 90, 88, 85]
];

const dataShiftB = [
  [90, 85, 120, 1.5, 45],
  [98, 92, 99.8, 95, 95, 95]
];

// --- RESPONSIVE LAYOUT ENGINE ---
const getResponsiveSettings = () => {
  const width = chartRef.value ? chartRef.value.clientWidth : window.innerWidth;
  const isMobile = width < 650;

  return {
    isMobile,
    
    // --- GAP REDUCTION LOGIC ---
    // Mobile Centers: Changed from 25%/75% to 30%/70% to pull them closer
    center1: isMobile ? ['50%', '25%'] : ['25%', '50%'],
    center2: isMobile ? ['50%', '67%'] : ['75%', '50%'],
    
    // Radius: Slightly increased on mobile since we have more vertical room now
    radius: isMobile ? '38%' : 110,
    
    indicatorKey: isMobile ? 'abbr' : 'text',
    axisFontSize: isMobile ? 9 : 11,
    legendTop: isMobile ? 0 : 35
  };
};

const getOption = () => {
  const isDark = $q.dark.isActive;
  const layout = getResponsiveSettings();

  const bgColor = isDark ? '#121212' : '#ffffff';
  const legendColor = isDark ? '#B3B3B3' : '#666';
  const labelColor = isDark ? '#B3B3B3' : '#444';
  const splitLineColor = isDark ? 'rgba(179, 179, 179, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  
  const shiftBAreaGradient = new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
    { offset: 0, color: isDark ? 'rgba(207, 102, 121, 0.1)' : 'rgba(198, 40, 40, 0.1)' },
    { offset: 1, color: isDark ? 'rgba(207, 102, 121, 0.6)' : 'rgba(198, 40, 40, 0.5)' }
  ]);

  const splitAreaColors = isDark
    ? ['#1F2328', '#252A30', '#2B3138', '#313840']
    : ['#ffffff', '#f5f5f5', '#ffffff', '#f5f5f5'];

  const colorPalette = isDark ? ['#BB86FC', '#CF6679'] : ['#6200EA', '#C62828'];

  const mapIndicators = (indicators, minVal = 0) => {
    return indicators.map(item => ({
      text: item[layout.indicatorKey],
      max: item.max,
      min: minVal
    }));
  };

  return {
    backgroundColor: bgColor,
    color: colorPalette,
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      borderColor: isDark ? '#444' : '#ccc',
      textStyle: { color: isDark ? '#E8E8E8' : '#333' }
    },
    legend: {
      data: ['Shift A (Day)', 'Shift B (Night)'],
      top: layout.legendTop,
      textStyle: { color: legendColor, fontSize: 12 }
    },
    radar: [
      {
        indicator: mapIndicators(radar1Indicators, 0),
        center: layout.center1,
        radius: layout.radius,
        startAngle: 90,
        splitNumber: 4,
        shape: 'polygon',
        axisName: {
          color: labelColor,
          fontSize: layout.axisFontSize,
          formatter: (value) => layout.isMobile ? value : `{a|Goal: ${value}}`,
          rich: {
            a: { color: colorPalette[0], fontSize: 10, align: 'center', padding: [2,0] }
          }
        },
        splitArea: { areaStyle: { color: splitAreaColors } },
        axisLine: { lineStyle: { color: splitLineColor } },
        splitLine: { lineStyle: { color: splitLineColor } }
      },
      {
        indicator: mapIndicators(radar2Indicators, 80),
        center: layout.center2,
        radius: layout.radius,
        axisName: {
          color: labelColor,
          fontSize: layout.axisFontSize,
          formatter: (value) => layout.isMobile ? value : `{a|Max: ${value}}`,
          rich: {
            a: { color: isDark ? '#91CC75' : '#2E7D32', fontSize: 10, align: 'center', padding: [2,0] }
          }
        },
        splitArea: { areaStyle: { color: splitAreaColors } },
        axisLine: { lineStyle: { color: splitLineColor } },
        splitLine: { lineStyle: { color: splitLineColor } }
      }
    ],
    series: [
      {
        type: 'radar',
        radarIndex: 0,
        name: 'Reliability',
        symbolSize: 4,
        data: [
          {
            value: dataShiftA[0],
            name: 'Shift A (Day)',
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.3 }
          },
          {
            value: dataShiftB[0],
            name: 'Shift B (Night)',
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.3 }
          }
        ]
      },
      {
        type: 'radar',
        radarIndex: 1,
        name: 'Efficiency',
        symbolSize: 4,
        data: [
          {
            value: dataShiftA[1],
            name: 'Shift A (Day)',
            symbol: 'circle',
            lineStyle: { width: 2 },
            areaStyle: { opacity: 0.3 }
          },
          {
            value: dataShiftB[1],
            name: 'Shift B (Night)',
            symbol: 'rect',
            lineStyle: { type: 'dashed', width: 2 },
            areaStyle: { color: shiftBAreaGradient }
          }
        ]
      }
    ]
  };
};

onMounted(() => {
  if (!chartRef.value) return;
  myChart = echarts.init(chartRef.value);
  myChart.setOption(getOption());

  resizeObserver = new ResizeObserver(() => {
    if (myChart) {
      myChart.resize();
      myChart.setOption(getOption());
    }
  });
  resizeObserver.observe(chartRef.value);
});

watch(() => $q.dark.isActive, () => {
  if (myChart) myChart.setOption(getOption());
});

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect();
  if (myChart) myChart.dispose();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  border: none;
}

/* Responsive Height Strategy */
.responsive-height {
  /* Default Desktop */
  height: 80vh;
  min-height: 500px;
}

/* Mobile: Compacted Height to reduce gap perception */
@media (max-width: 650px) {
  .responsive-height {
    /* Slightly shorter than before to bring items naturally closer */
    height: 65vh; 
    min-height: 600px;
  }
}
</style>