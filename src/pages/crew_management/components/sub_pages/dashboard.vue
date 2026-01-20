<template>
   <div class="dashboard-container" :style="$q.screen.lt.md ? 'padding-bottom: 120px' : ''">
      <div class="row q-col-gutter-xs q-mb-md">
         <div v-for="(item, index) in dbnumberData" :key="index" class="col-12 col-sm-6 col-md-3">
            <db-number :value="item.value" :total="item.total" :title="item.title" :subtitle="item.subtitle"
               :trend="[5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100]"
               :percentRanges="item?.percentRanges" :trackColor="$q.dark.isActive ? '#37474f' : '#f2f2f2'"
               style=" border-radius: 4px;"
               :style="$q.dark.isActive ? 'border:none;' : 'border: 1px solid lightgray;'" />
         </div>
      </div>

      <div class="row q-col-gutter-md">
         <div class="col-12 col-md-6">
            <div class="row q-col-gutter-xs">
               <div class="" :class="$q.screen.lt.sm ? 'col-12' : 'col-6'">
                  <DonutChart :data="donutChartData" chartClass="crew-container-height" />
               </div>
               <div class="" :class="$q.screen.lt.sm ? 'col-12' : 'col-6'">
                  <DonutChart :data="donutChartData2" chartClass="crew-container-height" />
               </div>
               <div class="col-12">
                  <BarChart :data="barChartData" chartClass="crew-container-height" />
               </div>
            </div>
         </div>

         <div class="col-12 col-md-6">
            <q-card flat bordered class="themed-card">
               <q-card-section class="map-section" style="height: 463px; padding: 0px;">
                  <div style="height: 100%; width: 100%; position: relative;">
                     <div id="map" style="height: 100%; width: 100%;"></div>
                     <q-btn-toggle v-model="mapFilter" class="map-filter-toggle" :options="[
                        { label: 'All', value: 'all' },
                        { label: 'Orders', value: 'workorders' },
                        { label: 'Crews', value: 'crews' }
                     ]" toggle-color="grey-9" dense no-caps />
                  </div>
               </q-card-section>
            </q-card>
         </div>
      </div>
   </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useQuasar } from 'quasar'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dbNumber from 'src/components/widgets/DbNumber.vue';
import DonutChart from 'src/pages/dashboard/components/chartjs/donut_chart/donut_chart.vue';
import BarChart from 'src/pages/dashboard/components/chartjs/bar_chart/bar_chart.vue';
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
   iconUrl: markerIcon,
   iconRetinaUrl: markerIcon2x,
   shadowUrl: markerShadow
})

const props = defineProps({
   dbnumberData: { type: Array, default: () => [] },
   donutChartData: { type: Object, default: () => { } },
   donutChartData2: { type: Object, default: () => { } },
   barChartData: { type: Object, default: () => { } },
   currentPage: { type: String, default: 'dashboard' },
   workOrders: { type: Array, default: () => [] },
   crews: { type: Array, default: () => [] }
})

const $q = useQuasar()
const map = ref(null)
const markers = ref([])
const mapFilter = ref('all') // Local filter state

// Watch for changes in filter OR data to update map
watch(() => [mapFilter.value, props.workOrders, props.crews], () => {
   updateMapMarkers()
}, { deep: true })

watch(() => props.currentPage, (newPage) => {
   setTimeout(() => {
      if (newPage === 'dashboard' && map.value) {
         map.value.invalidateSize()
         updateMapMarkers()
      }
   }, 100)
})

