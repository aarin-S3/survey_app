<template>
  <div class="chart-wrapper" :class="$q.dark.isActive ? 'bg-dark-custom' : 'bg-white'">
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
// let simulationInterval = null;

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

// const categories = [
//   'Equipment Failure',
//   'Vegetation (Trees)',
//   'Weather / Storm',
//   'Planned Outage'
// ];

const deepDarkColors = [
  '#C24E4E', '#387B67', '#375A96', '#A0773C', '#876B9B', '#8C594A', '#B8933D', '#44475A'
];
const brightLightColors = [
  '#EE6666', '#5470C6', '#91CC75', '#FAC858', '#9A60B4', '#D6886A', '#E6A23C', '#909399'
];

// const generateRandomData = () => {
//   return props.data.map(name => ({
//     name: name,
//     value: Math.floor(Math.random() * (50 - 20 + 1)) + 20
//   }));
// };

const getOptions = (data) => {
  const isDark = $q.dark.isActive;
  const subTextColor = isDark ? '#A0A0A0' : '#666666';
  const tooltipBg = isDark ? 'rgba(50, 50, 50, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipText = isDark ? '#E0E0E0' : '#333333';
  const tooltipBorder = isDark ? '#555' : '#ccc';
  const sliceBorderColor = isDark ? '#1f1f1f' : '#ffffff';

  return {
    backgroundColor: 'transparent',
    animationDuration: 2000,
    animationEasing: 'cubicOut',
    title: {
      text: 'Outage Distribution by Cause',
      left: 'center',
      top: 10,
      textStyle: {
        color: '#9e9e9e',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Roboto, sans-serif',
      },
      subtextStyle: { color: subTextColor }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: tooltipBg,
      borderColor: tooltipBorder,
      textStyle: { color: tooltipText },
      formatter: '{b} : {c} ({d}%)',
      extraCssText: isDark ? '' : 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);'
    },
    legend: {
      top: 50,
      bottom: 0,
      icon: 'circle',
      fontFamily: 'Roboto, sans-serif',
      textStyle: { color: '#9e9e9e' },
      itemGap: 20,
    },
    series: [
      {
        name: 'Outage Cause',
        type: 'pie',
        radius: [40, 100],
        center: ['50%', '60%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
          borderColor: sliceBorderColor,
          borderWidth: 2
        },
        color: isDark ? deepDarkColors : brightLightColors,
        data: data, // Dynamic Data
        label: {
          color: '#9e9e9e',
          formatter: '{b}'
        },
        labelLine: {
          lineStyle: { opacity: 0.5 },
          smooth: 0.2,
          length: 10,
          length2: 0,
        }
      }
    ]
  };
};

const initChart = () => {
  if (!chartRef.value) return;

  myChart = echarts.init(chartRef.value);

  const initialData = props.data;
  myChart.setOption(getOptions(initialData));
  // startSimulation();
};

// const startSimulation = () => {
//   if (simulationInterval) clearInterval(simulationInterval);

//   simulationInterval = setInterval(() => {
//     if (!myChart) return;

//     const newData = generateRandomData();

//     myChart.setOption({
//       series: [{
//         data: newData
//       }]
//     });
//   }, 3000);
// };
watch(() => props.data, (newData) => {
  if (myChart) {
    myChart.setOption({
      series: [{
        data: newData
      }]
    });
  }
}, { deep: true });

watch(() => $q.dark.isActive, () => {
  if (myChart) {
    // const currentData = myChart.getOption().series[0].data;
    myChart.setOption(getOptions(props.data));
  }
});

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
  // console.log("random data", generateRandomData());
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  // if (simulationInterval) clearInterval(simulationInterval);
  if (myChart) myChart.dispose();
});

const handleResize = () => {
  if (myChart) myChart.resize();
};
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: fit-content;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-dark-custom {
  /* background-color: #1f1f1f; */
}

.chart-container {
  width: 100%;
  height: 405px;
  border-radius: 4px;
}
</style>