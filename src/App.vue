<template>
  <router-view />
</template>

<script lang="ts">
import { Dark } from "quasar"
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels'

Chart.register(...registerables, ChartJSPluginDatalabels)
import './css/tabulator_custom.css'
import './css/style.sass'
// import './css/network.css'

export default defineComponent({
  name: 'App',
  setup() {
    Dark.set(true)

    const disableContextMenu = (e: Event) => {
      e.preventDefault()
    }

    onMounted(() => {
      document.addEventListener('contextmenu', disableContextMenu)
    })

    onUnmounted(() => {
      document.removeEventListener('contextmenu', disableContextMenu)
    })
  }
})
</script>

<style>
body,
html,
#q-app {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

input,
textarea {
  -webkit-user-select: text;
  user-select: text;
}
</style>

<!-- <template>
  <router-view />
</template>

<script lang="ts">
import {Dark} from "quasar"
import { defineComponent } from 'vue'
import { Chart, registerables } from 'chart.js'
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels'
Chart.register(...registerables, ChartJSPluginDatalabels)
import './css/tabulator_custom.css'
import './css/style.sass'
// import './css/network.css'

export default defineComponent({
  name: 'App',
  setup(){
    Dark.set(true)
  
  }
})
</script>



 -->
