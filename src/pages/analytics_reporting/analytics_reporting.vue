<template>  
  <q-page class="q-pa-sm" :class="$q.dark.isActive ? '' : 'bg-grey-2'" style="padding-bottom: 3rem; display: flex; flex-direction: column; flex-wrap: wrap; position: relative; padding-top: 0px !important;">  
   <div :class="$q.dark.isActive ? 'bg-transparent' : 'bg-white text-grey-9'"> 
  <q-toolbar style="min-height: 30px; padding: 0px !important; margin-bottom: 10px;"> 
    <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : ''" style="font-size: 1rem; display: inline-block; font-weight: 400;"> 
      Analytics & Reporting
    </h3> 
  </q-toolbar> 
</div>  
  
      <div class="row q-col-gutter-xs q-mb-xs" style="margin-top: 0px;"> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 0)" class="chart-container" /> 
      </div> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 1)" class="chart-container" /> 
      </div> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 2)" class="chart-container" /> 
      </div> 
    </div> 
 
     <div class="row q-col-gutter-xs q-mb-xs" style="margin-top: 5px;"> 
      <div class="col-12 col-sm-6 col-md-8"> 
        <div :ref="el => setContainerRef(el, 3)" class="chart-container" style="height: 434px !important;" /> 
      </div> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 4)" class="chart-container" /> 
        <div :ref="el => setContainerRef(el, 5)" class="chart-container" style="margin-top: 5px;"/> 
      </div> 
    </div> 
 
    <div class="row q-col-gutter-xs q-mb-xs" style="margin-top: 5px;"> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 6)" class="chart-container" /> 
      </div> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 7)" class="chart-container" /> 
      </div> 
      <div class="col-12 col-sm-6 col-md-4"> 
        <div :ref="el => setContainerRef(el, 8)" class="chart-container" style="" /> 
      </div> 
    </div> 
 
  </q-page>  
</template>  
  
<script setup> 
import { useQuasar } from "quasar";  
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch, reactive } from 'vue'  
import Dygraph from 'dygraphs' 
import 'dygraphs/dist/dygraph.css' 
import Chart from 'chart.js/auto'  
import { useThemeStore } from '../../stores/theme_store'  
import DbNumber from '../../components/widgets/DbNumber.vue'  
defineOptions({  
  components: {  
    DbNumber  
  }  
})  
 
const $q = useQuasar();  
const themeStore = useThemeStore()  
const containers = ref([])  
const graphcontainers = ref([])  
const chartInstances = ref([])  
 
function makeSeries(startDate, points, amplitude = 1, jitter = 0.5, spikeProb = 0.1, spikeAmp = 4) { 
  const data = [] 
  const oneSec = 1000 
  for (let i = 0; i < points; i++) { 
    const t = new Date(startDate.getTime() + i * oneSec) 
    let v = Math.sin(i / 8) * amplitude + (Math.random() - 0.5) * jitter 
    if (Math.random() < spikeProb) { 
      v += (Math.random() > 0.5 ? 1 : -1) * (amplitude * spikeAmp) 
    } 
    data.push([t, Number(v.toFixed(3))]) 
  } 
  return data 
} 
 
// Create multi-series data for Memory graph 
function makeMemorySeries(startDate, points) { 
  const data = [] 
  const oneSec = 1000 
  for (let i = 0; i < points; i++) { 
    const t = new Date(startDate.getTime() + i * oneSec) 
    const v1 = 12 + Math.sin(i / 10) * 2 + (Math.random() - 0.5) * 1 
    const v2 = 8 + Math.cos(i / 8) * 1.5 + (Math.random() - 0.5) * 0.8 
    data.push([t, Number(v1.toFixed(3)), Number(v2.toFixed(3))]) 
  } 
  return data 
} 
const graphs = reactive([ 
  { 
    id: 'g2', 
    title: 'Feeder Performance', 
    // subtitle: 'CPU', 
    unit: '%', 
    series: makeSeries(new Date(Date.now() - 1000 * 60), 60, 60, 10, 0.12, 3), 
    noFill: true, 
  }, 
]) 
 
// const containers = ref([]) 
const graphsInst = ref([]) 
let intervalId = null 
 
function setGraphContainerRef(el, idx) { 
  graphcontainers.value[idx] = el 
} 
 
