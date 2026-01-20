<template>
  <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'">
    <div ref="chartRef" class="chart-container"
      :style="$q.dark.isActive ? 'border:none;' : 'border: 1px solid lightgray;'"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import * as echarts from 'echarts';

const $q = useQuasar();
const chartRef = ref(null);
let myChart = null;

// The prop expects a SINGLE object now, not an array
const props = defineProps({
  data: {
    type: Object, 
    required: true,
    default: () => ({ indicators: [], chartData: [] })
  }
})

// --- 2. Dynamic Option Generator ---
const getChartOption = (isDark) => {
  if (!props.data?.indicators) return {};

  const colors = {
    textMain: isDark ? '#E8E8E8' : '#2C3E50',
    textSub: isDark ? '#B3B3B3' : '#607D8B',
    tooltipBg: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    tooltipBorder: isDark ? '#444' : '#ccc',
    splitArea: isDark ? ['#18191A', '#202224', '#282B2F', '#303438'] : ['#FFFFFF', '#F5F7FA', '#FFFFFF', '#F5F7FA'],
    axisLine: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    splitLine: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    axisName: isDark ? '#9e9e9e' : '#9e9e9e',
    s1Line: isDark ? '#CF6679' : '#D32F2F',
    s1Area: isDark ? 'rgba(207, 102, 121, 0.1)' : 'rgba(211, 47, 47, 0.1)',
    s2Line: isDark ? '#BB86FC' : '#6200EE',
    s2Area: isDark ? 'rgba(187, 134, 252, 0.4)' : 'rgba(98, 0, 238, 0.2)'
  };

  return {
    backgroundColor: 'transparent',
    title: {
      text: 'System Accuracy Profile',
      left: 'center',
      top: 5,
      textStyle: { color: '#9e9e9e', fontSize: 14, fontWeight: '400', fontFamily: 'Roboto, sans-serif' }
    },
    tooltip: {
      trigger: 'item',
      confine: true,
      backgroundColor: colors.tooltipBg,
      borderColor: colors.tooltipBorder,
      textStyle: { color: colors.textMain, fontSize: 11 },
      formatter: (params) => {
        let output = `<div style="font-weight:bold; margin-bottom:4px; font-size:11px; color:${colors.textMain}">${params.name}</div>`;
        props.data.indicators.forEach((ind, i) => {
           // Safe check to avoid undefined error if data length mismatches
           const val = params.value[i] !== undefined ? params.value[i] : 'N/A';
           output += `<div style="display:flex; justify-content:space-between; min-width:130px; margin-bottom:2px;">
             <span style="color:${colors.textSub}">${ind.name}:</span>
             <span style="font-weight:bold; color:${colors.textMain}">${val}%</span>
           </div>`;
        });
        return output;
      }
    },
    legend: {
      top: 40,
      bottom: 0,
      data: ['SLA Target', 'Current Accuracy'],
      fontFamily: 'Roboto, sans-serif',
      itemGap: 10,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: { color: '#9e9e9e', fontSize: 11 }
    },
    radar: {
      indicator: props.data.indicators,
      radius: '55%',
      center: ['50%', '57%'],
      shape: 'polygon',
      splitNumber: 4,
      axisName: {
        color: colors.axisName,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 12,
        formatter: (value) => value.replace(' ', '\n')
      },
      splitArea: { show: true, areaStyle: { color: colors.splitArea, shadowColor: 'rgba(0, 0, 0, 0.1)', shadowBlur: 5 } },
      axisLine: { lineStyle: { color: colors.axisLine } },
      splitLine: { lineStyle: { color: colors.splitLine } }
    },
    series: [
      {
        name: 'System Accuracy',
        type: 'radar',
        symbolSize: 4,
        data: [
          {
            value: props.data.chartData[0].value,
            name: props.data.chartData[0].name,
            lineStyle: { type: 'dashed', color: colors.s1Line, width: 1 },
            areaStyle: { color: colors.s1Area },
            symbol: 'none',
            itemStyle: { color: colors.s1Line }
          },
          {
            value: props.data.chartData[1].value,
            name: props.data.chartData[1].name,
            lineStyle: { color: colors.s2Line, width: 2 },
            areaStyle: { color: colors.s2Area },
            symbol: 'circle',
            itemStyle: { color: colors.s2Line }
          }
        ]
      }
    ]
  };
};

// --- 3. Lifecycle & Watchers ---
onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption(getChartOption($q.dark.isActive));
    window.addEventListener('resize', handleResize);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  myChart?.dispose();
});

const handleResize = () => myChart?.resize();

watch(() => $q.dark.isActive, (isDark) => {
  if (myChart) myChart.setOption(getChartOption(isDark));
});

watch(() => props.data, () => {
    if(myChart) myChart.setOption(getChartOption($q.dark.isActive));
}, { deep: true });
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 405px;
  border-radius: 4px;
}
</style>