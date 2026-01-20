<template>
  <div ref="chart" :style="`height:${height}px;`">
    <canvas ref="canvas" style="position: absolute;"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  height: { type: Number, default: 60 },
  max: { type: Number, default: null },
  data: { type: Array, default: () => [] }
})

const chart = ref(null)
const canvas = ref(null)
const canvasWidth = ref(100)
const canvasHeight = ref(100)

const initSize = () => {
  canvasHeight.value = props.height ? props.height : chart.value.clientHeight
  canvasWidth.value = chart.value.clientWidth
}

const handleResize = () => {
  nextTick(() => {
    render()
  })
}

const render = () => {
  if (!chart.value || !canvas.value) return
  
  initSize()
  canvas.value.width = canvasWidth.value
  canvas.value.height = canvasHeight.value
  
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  if (!props.data || props.data.length <= 0) {
    return
  }

  // Scale calculations
  const yMin = Math.min(...props.data, 0)
  const yMax = props.max || Math.max(...props.data)
  
  if (yMax === 0 && yMin === 0) {
    return
  }

  const xStep = canvas.value.width / (props.data.length - 1)
  const yScale = canvas.value.height / (yMax - yMin)

  // Create path
  ctx.beginPath()
  ctx.moveTo(0, canvas.value.height - ((props.data[0] - yMin) * yScale))

  for (let i = 1; i < props.data.length; i++) {
    const x = i * xStep
    const y = canvas.value.height - ((props.data[i] - yMin) * yScale)
    ctx.lineTo(x, y)
  }

  // Create area fill
  ctx.lineTo(canvas.value.width, canvas.value.height)
  ctx.lineTo(0, canvas.value.height)
  ctx.closePath()

  // Fill with gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  gradient.addColorStop(0, 'rgba(120, 144, 156, 0.3)')
  gradient.addColorStop(1, 'rgba(120, 144, 156, 0.1)')
  
  ctx.fillStyle = gradient
  ctx.fill()
}

watch(() => props.data, () => {
  nextTick(() => {
    render()
  })
}, { deep: true })

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
div {
  position: relative;
}
</style>