function buildDygraph(el, cfg) { 
  if (!el) return null 
  const data = cfg.series 
  const isDark = $q.dark.isActive 
  const options = { 
    labels: cfg.multiSeries ? ['Time', 'Series 1', 'Series 2'] : ['Time', 'Value'], 
    legend: 'follow', 
    showRoller: false, 
    animatedZooms: true, 
    axisLabelFontSize: 11, 
    digitsAfterDecimal: 2, 
    ylabel: cfg.unit, 
    xlabel: 'Time', 
    drawPoints: false, 
    strokeWidth: 2, 
    highlightCircleSize: 4, 
    valueFormatter: x => (typeof x === 'number' ? x.toFixed(2) : x), 
    colors: cfg.multiSeries ?  
      (isDark ? ['#64b5f6', '#ffb74d'] : ['#1976d2', '#f57c00']) : 
      [isDark ? '#64b5f6' : '#1976d2'], 
    fillGraph: !cfg.noFill, 
    fillAlpha: cfg.noFill ? 0 : 0.3, 
    axisLabelColor: isDark ? '#ffffff' : '#000000', 
    gridLineColor: isDark ? '#333333' : '#cccccc', 
    axes: { 
      x: {  
        drawGrid: false, 
        axisLabelColor: isDark ? '#ffffff' : '#000000' 
      }, 
      y: {  
        drawGrid: true, 
        gridLineColor: isDark ? '#333333' : '#cccccc', 
        axisLabelColor: isDark ? '#ffffff' : '#000000' 
      }, 
    }, 
  } 
  return new Dygraph(el, data, options) 
} 
 
function resetZoom(idx) { 
  const g = graphsInst.value[idx] 
  if (g) g.resetZoom() 
} 
 
// Update data every second with sliding window 
function updateGraphs() { 
  const now = new Date() 
  graphs.forEach((cfg, idx) => { 
    const lastData = cfg.series 
    const lastTime = lastData[lastData.length - 1][0] 
    const newTime = new Date(lastTime.getTime() + 1000) 
 
    if (cfg.multiSeries) { 
      const v1 = 12 + Math.sin(Date.now() / 2000) * 2 + (Math.random() - 0.5) * 1 
      const v2 = 8 + Math.cos(Date.now() / 1800) * 1.5 + (Math.random() - 0.5) * 0.8 
      lastData.push([newTime, Number(v1.toFixed(3)), Number(v2.toFixed(3))]) 
    } else { 
      let newValue = Math.sin(Date.now() / 2000 + idx) * (idx === 0 ? 100 : idx === 1 ? 60 : idx === 2 ? 8 : idx === 3 ? 4 : idx === 4 ? 0.8 : 1) 
      newValue += (Math.random() - 0.5) * 10 
      if (Math.random() < 0.08) newValue += (Math.random() > 0.5 ? 1 : -1) * 50 
      lastData.push([newTime, Number(newValue.toFixed(3))]) 
    } 
 
    if (lastData.length > 60) lastData.shift() 
 
    if (graphsInst.value[idx]) { 
      graphsInst.value[idx].updateOptions({ file: lastData }) 
    } 
  }) 
} 
 
let ro = null 
 
onMounted(async () => { 
  await nextTick() 
  graphs.forEach((cfg, idx) => { 
    graphsInst.value[idx] = buildDygraph(graphcontainers.value[idx], cfg) 
  }) 
 
  intervalId = setInterval(updateGraphs, 1000) 
 
  if (window.ResizeObserver) { 
    ro = new ResizeObserver(entries => { 
      for (const entry of entries) { 
        const idx = graphcontainers.value.findIndex(c => c === entry.target) 
        if (idx >= 0 && graphsInst.value[idx]) graphsInst.value[idx].resize() 
      } 
    }) 
    graphcontainers.value.forEach(c => c && ro.observe(c)) 
  } else window.addEventListener('resize', onWindowResize) 
}) 
 
function onWindowResize() { 
  graphsInst.value.forEach(g => g && g.resize()) 
} 
 
