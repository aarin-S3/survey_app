<template>
  <div class="db-easy-pie" ref="chart" :data-percent="percent">
    <div class="inner-text" :style="{ fontSize: fontSize, lineHeight: pieSize + 'px' }">
      <slot>{{ percent }}%</slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import EasyPieChart from 'easy-pie-chart'

const props = defineProps({
  value: { type: Number, default: 0 },
  barColor: { type: String, default: '#ef1e25' },
  fontSize: { type: String, default: '20px' },
  trackColor: { type: String, default: '#37474f' },
  scaleColor: { type: String, default: '#9e9e9e' },
  scaleLength: { type: Number, default: 5 },
  lineCap: { type: String, default: 'round' },
  lineWidth: { type: Number, default: 3 },
  size: { type: Number, default: 0 },
  rotate: { type: Number, default: 0 },
  duration: { type: Number, default: 1000 },
  animated: { type: Boolean, default: true },
  percentRanges: { type: Array, default: () => [] }
})

const chart = ref(null)
const pieChart = ref(null)
const pieSize = ref(150)

const percent = computed(() => props.value.toFixed(2))
const hasRanges = computed(() => Array.isArray(props.percentRanges) && props.percentRanges.length > 0)

const epTrackColor = computed(() => {
  if (props.trackColor) {
    return props.trackColor
  }
  return '#f2f2f2'
})

const initSize = () => {
  if (props.size != 0) {
    pieSize.value = props.size
  } else if (chart.value) {
    let cH = chart.value.clientHeight
    let cW = chart.value.clientWidth
    pieSize.value = cH > cW ? cW : cH
  }
}

const getBarColor = (percent) => {
  if (!hasRanges.value) {
    return props.barColor
  }
  for (let range of props.percentRanges) {
    if (range.value > percent) {
      return range.color
    }
  }
  return props.barColor
}

const render = () => {
  if (!chart.value) return

  initSize()

  // Destroy the old canvas before creating a new one
  if (pieChart.value) {
    // Check if the library has a generic container that needs clearing
    // Your previous code used removeChild, which is correct for this library 
    // as it appends a canvas element.
    if (chart.value.querySelector('canvas')) {
      chart.value.removeChild(chart.value.querySelector('canvas'));
    }
    pieChart.value = null;
  }

  pieChart.value = new EasyPieChart(chart.value, {
    barColor: getBarColor,
    trackColor: epTrackColor.value,
    scaleColor: props.scaleColor,
    scaleLength: props.scaleLength,
    lineCap: props.lineCap,
    lineWidth: props.lineWidth,
    size: pieSize.value,
    rotate: props.rotate,
    animate: {
      duration: props.duration,
      enabled: props.animated
    }
  })
}

const update = (val) => {
  if (pieChart.value) {
    pieChart.value.update(val)
  }
}

const handleResize = () => {
  nextTick(() => {
    render()
  })
}

watch(() => props.value, (val) => {
  update(val)
})

watch(() => props.duration, (val) => {
  if (pieChart.value) {
    pieChart.value.options.animate.duration = val
    update(props.value)
  }
})

watch(() => props.animated, (val) => {
  if (pieChart.value) {
    pieChart.value.options.animate.enabled = val
    update(props.value)
  }
})


watch(
  () => [props.trackColor, props.barColor, props.scaleColor],
  () => {
    render()
  }
)

onMounted(() => {
  window.addEventListener('resize', handleResize)
  nextTick(() => {
    render()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.db-easy-pie {
  position: relative;
  display: inline-block;
}

.inner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
  color: #9e9e9e;
}

.body--dark .inner-text {
  color: #9e9e9e;
}
</style>