const initMap = () => {
   if (!document.getElementById('map')) return
   if (map.value) {
      map.value.invalidateSize()
      return
   }

   map.value = L.map('map', { attributionControl: false }).setView([20.5937, 78.9629], 5)

   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
   }).addTo(map.value)

   // Legend
   const legend = new L.Control({ position: 'bottomright' })
   legend.onAdd = function (map) {
      const div = L.DomUtil.create('div', 'info legend')
      const woColors = { CRITICAL: '#d32f2f', HIGH: '#ff6f00', MEDIUM: '#fbc02d', LOW: '#388e3c' }
      const crewColors = { Available: '#4caf50', 'On Job': '#fbc02d', Offline: '#d32f2f' }

      let htmlContent = `
    <div class="legend-header" id="legend-toggle">
      <h4>Legend</h4>
      <i class="material-icons legend-arrow">keyboard_arrow_down</i>
    </div>
    <div class="legend-content" id="legend-content">
  `
      htmlContent += '<strong>Work Orders (Priority)</strong>'
      for (const [priority, color] of Object.entries(woColors)) {
         htmlContent += `<i class="legend-shape-work" style="background-color:${color};"><span class="material-icons" style="font-size: 12px; color: white;">work</span></i> ${priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}<br>`
      }

      htmlContent += '<br><strong>Crews (Status)</strong>'
      for (const [status, color] of Object.entries(crewColors)) {
         htmlContent += `<i class="legend-shape-person" style="background-color:${color};"><span class="material-icons" style="font-size: 12px; color: white;">person</span></i> ${status}<br>`
      }

      htmlContent += '</div>'
      div.innerHTML = htmlContent
      L.DomEvent.disableClickPropagation(div)
      return div
   }
   legend.addTo(map.value)

   // Legend Toggle
   setTimeout(() => {
      const toggleBtn = document.getElementById('legend-toggle')
      const content = document.getElementById('legend-content')
      const arrow = document.querySelector('.legend-arrow')
      if (toggleBtn && content && arrow) {
         toggleBtn.addEventListener('click', function () {
            if (content.style.display === 'none') {
               content.style.display = 'block'
               arrow.textContent = 'keyboard_arrow_down'
            } else {
               content.style.display = 'none'
               arrow.textContent = 'keyboard_arrow_up'
            }
         })
      }
   }, 100)

   updateMapMarkers()
}

const updateMapMarkers = () => {
   if (!map.value) return

   markers.value.forEach(marker => map.value.removeLayer(marker))
   markers.value = []

   if (mapFilter.value === 'all' || mapFilter.value === 'workorders') {
      props.workOrders.forEach(wo => {
         const color = getWorkOrderMarkerColor(wo)
         const icon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="marker-work-icon" style="background-color: ${color};"><i class="material-icons">work</i></div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
         })

         const marker = L.marker([wo.lat, wo.lng], { icon })
            .addTo(map.value)
            .bindPopup(`
          <div class="map-popup">
            <h4>${wo.title}</h4>
            <p><strong>Priority:</strong> ${wo.priority}</p>
            <p><strong>Status:</strong> ${wo.status}</p>
            <p><strong>Location:</strong> ${wo.location}</p>
            <p><strong>Assigned to:</strong> ${wo.assignee || 'Unassigned'}</p>
            <p class="map-popup-desc">${wo.description}</p>
          </div>
        `)
         markers.value.push(marker)
      })
   }

   if (mapFilter.value === 'all' || mapFilter.value === 'crews') {
      props.crews.forEach(crew => {
         const color = getCrewMarkerColor(crew)
         const icon = L.divIcon({
            className: 'custom-marker-icon',
            html: `<div class="marker-person-icon" style="background-color: ${color};"><i class="material-icons">person</i></div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
         })

         const marker = L.marker([crew.lat, crew.lng], { icon })
            .addTo(map.value)
            .bindPopup(`
          <div class="map-popup">
            <h4>${crew.id}</h4>
            <p><strong>Status:</strong> ${crew.status}</p>
            <p><strong>Lead:</strong> ${crew.lead}</p>
            <p><strong>Technician:</strong> ${crew.technician}</p>
            <p><strong>Location:</strong> ${crew.locationName}</p>
            <p><strong>Skills:</strong> ${crew.skills.join(', ')}</p>
            <p><strong>Workload:</strong> ${crew.workload}</p>
          </div>
        `)
         markers.value.push(marker)
      })
   }
}

const getWorkOrderMarkerColor = (wo) => {
   const colors = { CRITICAL: '#d32f2f', HIGH: '#ff6f00', MEDIUM: '#fbc02d', LOW: '#388e3c' }
   return colors[wo.priority] || '#999'
}

const getCrewMarkerColor = (crew) => {
   const colors = { Available: '#4caf50', 'On Job': '#fbc02d', Offline: '#d32f2f' }
   return colors[crew.status] || '#999'
}

onMounted(() => {
   nextTick(() => {
      initMap()
   })
})

onBeforeUnmount(() => {
   if (map.value) {
      map.value.remove()
   }
})
</script>