onBeforeUnmount(() => { 
  if (intervalId) clearInterval(intervalId) 
  if (ro) { 
    graphcontainers.value.forEach(c => c && ro.unobserve(c)) 
    ro.disconnect() 
    ro = null 
  } else window.removeEventListener('resize', onWindowResize) 
  graphsInst.value.forEach(g => { try { g.destroy && g.destroy() } catch (e) {} }) 
  graphsInst.value = [] 
}) 
 
 
// dy graph end here 
 
 
 
  
function setContainerRef(el, idx) {  
  containers.value[idx] = el  
}  
const themeColors = computed(() => {  
  const colors = $q.dark.isActive ? themeStore.currentColors.dark : themeStore.currentColors.light  
  return colors.map(color => ({  
    background: `${color}40`,  
    border: color  
  }))  
})  
function makeBarOptions(maxValue, title) {  
  return {  
    responsive: true,  
    maintainAspectRatio: false,  
    plugins: {  
      title: {  
        display: true,  
        text: title,  
        color: toggleColor,  
        font: { size: 14, weight:'500' }  
      },  
      legend: { display: false }  
    },  
    scales: { 
      x: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor } 
      }, 
       y: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        max : maxValue
        // stacked: true, 
        // max: 100 
      } 
  
    }  
  } 
}  
 
 let toggleColor = $q.dark.isActive ? '#90a4ae' :'#4f4f4f'
 
 
