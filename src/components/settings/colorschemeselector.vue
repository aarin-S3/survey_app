<template>
  <q-card style="width: 100%;" class="my-font-color">
    <q-card-section>
      <q-input v-model="query" debounce="400" filled dense placeholder="Search Color Scheme" clearable>
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>

    <q-card-section style="height: 300px;">
      <q-scroll-area class="fit">
        <q-list>
          <q-item
            v-for="scheme in filteredSchemes"
            :key="scheme.name"
            clickable
            v-ripple
            v-close-popup
            active-class="bg-teal-1 text-grey-8"
            @click="onSelect(scheme.name)"
          >
            <q-item-section avatar top>
              <q-icon name="palette" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scheme.name }}</q-item-label>
              <div>
                <q-chip square size="sm">Light:</q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[0]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[1]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[2]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[3]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.light[4]}`"></q-chip>
              </div>
              <div>
                <q-chip square size="sm">Dark :</q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[0]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[1]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[2]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[3]}`"></q-chip>
                <q-chip square size="xs" :style="`background-color: ${scheme.dark[4]}`"></q-chip>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn dense flat label="Cancel" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const query = ref('')
const schemes = ref([])

const filteredSchemes = computed(() => {
  return schemes.value.filter(s => isVisible(s.name))
})

const colorSchemes = {
  'Default': {
    light: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
    dark: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3']
  },
  'Grafana': {
    light: ['#7eb26d', '#eab839', '#6ed0e0', '#ef843c', '#e24d42'],
    dark: ['#7eb26d', '#eab839', '#6ed0e0', '#ef843c', '#e24d42']
  },
  'Tableau': {
    light: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f'],
    dark: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f']
  },
  'Cool': {
    light: ['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6f3ff'],
    dark: ['#08519c', '#3182bd', '#6baed6', '#9ecae1', '#c6dbef']
  },
  'Warm': {
    light: ['#d94801', '#fd8d3c', '#fdae6b', '#fdd0a2', '#feedde'],
    dark: ['#7f2704', '#d94801', '#fd8d3c', '#fdae6b', '#fdd0a2']
  }
}

const initialize = () => {
  for (let schemeName of Object.keys(colorSchemes)) {
    let colorScheme = colorSchemes[schemeName]
    schemes.value.push({
      name: schemeName,
      light: colorScheme.light.slice(0, 5),
      dark: colorScheme.dark.slice(0, 5)
    })
  }
}

const isVisible = (schemeName) => {
  let qlc = query.value.toLowerCase()
  return schemeName.toLowerCase().indexOf(qlc) > -1
}

const onSelect = (colorScheme) => {
  emit('update:modelValue', colorScheme)
}

onMounted(() => {
  initialize()
})
</script>

<style lang="sass" scoped>
.my-font-color
  color: $font-grey-color

.body--dark .q-item-label
  color: $font-grey-color !important

.body--dark .q-bar
  color: $font-grey-color !important

.body--dark .q-item
  color: $font-grey-color !important
</style>