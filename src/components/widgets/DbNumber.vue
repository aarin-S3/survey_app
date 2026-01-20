<template>
  <div class="db-number">
    <div class="db-n-content">
      <div v-if="hasTrend" class="db-n-layer">
        <db-sparkline :data="trend" :max="trendMax" :height="60"
          style="position:absolute;bottom:0;width:100%;"></db-sparkline>
      </div>
      <div v-if="hasIcon" class="db-n-layer" style="text-align: right;">
        <div class=""><q-icon :name="icon" :class="iconClass"></q-icon></div>
      </div>
      <div v-if="hasPct" class="db-n-layer db-pie-container">
        <db-easy-pie :trackColor="trackColor" :value="percentValue" :percentRanges="percentRanges" :lineWidth="6"
          :size="69" fontSize="12px"></db-easy-pie>
      </div>
      <div class="db-n-main">
        <div class="db-n-hdr">
          <span class="text-md db-txt-faded">{{ title }}</span>
        </div>
        <div>
          <div class="db-n-value db-txt-highlight">{{ formattedValue }}</div>
          <div class="text-sm db-txt-faded">{{ subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DbSparkline from './DbSparkline.vue'
import DbEasyPie from './DbEasyPie.vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  format: { type: String, default: '%d' },
  total: { type: Number, default: 0 },
  trend: { type: Array, default: () => [] },
  trendMax: { type: Number, default: null },
  ranges: { type: Array, default: () => [] },
  percentRanges: { type: Array, default: () => [] },
  icon: { type: String, default: '' },
  title: String,
  subtitle: String,
  qualifier: { type: String, default: '' },
  footer: { type: String, default: '' },
  trackColor: { type: String, default: '#f2f2f2' }
})

const hasTrend = computed(() => props.trend && Array.isArray(props.trend) && props.trend.length > 0)
const hasRanges = computed(() => props.ranges && Array.isArray(props.ranges) && props.ranges.length == 2)
const hasIcon = computed(() => props.icon !== '')
const hasPct = computed(() => props.total > 0)

const iconClass = computed(() => props.icon + ' db-n-icon ' + getRangeClass())

const formattedValue = computed(() => {
  return props.format.replace('%d', props.value).replace('%s', props.qualifier)
})

const percentValue = computed(() => {
  if (props.total > 0) {
    return (props.value / props.total) * 100
  }
  return 0
})

const getRangeClass = () => {
  if (!hasRanges.value) {
    return 'db-txt-faded'
  }
  if (props.value <= props.ranges[0]) {
    return 'text-positive'
  } else if (props.value <= props.ranges[1]) {
    return 'text-warning'
  } else {
    return 'text-negative'
  }
}
</script>

<style lang="scss" scoped>
.db-number {
  position: relative;
  background: white;
  border-radius: 4px;
  padding: 8px;
  overflow: hidden;
  //   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  //   min-height: 120px;
}

.db-n-content {
  position: relative;
  height: 100%;
}

.db-n-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.db-n-main {
  position: relative;
  z-index: 2;
}

.db-n-hdr {
  margin-bottom: 8px;
}

.db-n-value {
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 4px;
}

.db-n-footer {
  margin-top: 8px;
}

.db-n-icon {
  font-size: 3rem;
  opacity: 0.3;
}

.db-pie-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  //   padding: 8px;
  pointer-events: auto;
}

.db-txt-faded {
  color: #9e9e9e;
}

.db-txt-highlight {
  color: #9e9e9e;
}

.text-md {
  font-size: 0.875rem;
}

.text-sm {
  font-size: 0.75rem;
}

.text-xxs {
  font-size: 0.625rem;
}

.body--dark .db-number {
  background: #1e1e1e;
  color: white;
}

.body--dark .db-txt-highlight {
  color: #9e9e9e
}
</style>