const getChartConfigs = () => {  
  const colors = themeColors.value  
  return [  
    {  
      type: 'doughnut',  
      data: {  
        labels: ['Equipment Failure', 'Weather', 'Maintenance','Overload', ],  
        datasets: [{  
          data: [20,15,25,40],  
          backgroundColor: colors.map(c => c.background),  
          borderColor: colors.map(c => c.border),  
          borderWidth: 1  
        }]  
      },  
      options: {  
        responsive: true,  
        maintainAspectRatio: false,  
        cutout: '40%',  
        plugins: {  
          title: { display: true, text: 'Average Outages Causes', color: toggleColor, font: { size: 14 , weight:'500'} },  
          legend: { display: true, position: 'right', labels: { color: toggleColor, usePointStyle: true, padding: 20 } }  
        }  
      }  
    }, 
    { 
  type: 'line', 
  data: { 
  labels: [ 
			'Adilabad', 
			'Anantapur', 
			'Chittoor', 
			'Kakinada',], 
  datasets: [ 
    { 
      data: [60 , 90, 75 , 60], 
      borderColor: colors[0].border , 
      backgroundColor: colors[0].background, 
      stack: 'combined', 
      type: 'bar', 
      borderWidth: 1  
    }, 
    { 
    //   label: 'Dataset 2', 
      data: [60 , 90, 75 , 60], 
      borderColor: colors[1].background , 
      backgroundColor: colors[1].background, 
      stack: 'combined', 
    } 
  ] 
}, 
 options: { 
    responsive: true, 
    maintainAspectRatio : false, 
    plugins: { 
      title:{ display: true, text: 'Average Outage Frequency', color: toggleColor, font: { size: 14 , weight:'500'} }, 
      legend: {display : false , color: toggleColor} 
    }, 
    scales: { 
      x: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor } 
      }, 
       y: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        stacked: true, 
        // max: 100 
      } 
  
    } 
     
     
  }, 
}, 
 
    {  
      type: 'doughnut',  
      data: {  
        labels: ['Normal', 'Critical', 'VIP', 'Medical'],  
        datasets: [{  
          data: [40, 24, 26, 10],  
          backgroundColor: colors.map(c => c.background),  
          borderColor: colors.map(c => c.border),  
          borderWidth: 1,  
        }]  
      },  
      options: {  
        responsive: true,  
        maintainAspectRatio: false,  
        cutout: '40%',  
        plugins: {  
          title: { display: true, text: ' Affected Customer Type', color: toggleColor, font: { size: 14 , weight:'500'} },  
          legend: { display: true, position: 'right', labels: { color: toggleColor, usePointStyle: true, padding: 20 } }  
        }  
      }  
    },  
{ 
  type: 'line', 
  data: { 
  labels: ['Jan' , 'Feb', 'Mar' , 'Apr', 'May','June', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'], 
   
  datasets: [ 
     { 
      label: 'CAIDI', 
      data: [0.45 , 0.7 , 0.2, 0.4 , 0.6 ,0.8,0.5 , 0.3 , 0.4 , 0.6 , 0.4 , 0.8], 
      borderColor:colors[0].background , 
      backgroundColor: colors[0].background, 
      // fill: true 
    }, 
    { 
      label: 'SAIFI', 
      data: [0.6 , 0.30 , 0.70, 0.50 , 0.3 ,0.6 , 0.45 , 0.7 , 0.2, 0.4 , 0.6 , 1], 
      borderColor:colors[1].background , 
      backgroundColor: colors[1].background, 
      // fill: true 
    }, 
    { 
      label: 'SAIDI', 
      data: [0.0, 0.40 , 0.60 , 0.40 , 0.70 , 0.50 , 0.5 , 0.8 , 0.3, 0.5 , 0.2 ,0.7], 
      borderColor:colors[2].background , 
      backgroundColor: colors[2].background, 
      // fill: true 
    } 
  ] 
}, 
  options: { 
    responsive: true, 
    maintainAspectRatio : false, 
    plugins: { 
      datalabels: { 
        display: false  
      }, 
      legend: { 
        display: true,
        color: toggleColor
      }, 
      title: { display: true, text: ' Affected Customer Interruption Index', color: toggleColor, font: { size: 14 , weight:'500'} },  
    },
    scales: { 
      x: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor } 
      }, 
       y: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        // stacked: true, 
        // max: 100 
      } 
  
    } 
  }, 
}, 
 
 {  
      type: 'bar',  
      data: {  
        labels: [ 'Ambala',' Hisar', 'Karnal','Rohtak'], 
			 
        datasets: [{ data: [85, 52, 40, 94 ], backgroundColor: colors[1].background, borderColor: colors[1].border, borderWidth: 1 }]  
      },  
      options: makeBarOptions(100, 'Feeder Reliability Trend')  
    },  
      
         {  
      type: 'doughnut',  
      data: {  
        labels: ['Agra', 'Aligarh', 'Lucknow', 'Meerut'],  
        datasets: [{  
          data: [40, 24, 26, 10],  
          backgroundColor: colors.map(c => c.background),  
          borderColor: colors.map(c => c.border),  
          borderWidth: 1,  
        }]  
      },  
      options: {  
        responsive: true,  
        maintainAspectRatio: false,  
        cutout: '40%',  
        plugins: {  
          title: { display: true, text: 'Top Worst Feeders', color: toggleColor, font: { size: 14 , weight:'500'} },  
          legend: { display: true, position: 'right', labels: { color: toggleColor, usePointStyle: true, padding: 20 } }  
        } ,
         
      }  
    },  
    { 
  type: 'bar', 
  data: { 
  labels: ['Crew 1' , 'Crew 2', 'Crew 3' , 'Crew 4'], 
  datasets: [ 
    { 
      label: 'Work Orders', 
      data: [50 , 70 , 60 , 40 ], 
      backgroundColor: colors[0].background, 
      borderColor: colors[0].border, 
      borderWidth: 1 , 
      stack: 'Stack 0', 
    }, 
    { 
      label: 'Pending', 
      data: [30 , 40 , 20 , 10], 
      backgroundColor: colors[1].background, 
      borderColor: colors[1].border, 
      borderWidth: 1 , 
      stack: 'Stack 1', 
    }, 
    { 
      label: 'Completed', 
      data: [20 , 30 , 40 , 30], 
      backgroundColor: colors[2].background, 
       borderColor: colors[2].border, 
      borderWidth: 1 , 
      stack: 'Stack 1', 
    }, 
  ] 
}, 
  options: { 
    maintainAspectRatio: false ,  
    plugins: { 
      title:{ display: true, text: 'Crew Performance', color: toggleColor, font: { size: 14 , weight:'500'} }, 
    }, 
    responsive: true, 
    interaction: { 
      intersect: false, 
    }, 
    scales: { 
      x: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor } ,
        stacked: true,
      }, 
       y: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        stacked: true, 
        // max: 100 
      } 
  
    } 
  } 
}, 
{  
      type: 'doughnut',  
      data: {  
        labels: ['On Job', 'Offline', 'Available', 'Leave'],  
        datasets: [{  
          data: [40, 24, 26, 10],  
          backgroundColor: colors.map(c => c.background),  
          borderColor: colors.map(c => c.border),  
          borderWidth: 1,  
        }]  
      },  
      options: {  
        responsive: true,  
        maintainAspectRatio: false,  
        cutout: '0%',  
        plugins: {  
          title: { display: true, text: 'Crew Utilization', color: toggleColor, font: { size: 14 , weight:'500'} },  
          legend: { display: true, position: 'right', labels: { color: toggleColor, usePointStyle: true, padding: 20 } }  
        }  
      }  
    },  
{ 
type: 'bar', 
data: { 
labels: ['Rohtak', 'Hisar', 'Jind'], 
datasets: [ 
 { 
label: 'Crew 1', 
data: [18, 22, 15, 28, 12, 20], 
backgroundColor:  colors[0].background, 
 borderColor: colors[0].border, 
borderWidth: 1 , 
}, 
{ 
label: 'Crew 2', 
data: [12, 18, 10, 15, 8, 14], 
backgroundColor: colors[1].background , 
borderColor: colors[1].border, 
borderWidth: 1 , 
}, 
 { 
label: 'Crew 3', 
data: [8, 12, 6, 10, 5, 9], 
backgroundColor:colors[2].background , 
borderColor: colors[2].border, 
borderWidth: 1 , 
}, 
] 
}, 
options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: { 
           title: { display: true, text: 'Average Restoration Time',color: toggleColor, font: { size: 14 , weight:'500'} }, 
       }, 
       scales: { 
      x: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        stacked: false,
      }, 
       y: { 
        grid: { display: true, color: '#333' }, 
        ticks: { color: toggleColor },
        stacked: false, 
        // max: 100 
      } 
  
    } 
    } 
   } 
]} 
 
const createCharts = () => {  
  // Destroy existing charts  
  chartInstances.value.forEach(chart => chart && chart.destroy())  
  chartInstances.value = []  
    
  // Clear containers  
  containers.value.forEach(container => {  
    if (container) container.innerHTML = ''  
  })  
    
  // Create main charts  
  const chartConfigs = getChartConfigs()  
  chartConfigs.forEach((config, idx) => {  
    if (containers.value[idx]) {  
      const canvas = document.createElement('canvas')  
      containers.value[idx].appendChild(canvas)  
      chartInstances.value[idx] = new Chart(canvas, config)  
    }  
  })  
    
  // Create circular progress charts with theme colors  
  const colors = themeColors.value  
  circularConfigs.forEach((config, idx) => {  
    const containerIdx = idx + 6  
    if (containers.value[containerIdx]) {  
      const canvas = document.createElement('canvas')  
      containers.value[containerIdx].appendChild(canvas)  
      chartInstances.value[containerIdx] = new Chart(canvas, {  
        type: 'doughnut',  
        data: {  
          datasets: [{  
            data: [config.value, 100 - config.value],  
            backgroundColor: [colors[idx]?.border || config.color, 'rgba(128,128,128,0.2)'],  
            borderWidth: 0  
          }]  
        },  
        options: {  
          responsive: true,  
          maintainAspectRatio: false,  
          cutout: '80%',  
          plugins: {  
            legend: { display: false },  
            tooltip: { enabled: false }  
          }  
        }  
      })  
    }  
  })  
}  
  
watch(() => themeStore.dashboardColorScheme, () => {  
  nextTick(() => {  
    createCharts()  
  })  
})  
  
onMounted(async () => {  
  await nextTick()  
//   initAuditLogTable();  
  createCharts()  
})  
 
onBeforeUnmount(() => {  
  chartInstances.value.forEach(chart => chart && chart.destroy())  
//   if (instAuditLogtable.value) {  
//     instAuditLogtable.value.destroy()  
//   }  
})  
  
 
 
</script> 
 
<style> 
.chart-container{ 
  width: 100%; 
  border-radius: 4px; 
  padding-bottom: 20px !important; 
  background: white; 
  height: 215px; 
  min-height: 215px; 
  padding: 20px; 
  margin-top: -15px; 
 
} 
/* .chart-height{ 
 
  height: calc(100vh - 78vh) !important; 
 
 } */ 
 
   
.heading{ 
    font-size: 20px; 
    font-weight: 400; 
    line-height: 3.125rem; 
    letter-spacing: normal; 
} 
.sub-head{ 
    font-size: 12px; 
    margin-top: -10px; 
} 
.dygraph-container { 
  width: 100%; 
  height: 200px; 
  min-height: 100px; 
} 
.graph-wrap { 
  padding: 8px 12px; 
} 
</style> 
