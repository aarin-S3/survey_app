<template>
   <q-page class="window-height column no-wrap overflow-hidden" :class="$q.dark.isActive ? 'bg-dark-page' : 'bg-white'">

      <div class="col-auto bg-transparent z-top">
         <q-toolbar style="min-height: 30px;">
            <h4 v-on:click="currentPage = 'home'"
               :style="[$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;', $q.screen.lt.md ? 'display: none;' : 'display: inline-block;']"
               style="font-size: 1rem;  font-weight: 400; cursor: pointer;">
              {{ surveyStore.currentSurveyName }}
               <q-icon :class="$q.dark.isActive ? 'drawer_btn--dark' : ''"
                  :name="currentPage === 'home' ? '' : 'chevron_right'" style="width: 10px;" />
            </h4>
            <h4 v-on:click="currentPage = 'home'"
               :style="[$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;', $q.screen.lt.md ? 'display: inline-block;' : 'display: none;']"
               style="font-size: 1rem;  font-weight: 400; cursor: pointer;">
               {{ surveyStore.currentSurveyName }}
               <q-icon :class="$q.dark.isActive ? 'drawer_btn--dark' : ''"
                  :name="currentPage === 'home' ? '' : 'chevron_right'" style="width: 10px;" />
            </h4>

            <q-breadcrumbs :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'" active-color="secondary" style=""
               :style="$q.screen.lt.md ? 'font-size: 10px;' : 'font-size: 13px;'">
               <q-breadcrumbs-el v-if="currentPage === 'form1'" label="Form 1"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form2'" label="Form 2"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form3'" label="Form 3"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form4'" label="Form 4"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form5'" label="Form 5"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form6'" label="Form 6"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form7'" label="Form 7"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form8'" label="Form 8"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form9'" label="Form 9"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form10'" label="Form 10"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form11'" label="Form 11"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form12'" label="Form 12"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form13'" label="Form 13"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form14'" label="Form 14"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form15'" label="Form 15"
                  style="margin-top: 2px; margin-left: 3px;" />
               <q-breadcrumbs-el v-if="currentPage === 'form16'" label="Form 16"
                  style="margin-top: 2px; margin-left: 3px;" />
            </q-breadcrumbs>

            <q-space />
            <q-btn flat dense bordered label="Submit" :text-color="$q.dark.isActive ? 'grey-4' : 'grey-9'" class=""
               :class="$q.screen.lt.sm ? 'btn-size-dialog-small' : 'btn-size-dialog'">
               <q-tooltip :offset="[10, 5]"
                  style="background-color: #1d1d1d; border: 1px solid white; font: 100 !important">
                  Submit Form
               </q-tooltip>
            </q-btn>

         </q-toolbar>
      </div>

      <div class="col row no-wrap overflow-hidden">
         <div class="col-auto menu-container"
            style="width: 130px; height: 85vh; padding: 0px; margin-left: 0px; margin-top: 7px; border-radius: 3px; ">
            <q-list>
               <q-item v-for="item in arrSideMenu" :key="item.currentListPage" clickable v-ripple
                  @click="currentPage = item.currentListPage" :active="currentPage === item.currentListPage"
                  active-class="bg-transparent text-secondary"
                  style=" padding: 0px; padding-left: 8px; margin: 0px; margin-bottom: 0px;">
                  <q-item-section avatar style="padding: 1px 0px; margin: 0px;">
                     <div style="display: flex; margin-top: 10px;">
                        <q-icon :name="item.icon" style="font-size: 21px;" />
                        <p style="font-size: 12px; display: inline; margin-top: 2px; margin-left: 3px;">{{ item.MenuName }}</p>
                     </div>
                  </q-item-section>
                  <q-tooltip anchor="center right" self="center left" :offset="[10, 0]"
                     style="background-color: #1d1d1d; border: 1px solid #e0e0e0 !important; color: #e0e0e0 !important;">
                     {{ item.MenuName }}
                  </q-tooltip>
               </q-item>
            </q-list>
         </div>

         <div class="col scroll-y relative-position" id="scroll-target">

            <HomePage name="Substation 1 Survey" v-show="currentPage === 'home'"></HomePage>

            <FormLayout v-show="currentPage === 'form1'"/>
            <!-- <HomePage name="Form 1" v-show="currentPage === 'form1'"></HomePage> -->
            <HomePage name="Form 2" v-show="currentPage === 'form2'"></HomePage>
            <HomePage name="Form 3" v-show="currentPage === 'form3'"></HomePage>
            <HomePage name="Form 4" v-show="currentPage === 'form4'"></HomePage>
            <HomePage name="Form 5" v-show="currentPage === 'form5'"></HomePage>
            <HomePage name="Form 6" v-show="currentPage === 'form6'"></HomePage>
            <HomePage name="Form 7" v-show="currentPage === 'form7'"></HomePage>
            <HomePage name="Form 8" v-show="currentPage === 'form8'"></HomePage>
            <HomePage name="Form 9" v-show="currentPage === 'form9'"></HomePage>
            <HomePage name="Form 10" v-show="currentPage === 'form10'"></HomePage>
            <HomePage name="Form 11" v-show="currentPage === 'form11'"></HomePage>
            <HomePage name="Form 12" v-show="currentPage === 'form12'"></HomePage>
            <HomePage name="Form 13" v-show="currentPage === 'form13'"></HomePage>
            <HomePage name="Form 14" v-show="currentPage === 'form14'"></HomePage>
            <HomePage name="Form 15" v-show="currentPage === 'form15'"></HomePage>
            <HomePage name="Form 16" v-show="currentPage === 'form16'"></HomePage>


            <!-- <Dashboard v-show="currentPage === 'dashboard'"
               :currentPage="currentPage"
               :dbnumberData="arrCircularValues"
               :donutChartData="objDonutChartData"
               :donutChartData2="objDonutChartData2"
               :barChartData="objBarChartData"
               :workOrders="workOrders"
               :crews="crews"
            ></Dashboard>

            <div v-show="currentPage === 'workOrders'" class="">
               <WorkOrderTable />
            </div>

            <div v-show="currentPage === 'crews'" class="">
               <CrewOrderTable />
            </div>

            <div v-show="currentPage === 'activity'" class="">
               <ActivityLogTable />
            </div> -->

            <!-- <div class="q-mb-xl"></div> -->
         </div>
      </div>



   </q-page>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'
import Chart from 'chart.js/auto'
import { useThemeStore } from '../../stores/theme_store'
import DbNumber from '../../components/widgets/DbNumber.vue'
// import Dialog from './components/dialog/dialog.vue'
import NewDia from './components/dialog/new_dia.vue'
import TabDialog from './components/dialog/tab_dialog.vue'
import HomePage from './components/sub_pages/home_page.vue'
import WorkOrderTable from './components/tabulators/work_order_table.vue'
import CrewOrderTable from './components/tabulators/crew_order_table.vue'
import ActivityLogTable from './components/tabulators/activity_log_table.vue'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'
import DonutChart from '../dashboard/components/chartjs/donut_chart/donut_chart.vue'
import BarChart from '../dashboard/components/chartjs/bar_chart/bar_chart.vue'
import Dashboard from './components/sub_pages/dashboard.vue'
import FormLayout from './components/dialog/form_layout.vue'
import { useSurveyStore } from '../../stores/survey_store'

defineOptions({
   components: {
      DbNumber,
      DonutChart,
      BarChart,
      Dashboard
   }
})

const $q = useQuasar()
const currentPage = ref('home')
const surveyStore = useSurveyStore()
// Dialogs 
const showWorkOrderDialog = ref(false)
const showCrewDialog = ref(false)
const showAssignDialog = ref(false)
const showWorkloadDialog = ref(false)

// Editing flags 
const editingWorkOrder = ref(false)
const editingCrew = ref(false)

// Selected items 
const selectedWorkOrder = ref(null)
const assignCrewId = ref(null)
const selectedCrewWorkload = ref(null)

// Tabulator instances 
const workOrdersTable = ref(null)
const crewsTable = ref(null)
const activityTable = ref(null)
const dashboardWOTable = ref(null)
const dashboardCrewTable = ref(null)

const themeStore = useThemeStore()
const containers = ref([])
const chartInstances = ref([])
const instAuditLogtable = ref(null)
const formRef = ref(null)
const switchingOrderTextarea = ref(null)

const arrSideMenu = ref([
   { currentListPage: 'form1', MenuName: 'Survey Form 1', icon: 'looks_one' },
   { currentListPage: 'form2', MenuName: 'Survey Form 2', icon: 'looks_two' },
   { currentListPage: 'form3', MenuName: 'Survey Form 3', icon: 'looks_3' },
   { currentListPage: 'form4', MenuName: 'Survey Form 4', icon: 'looks_4' },
   { currentListPage: 'form5', MenuName: 'Survey Form 5', icon: 'looks_5' },
   { currentListPage: 'form6', MenuName: 'Survey Form 6', icon: 'looks_6' },
   { currentListPage: 'form7', MenuName: 'Survey Form 7', icon: 'book' },
   { currentListPage: 'form8', MenuName: 'Survey Form 8', icon: 'book' },
   { currentListPage: 'form9', MenuName: 'Survey Form 9', icon: 'book' },
   { currentListPage: 'form10', MenuName: 'Survey Form 10', icon: 'book' },
   { currentListPage: 'form11', MenuName: 'Survey Form 11', icon: 'book' },
   { currentListPage: 'form12', MenuName: 'Survey Form 12', icon: 'book' },
   { currentListPage: 'form13', MenuName: 'Survey Form 13', icon: 'book' },
   { currentListPage: 'form14', MenuName: 'Survey Form 14', icon: 'book' },
   { currentListPage: 'form15', MenuName: 'Survey Form 15', icon: 'book' },
   { currentListPage: 'form16', MenuName: 'Survey Form 16', icon: 'book' },
])

const arrBreadCrumb = ref([
   { label: 'Dashboard', currentListPage: 'dashboard' },
   { label: 'Work Orders', currentListPage: 'workOrders' },
   { label: 'Crews', currentListPage: 'crews' },
   { label: 'Activity Log', currentListPage: 'activity' },
])
// ========== ALERTIFY CONFIGURATION ========== 
const alertMessages = [
   { type: 'success', message: 'Work order WO-245 completed successfully!' },
   { type: 'error', message: 'Connection lost to Crew-18. Retrying...' },
   { type: 'warning', message: 'Low battery alert on Crew-15 device' },
   { type: 'success', message: 'New crew member Crew-101 added to system' },
   { type: 'error', message: 'Failed to update location for Crew-23' },
   { type: 'warning', message: 'High priority work order assigned to Crew-8' },
   { type: 'success', message: 'Status updated: WO-189 marked as complete' },
   { type: 'message', message: 'System maintenance scheduled for tonight at 11 PM' },
   { type: 'warning', message: 'Weather alert: Heavy rain expected in North Zone' },
   { type: 'success', message: 'Crew-12 arrived at work site location' },
   { type: 'error', message: 'Equipment malfunction reported by Crew-7' },
   { type: 'message', message: 'New work orders available for assignment' },
   { type: 'warning', message: 'Crew-5 overtime threshold exceeded' },
   { type: 'success', message: 'Emergency repair completed ahead of schedule' },
   { type: 'message', message: 'Daily crew briefing starts in 15 minutes' },
   { type: 'warning', message: 'Vehicle Unit-045 due for maintenance' },
   { type: 'error', message: 'GPS signal lost for Crew-32' },
   { type: 'success', message: 'All crews checked in successfully' }
]

let alertInterval = null

const showRandomAlert = () => {
   const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)]

   switch (randomAlert.type) {
      case 'success':
         alertify.success(randomAlert.message)
         break
      case 'error':
         alertify.error(randomAlert.message)
         break
      case 'warning':
         alertify.warning(randomAlert.message)
         break
      default:
         alertify.message(randomAlert.message)
   }
}



const startRandomAlerts = () => {
   if (alertInterval) clearInterval(alertInterval)

   // Show first alert immediately 
   setTimeout(() => {
      showRandomAlert()
   }, 2000)

   // Then show alerts every 8-15 seconds randomly 
   alertInterval = setInterval(() => {
      showRandomAlert()
   }, Math.floor(Math.random() * 7000) + 8000)
}

const stopRandomAlerts = () => {
   if (alertInterval) {
      clearInterval(alertInterval)
      alertInterval = null
   }
}
// =============================================== 
let dbInterval = null
const arrCircularValues = ref([
   { value: 50, total: 100, title: 'SCHEDULED', subtitle: 'This Month', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [10, 40, 25, 50, 30, 60, 35, 55, 40, 50, 45, 60, 50, 40, 55, 35, 60, 30, 65, 25, 70, 20, 75, 15, 80, 10] },
   { value: 90, total: 100, title: 'IN PROGRESS', subtitle: 'Currently Active', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] },
   { value: 70, total: 100, title: 'COMPLETED', subtitle: 'This Month', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [2.1, 2.5, 2.2, 2.8, 2.3, 2.6, 2.4, 2.1, 2.7, 2.3] },
   { value: 80, total: 100, title: 'CUSTOMER AFFECTED', subtitle: 'Total Planned', percentRanges: [{ value: 70, color: '#f44336' }, { value: 90, color: '#ff9800' }, { value: 100, color: '#4caf50' }], trend: [5, 95, 10, 90, 3, 97, 15, 85, 8, 92, 2, 99, 18, 82, 4, 96, 20, 80, 5, 95, 25, 75, 3, 98, 10, 90, 8, 92, 6, 94, 4, 96, 2, 98, 0, 100] },
])

const generateRandomDbData = () => {
   dbInterval = setInterval(() => {
      arrCircularValues.value.forEach((item) => {
         item.value = Math.floor(Math.random() * 100)
      })
   }, 3000)

}

const objDonutChartData = ref({
   title: 'Work Orders',
   labels: ['low', 'Medium', 'High', 'Critical'],
   labelsData: [35, 20, 25, 20]
})
let donutInterval = null

const generateRandomDonutData = () => {
   donutInterval = setInterval(() => {
      objDonutChartData.value.labelsData = objDonutChartData.value.labelsData.map(() => {
         return Math.floor(Math.random() * (50 - 0 + 1)) + 0;
      });
   }, 3000)

}
const objDonutChartData2 = ref({
   title: 'Crews',
   labels: ['Maintanance', 'On-Duty', 'Available', 'Offline'],
   labelsData: [35, 20, 25, 20]
})
let donutInterval2 = null

const generateRandomDonutData2 = () => {
   donutInterval2 = setInterval(() => {
      objDonutChartData2.value.labelsData = objDonutChartData2.value.labelsData.map(() => {
         return Math.floor(Math.random() * (50 - 0 + 1)) + 0;
      });
   }, 3000)

}
const objBarChartData = ref({
   title: 'Work Orders',
   maxValue: 60,
   labels: ['Assigned', 'Unassigned', 'In Progress', 'Completed'],
   labelsData: [50, 20, 20, 10]
})
let barInterval = null

const generateRandomBarData = () => {
   barInterval = setInterval(() => {
      objBarChartData.value.labelsData = objBarChartData.value.labelsData.map(() => {
         return Math.floor(Math.random() * (50 - 0 + 1)) + 0;
      });
   }, 3000)

}


const getChartConfigs = () => {
   const colors = themeColors.value
   return [
      {
         type: 'doughnut',
         data: {
            labels: ['low', 'Medium', 'High', 'Critical'],
            datasets: [{
               data: [35, 20, 25, 20],
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
               title: { display: true, text: 'Work Orders', color: '#9e9e9e', font: { size: 14, weight: '500' } },
               legend: { display: true, position: 'right', labels: { color: '#9e9e9e', usePointStyle: true, padding: 20 } }
            }
         }
      },
      {
         type: 'doughnut',
         data: {
            labels: ['Maintanance', 'On-Duty', 'Available', 'Offline'],
            datasets: [{
               data: [40, 24, 26, 10],
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
               title: { display: true, text: 'Crews', color: '#9e9e9e', font: { size: 14, weight: '500' } },
               legend: { display: true, position: 'right', labels: { color: '#9e9e9e', usePointStyle: true, padding: 20 } }
            }
         }
      },
      {
         type: 'bar',
         data: {
            labels: ['Assigned', 'Unassigned', 'In Progress', 'Completed'],
            datasets: [{
               label: 'Work Orders',
               data: [
                  workOrders.value.filter(wo => wo.assignee && wo.status === 'todo').length,
                  workOrders.value.filter(wo => !wo.assignee).length,
                  workOrders.value.filter(wo => wo.status === 'in-progress').length,
                  workOrders.value.filter(wo => wo.status === 'done').length
               ],
               backgroundColor: colors.map(c => c.background),
               borderColor: colors.map(c => c.border),
               borderWidth: 1,
               borderRadius: 1
            }]
         },
         options: makeBarOptions(workOrders.value.length, 'Work Orders')
      }
   ]
}

const form = ref({
   name: '',
   phone: '',
   email: '',
   serviceCenter: '',
   mailingAddress: '',
   scheduledStartTime: '',
   scheduledEndTime: '',
   scheduledDuration: '',
   creationDate: '',
   overrideMailingDate: false,
   workOrderId: '',
   eventType1: '',
   plannedOutageType: '',
   alternateStartTime: '',
   alternateEndTime: '',
   alternateDuration: '',
   useAlternateDateTime: false,
   switchingOrder: '',
   creatorComments: ''
})

const eventTypes = [
   'Replacement',
   'Maintenance',
   'Emergency',
   'Upgrade'
]

const plannedOutageTypes = [
   'Planned Outage',
   'Unplanned Outage',
   'Unplanned Planned Outage',
   'Changed Planned Outage'
]

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
            color: '#9e9e9e',
            font: { size: 14, weight: '500' }
         },
         legend: { display: false }
      },
      scales: {
         x: {
            grid: { display: true, color: '#333' },
            ticks: { color: '#9e9e9e' }
         },
         y: {
            grid: { display: true, color: '#333' },
            ticks: { color: '#9e9e9e', stepSize: 5 },
            max: 25
         }
      }
   }
}

const circularConfigs = [
   { value: 50.05, color: '#6B8E23' },
   { value: 24.59, color: '#CD853F' },
   { value: 0.00, color: '#DAA520' },
   { value: 25.36, color: '#D2691E' }
]

// Data Generators 
const generateWorkOrders = (count) => {
   const titles = [
      'Power Outage Investigation', 'Transformer Maintenance', 'Line Inspection',
      'Emergency Repair', 'Meter Installation', 'Cable Replacement',
      'Pole Inspection', 'Substation Upgrade', 'Underground Cable Repair',
      'Circuit Breaker Testing', 'Voltage Regulator Service', 'Fuse Replacement',
      'Street Light Repair', 'Tree Trimming Near Lines', 'Storm Damage Assessment',
      'Load Balancing Check', 'Capacitor Bank Inspection', 'Relay Protection Testing',
      'Grounding System Check', 'Insulator Replacement', 'Lightning Arrester Install'
   ]

   const descriptions = [
      'Investigate and resolve issue', 'Routine maintenance required',
      'Complete inspection needed', 'Urgent repair necessary',
      'Installation of new equipment', 'Replace aging infrastructure',
      'Safety inspection required', 'System upgrade implementation',
      'Emergency response needed', 'Preventive maintenance task'
   ]

   const statuses = ['todo', 'in-progress', 'review', 'done']
   const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

   const locations = [
      'Downtown District', 'Industrial Zone', 'Residential Area', 'Business Park',
      'City Center', 'Suburb Region', 'Rural Route', 'Highway Corridor',
      'Shopping Complex', 'Medical District', 'University Campus', 'Airport Zone'
   ]

   const latRange = { min: 8.0, max: 35.0 }
   const lngRange = { min: 68.0, max: 97.0 }

   const orders = []

   for (let i = 1; i <= count; i++) {
      const title = titles[Math.floor(Math.random() * titles.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const priority = priorities[Math.floor(Math.random() * priorities.length)]
      const location = `${locations[Math.floor(Math.random() * locations.length)]} ${i}`

      const day = Math.floor(Math.random() * 30) + 1
      const month = Math.floor(Math.random() * 12) + 1
      const hour = Math.floor(Math.random() * 24)
      const minute = Math.floor(Math.random() * 60)

      orders.push({
         id: i,
         title: `${title} #${i}`,
         description: descriptions[Math.floor(Math.random() * descriptions.length)],
         status,
         priority,
         assignee: status === 'done' || status === 'in-progress' || Math.random() > 0.5
            ? `Crew-${Math.floor(Math.random() * 100) + 1}`
            : null,
         location,
         lat: latRange.min + Math.random() * (latRange.max - latRange.min),
         lng: lngRange.min + Math.random() * (lngRange.max - lngRange.min),
         createdAt: `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      })
   }

   return orders
}

const generateCrews = (count) => {
   const firstNames = [
      'John', 'Mike', 'Robert', 'David', 'James', 'William', 'Richard', 'Thomas',
      'Sarah', 'Lisa', 'Emma', 'Maria', 'Anna', 'Jenny', 'Laura', 'Amy',
      'Chris', 'Tom', 'Alex', 'Ben', 'Kevin', 'Brian', 'Eric', 'Ryan'
   ]

   const lastNames = [
      'Smith', 'Johnson', 'Davis', 'Brown', 'Wilson', 'Miller', 'Garcia', 'Rodriguez',
      'Martinez', 'Chen', 'Wong', 'Lee', 'Taylor', 'Anderson', 'Thomas', 'Jackson',
      'White', 'Harris', 'Martin', 'Thompson', 'Moore', 'Young', 'King', 'Scott'
   ]

   const statuses = ['Available', 'On Job', 'Offline']
   const skillsList = ['HV Cert', 'LV', 'Splicing', 'Substation', 'Metering', 'Cable Work']

   const locations = [
      'North Zone', 'South Zone', 'East Zone', 'West Zone',
      'Central Hub', 'Depot A', 'Depot B', 'Field Station',
      'Service Center', 'Maintenance Yard'
   ]

   const latRange = { min: 8.0, max: 35.0 }
   const lngRange = { min: 68.0, max: 97.0 }

   const crews = []

   for (let i = 1; i <= count; i++) {
      const lead = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
      const tech = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      const numSkills = Math.floor(Math.random() * 3) + 1
      const skills = []
      const availableSkills = [...skillsList]
      for (let j = 0; j < numSkills; j++) {
         const idx = Math.floor(Math.random() * availableSkills.length)
         skills.push(availableSkills[idx])
         availableSkills.splice(idx, 1)
      }

      const workload = status === 'On Job'
         ? `${Math.floor(Math.random() * 3) + 1} Active`
         : status === 'Available' ? '0 Active' : 'Offline'

      crews.push({
         id: `Crew-${i}`,
         status,
         skills,
         workload,
         locationName: `${locations[Math.floor(Math.random() * locations.length)]} ${i}`,
         lat: latRange.min + Math.random() * (latRange.max - latRange.min),
         lng: lngRange.min + Math.random() * (lngRange.max - lngRange.min),
         lead,
         technician: tech,
         vehicle: `Unit-${String(i).padStart(3, '0')}`
      })
   }

   return crews
}

// Data - Generated 
const workOrders = ref(generateWorkOrders(50))
const crews = ref(generateCrews(50))

const activities = ref([
   { id: 1, timestamp: '2025-11-03 16:35', action: 'Work order created', details: 'WO-50 created', user: 'System', type: 'create' },
   { id: 2, timestamp: '2025-11-03 14:20', action: 'Work order assigned', details: 'WO-45 assigned to Crew-23', user: 'Admin', type: 'assign' },
   { id: 3, timestamp: '2025-11-02 15:45', action: 'Status updated', details: 'WO-40 status changed to Review', user: 'Crew-10', type: 'update' },
   { id: 4, timestamp: '2025-11-02 09:15', action: 'Crew created', details: 'Crew-100 added to system', user: 'Admin', type: 'create' },
   { id: 5, timestamp: '2025-11-01 10:30', action: 'Status updated', details: 'WO-30 status changed to In Progress', user: 'Crew-15', type: 'update' },
   { id: 6, timestamp: '2025-11-01 09:00', action: 'Work order created', details: 'WO-25 created', user: 'System', type: 'create' }
])

// Dashboard Stats 
const dashboardStats = computed(() => {
   return {
      totalWorkOrders: workOrders.value.length,
      activeCrews: crews.value.filter(c => c.status === 'Available' || c.status === 'On Job').length,
      inProgress: workOrders.value.filter(w => w.status === 'in-progress').length,
      unassigned: workOrders.value.filter(w => !w.assignee).length
   }
})

// Form data 
const workOrderForm = ref({
   title: '',
   description: '',
   status: 'todo',
   priority: 'MEDIUM',
   assignee: null,
   location: '',
   lat: 20.5937,
   lng: 78.9629
})

const crewForm = ref({
   id: '',
   lead: '',
   technician: '',
   status: 'Available',
   locationName: '',
   lat: 20.5937,
   lng: 78.9629,
   skills: [],
   vehicle: ''
})



const createCharts = () => {
   chartInstances.value.forEach(chart => chart && chart.destroy())
   chartInstances.value = []

   containers.value.forEach(container => {
      if (container) container.innerHTML = ''
   })

   const chartConfigs = getChartConfigs()
   chartConfigs.forEach((config, idx) => {
      if (containers.value[idx]) {
         const canvas = document.createElement('canvas')
         containers.value[idx].appendChild(canvas)
         chartInstances.value[idx] = new Chart(canvas, config)
      }
   })

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

const updateDashboard = () => {
   if (dashboardWOTable.value) {
      dashboardWOTable.value.setData(workOrders.value.slice(0, 50))
   }
   if (dashboardCrewTable.value) {
      dashboardCrewTable.value.setData(crews.value.slice(0, 50))
   }
}

const getPriorityColor = (priority) => {
   const colors = { CRITICAL: 'red-9', HIGH: 'negative', MEDIUM: 'orange', LOW: 'green-9' }
   return colors[priority] || 'grey'
}

const getStatusColor = (status) => {
   const colors = { todo: 'grey-8', 'in-progress': 'blue-10', review: 'orange', done: 'green-9' }
   return colors[status] || 'grey'
}

const getCrewStatusColor = (status) => {
   const colors = { Available: 'green-9', 'On Job': 'orange-8', Offline: 'red-9' }
   return colors[status] || 'grey'
}

const priorityFormatter = (cell) => {
   const value = cell.getValue() || "";
   const colors = {
      LOW: "#4a7355",
      MEDIUM: "#a27b4b",
      HIGH: "#a74d4d",
      CRITICAL: "#d32f2f"
   };
   const bg = colors[value] || "#777";
   return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
}

const statusFormatter = (cell) => {
   const value = cell.getValue() || "";
   const colors = {
      "todo": "#9c4141",
      "in-progress": "#6b8ba4",
      "review": "#a084ca",
      "done": "#4a8a59",
   };
   const bg = colors[value] || "#777";
   return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
}

const crewStatusFormatter = (cell) => {
   const value = cell.getValue() || "";
   const colors = {
      "Available": "#4a8a59",
      "On Job": "#a27b4b",
      "Offline": "#9c4141",
   };
   const bg = colors[value] || "#777";
   return `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:${bg};font-weight:500; font-size:10px;">${value}</span>`
}

const skillsFormatter = (cell) => {
   const skills = cell.getValue()
   if (!skills || skills.length === 0) return ''
   return skills.map(s => `<span style="display:inline-block;padding:3px 8px;border-radius:4px;color:white;background-color:#4a7355;font-weight:500; font-size:10px; margin-right:3px;">${s}</span>`).join('')
}

const actionsFormatter = (cell, type) => {
   // Matching the visual style from page 1 using inline styles and icons
   if (type === 'workorder') {
      return ` 
        <div style="display: flex; align-items: center; justify-content: left; height: 100%; margin-left:5px; "> 
          <i class="material-icons q-mr-sm action-icon" data-action="assign" title="Assign Crew" style="color: #388e3c; margin-right:1rem;">assignment_ind</i>
          <i class="material-icons q-mr-sm action-icon edit-btn" data-action="edit" title="Edit Task" style="color: #1976D2; margin-right:1rem;">edit</i> 
          <i class="material-icons action-icon delete-btn" data-action="delete" title="Delete Task" style="color: #C10015;">delete</i> 
        </div> 
        `;
   } else {
      // Crew actions
      return ` 
        <div style="display: flex; align-items: center; justify-content: left; height: 100%; margin-left:5px; "> 
          <i class="material-icons q-mr-sm action-icon edit-btn" data-action="edit" title="Edit Crew" style="color: #1976D2; margin-right:1rem;">edit</i> 
          <i class="material-icons action-icon delete-btn" data-action="delete" title="Delete Crew" style="color: #C10015;">delete</i> 
        </div> 
        `;
   }
}

const viewCrewWorkload = (crew) => {
   const assignedWorkOrders = workOrders.value.filter(wo => wo.assignee === crew.id)

   selectedCrewWorkload.value = {
      crew: crew,
      workOrders: assignedWorkOrders
   }

   showWorkloadDialog.value = true
}

const openWorkOrderDialog = (workOrder = null) => {
   if (workOrder) {
      editingWorkOrder.value = true
      workOrderForm.value = { ...workOrder }
   } else {
      editingWorkOrder.value = false
      // resetWorkOrderForm()
   }
   showWorkOrderDialog.value = true
}

const openCrewDialog = (crew = null) => {
   if (crew) {
      editingCrew.value = true
      crewForm.value = { ...crew }
   } else {
      editingCrew.value = false
      // resetCrewForm()
   }
   showCrewDialog.value = true
}


const deleteWorkOrder = (id) => {
   $q.dialog({
      title: 'Confirm',
      message: 'Are you sure you want to delete this work order?',
      cancel: true,
      persistent: true
   }).onOk(() => {
      const index = workOrders.value.findIndex(w => w.id === id)
      if (index > -1) {
         const wo = workOrders.value[index]
         workOrders.value.splice(index, 1)
         logActivity('delete', `Work order deleted: ${wo.title}`)
         refreshTables()
         // updateMapMarkers() // MOVED TO CHILD

         alertify.error(`âœ— Work order ${wo.title} deleted`) // Added Alertify 

         $q.notify({
            message: 'Work order deleted successfully',
            color: 'negative',
            icon: 'delete',
            position: 'top'
         })
      }
   })
}

const deleteCrew = (id) => {
   $q.dialog({
      title: 'Confirm',
      message: 'Are you sure you want to delete this crew?',
      cancel: true,
      persistent: true
   }).onOk(() => {
      const index = crews.value.findIndex(c => c.id === id)
      if (index > -1) {
         const crew = crews.value[index]
         crews.value.splice(index, 1)
         logActivity('delete', `Crew deleted: ${crew.id}`)
         refreshTables()
         // updateMapMarkers() // MOVED TO CHILD

         alertify.warning(`âš  Crew ${crew.id} has been removed from system`) // Added Alertify 

         $q.notify({
            message: 'Crew deleted successfully',
            color: 'negative',
            icon: 'delete',
            position: 'top'
         })
      }
   })
}

const openAssignDialog = (workOrder) => {
   selectedWorkOrder.value = workOrder
   assignCrewId.value = null
   showAssignDialog.value = true
}

const logActivity = (type, details) => {
   const now = new Date()
   const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

   activities.value.unshift({
      id: activities.value.length + 1,
      timestamp,
      action: type.charAt(0).toUpperCase() + type.slice(1),
      details,
      user: 'Admin',
      type
   })

   if (activityTable.value) {
      activityTable.value.setData(activities.value)
   }
}

const refreshTables = () => {
   if (workOrdersTable.value) workOrdersTable.value.setData(workOrders.value)
   if (crewsTable.value) crewsTable.value.setData(crews.value)
   updateDashboard()
}

const initAuditLogTable = () => {
   if (instAuditLogtable.value) {
      instAuditLogtable.value.destroy()
   }

}

const initTables = () => {
   // WORK ORDERS TABLE
   if (document.getElementById('work-orders-table')) {
      workOrdersTable.value = new Tabulator('#work-orders-table', {
         data: workOrders.value,
         columnHeaderVertAlign: 'center',
         height: '100%',
         layout: 'fitColumns',
         pagination: true,
         paginationSize: 20,
         responsiveLayout: true,
         columns: [
            { title: 'ID', field: 'id', width: 75, vertAlign: 'middle', widthGrow: 0.5 },
            { title: 'Title', field: 'title', width: 171, vertAlign: 'middle', widthGrow: 1.5 },
            { title: 'Description', field: 'description', width: 250, vertAlign: 'middle' },
            { title: 'Priority', field: 'priority', width: 100, vertAlign: 'middle', formatter: priorityFormatter, widthGrow: 1 },
            { title: 'Status', field: 'status', width: 100, vertAlign: 'middle', formatter: statusFormatter, widthGrow: 1 },
            { title: 'Assigned To', field: 'assignee', width: 120, vertAlign: 'middle' },
            { title: 'Location', field: 'location', width: 150, vertAlign: 'middle' },
            { title: 'Created', field: 'createdAt', width: 125, vertAlign: 'middle' },
            {
               title: 'Actions',
               width: 130,
               headerSort: false,
               vertAlign: 'middle',
               formatter: (cell) => actionsFormatter(cell, 'workorder'),
               cellClick: (e, cell) => {
                  const action = e.target.dataset.action
                  const wo = cell.getRow().getData()
                  if (action === 'edit') openWorkOrderDialog(wo)
                  else if (action === 'delete') deleteWorkOrder(wo.id)
                  else if (action === 'assign') openAssignDialog(wo)
               },
            }
         ]
      })
   }

   // CREWS TABLE
   if (document.getElementById('crews-table')) {
      crewsTable.value = new Tabulator('#crews-table', {
         data: crews.value,
         height: '100%',
         layout: 'fitColumns',
         pagination: true,
         paginationSize: 20,
         columnHeaderVertAlign: 'center',
         columns: [
            { title: 'Crew ID', field: 'id', width: 90, vertAlign: 'middle', widthGrow: 0.8 },
            { title: 'Lead', field: 'lead', width: 150, vertAlign: 'middle', widthGrow: 1 },
            { title: 'Technician', field: 'technician', width: 150, vertAlign: 'middle', widthGrow: 1 },
            { title: 'Status', field: 'status', width: 115, vertAlign: 'middle', formatter: crewStatusFormatter, widthGrow: 1 },
            { title: 'Skills', field: 'skills', width: 210, vertAlign: 'middle', formatter: skillsFormatter, widthGrow: 1.5 },
            { title: 'Workload', field: 'workload', width: 120, vertAlign: 'middle' },
            { title: 'Location', field: 'locationName', width: 150, vertAlign: 'middle' },
            {
               title: 'Details',
               width: 80,
               hozAlign: 'center',
               vertAlign: 'middle',
               formatter: (cell) => {
                  return '<div style="display: flex; align-items: center; justify-content: center; height: 100%;"><i class="material-icons view-btn" style="cursor: pointer; font-size: 20px; color: #4CAF50;">visibility</i></div>'
               },
               cellClick: (e, cell) => {
                  const crew = cell.getRow().getData()
                  viewCrewWorkload(crew)
               },
               headerSort: false
            },
            {
               title: 'Actions',
               width: 120,
               vertAlign: 'middle',
               formatter: (cell) => actionsFormatter(cell, 'crew'),
               cellClick: (e, cell) => {
                  const action = e.target.dataset.action
                  const crew = cell.getRow().getData()
                  if (action === 'view') viewCrewWorkload(crew)
                  else if (action === 'edit') openCrewDialog(crew)
                  else if (action === 'delete') deleteCrew(crew.id)
               },
               headerSort: false
            }
         ]
      })
   }

   if (document.getElementById('dashboard-wo-table')) {
      dashboardWOTable.value = new Tabulator('#dashboard-wo-table', {
         data: workOrders.value.slice(0, 50),
         layout: 'fitColumns',
         height: '100%',
         columns: [
            { title: 'Title', field: 'title', widthGrow: 0.5 },
            { title: 'Priority', field: 'priority', widthGrow: 0.5, formatter: priorityFormatter },
            { title: 'Status', field: 'status', widthGrow: 0.5, formatter: statusFormatter }
         ]
      })
   }

   if (document.getElementById('dashboard-crew-table')) {
      dashboardCrewTable.value = new Tabulator('#dashboard-crew-table', {
         data: crews.value.slice(0, 50),
         layout: 'fitColumns',
         height: '100%',
         columns: [
            { title: 'Crew ID', field: 'id', widthGrow: 0.5 },
            { title: 'Status', field: 'status', widthGrow: 0.5, formatter: crewStatusFormatter },
            { title: 'Workload', field: 'workload', widthGrow: 0.5 }
         ]
      })
   }
}

// ========== LIFECYCLE HOOKS ========== 
onMounted(async () => {
   // Configure Alertify 
   //    alertify.set('notifier', 'position', 'bottom-right')
   //   alertify.set('notifier', 'delay', 5)

   if (form.value.switchingOrder === '') {
      form.value.switchingOrder = '• '
   }

   await nextTick()
   initAuditLogTable()
   createCharts()

   // initMap() <-- REMOVED THIS CAUSING ERROR

   initTables()
   generateRandomDbData()
   generateRandomDonutData()
   generateRandomBarData()
   generateRandomDonutData2()

   // Start random alerts after 3 seconds 
   // setTimeout(() => {
   //    startRandomAlerts()
   //    alertify.message('ℹ System initialized successfully')
   // }, 3000)
})

onBeforeUnmount(() => {
   stopRandomAlerts() // Stop alerts when component unmounts 
   chartInstances.value.forEach(chart => chart && chart.destroy())
   if (instAuditLogtable.value) {
      instAuditLogtable.value.destroy()
   }
   // Map cleanup removed from here (handled in child)
   if (dbInterval) { clearInterval(dbInterval) }
   if (donutInterval) { clearInterval(donutInterval) }
   if (barInterval) { clearInterval(barInterval) }
   if (donutInterval2) { clearInterval(donutInterval2) }
})

watch(currentPage, (newPage) => {
   setTimeout(() => {
      initTables()
      // Map update removed from here (handled in child)
   }, 100)
})

watch([workOrders, crews], () => {
   updateDashboard()
}, { deep: true }) 
</script>

<style>
@import 'tabulator-tables/dist/css/tabulator.min.css';
@import 'leaflet/dist/leaflet.css';

.cursor-pointer {
   cursor: pointer;
}

.menu-container:hover {
   overflow-y: auto;
}

.btn-size-dialog {
   font-size: 13px !important;
   font-weight: 400;
   margin-right: 0px;
   padding: 2px 14px !important;
   background-color: #1976d2;
   text-transform: capitalize !important;
}

.btn-size-dialog-small {
   font-size: 12px !important;
   font-weight: 400;
   margin-right: 0px;
   background-color: #1976d2;
   padding: 2px 12px !important;
   text-transform: capitalize !important;
}

.btn-size-dropdown {
   font-size: 12px !important;
   font-weight: 400;
   margin-left: 10px !important;
   margin-right: 0px;
   padding: 2px 2px 2px 8px !important;
   text-transform: capitalize !important;
}

.btn-size-dropdown-small {
   font-size: 10px !important;
   font-weight: 400;
   margin-left: 3px !important;
   margin-right: 0px;
   padding: 2px 2px 2px 8px !important;
   text-transform: capitalize !important;
}

.my-drop-btn-share {
   font-size: 12px !important;
   background-color: #3d71d9 !important;
   font-weight: 300;
   margin-left: 5px !important;
   margin-right: -5px;
   padding: 2px 2px 2px 8px !important;
   text-transform: capitalize;
   border: none !important;
   border-color: transparent !important;
   color: #fff;

}

.my-drop-btn-share-small {
   font-size: 10px !important;
   background-color: #3d71d9 !important;
   font-weight: 300;
   margin-left: 3px !important;
   margin-right: -8px;
   padding: 2px 2px 2px 8px !important;
   text-transform: capitalize;
   border: none !important;
   border-color: transparent !important;
   color: #fff;

}

.stat-card {
   text-align: center;
}

.map-section {
   padding: 0 !important;
}

/* Leaflet Dark Mode */
.body--dark .leaflet-tile {
   filter: brightness(0.6) invert(1) contrast(3) hue-rotate(200deg) saturate(0.3) brightness(0.7);
}

.body--dark .leaflet-container {
   background: #333;
}

.body--dark .leaflet-popup-content-wrapper,
.body--dark .leaflet-popup-tip {
   background-color: #2a2a2a;
   color: #E0E0E0;
   border: 1px solid #444;
}

/* Custom Work Icon Markers for Work Orders */
.marker-work-icon {
   width: 30px;
   height: 30px;
   border-radius: 50% 50% 50% 0;
   transform: rotate(-45deg);
   border: 2px solid #ffffff54;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
}

.marker-work-icon .material-icons {
   transform: rotate(45deg);
   color: #E0E0E0;
   font-size: 15px;
}

/* Custom Person Icon Markers for Crews */
.marker-person-icon {
   width: 30px;
   height: 30px;
   border-radius: 50% 50% 50% 0;
   transform: rotate(-45deg);
   border: 2px solid #ffffff54;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
}

.marker-person-icon .material-icons {
   transform: rotate(45deg);
   color: #E0E0E0;
   font-size: 15px;
}

.custom-marker-icon {
   background: transparent !important;
   border: none !important;
}

/* Map Popup Styling */
.map-popup {
   font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
   width: 150px;
}

.map-popup h4 {
   margin: 0% !important;
   font-size: 14px !important;
   font-weight: 500 !important;
   color: #E0E0E0 !important;
}

.map-popup p {
   margin: 0;
   font-size: 12px;
   line-height: 1.4;
   color: #E0E0E0 !important;
}

.map-popup-desc {
   color: #666;
   font-style: italic;
   margin-top: 8px;
   padding-top: 8px;
   border-top: 1px solid #e0e0e0;
}

/* Action Icons */
.action-buttons {
   display: flex;
   gap: 8px;
   justify-content: center;
}

.action-icon {
   cursor: pointer;
   font-size: 18px;
   transition: transform 0.1s ease;
}

.action-icon:hover {
   transform: scale(1.2);
}

.action-icon[data-action="view"] {
   color: #4CB04F;
}

.action-icon[data-action="edit"] {
   color: skyblue;
}

.action-icon[data-action="delete"] {
   color: #C10015;
}

.action-icon[data-action="assign"] {
   color: #388e3c;
}

/* Form Fields Dark Mode */
.body--dark .q-field .q-field__label {
   color: #b0b0b0;
}

.body--dark .q-field .q-field__native {
   color: #f5f5f5;
}

.body--dark .q-field--outlined .q-field__control {
   border-color: #555;
}

.body--dark .q-field--outlined.q-field--focused .q-field__control {
   border-color: #1976d2;
}

.body--dark .q-menu {
   background-color: #333;
   border: 1px solid #555;
   color: #f5f5f5;
}

.body--dark .q-item--highlighted {
   background-color: #1976d2;
   color: #fff;
}

/* Buttons */
.q-btn {
   box-shadow: none !important;
   border: black !important;
   border-width: 5px;
}

.custom-create-btn {
   background-color: #424242;
   color: white;
   cursor: pointer;
}

#crews-table .tabulator {
   overflow-x: hidden !important;
}

#crews-table .tabulator-tableHolder {
   overflow-x: hidden !important;
}

.crew-graph-container {
   width: 100%;
   height: 237px;
   min-height: 120px;
   border: 1px solid #e0e0e0;
   border-radius: 4px;
   padding-bottom: 4px;
   background: white;
}

.leaflet-control-zoom-in {
   display: none !important;
}

.leaflet-control-zoom-out {
   display: none !important;
}

.leaflet-popup-content {
   margin: 0%;
   border-radius: 0%;
   padding: 3px;
   width: 200px !important;
}

.leaflet-popup-content-wrapper {
   margin: 0%;
   border-radius: 0%;
}

/* Map Filter Toggle */
.map-filter-toggle {
   position: absolute;
   top: 0px;
   right: 0px;
   z-index: 1000;
   border-radius: 4px;
   background: white;
}

.body--dark .map-filter-toggle {
   background: #2a2a2a;
   border: 1px solid #444;
}

.map-filter-toggle .q-btn {
   color: #333;
}

.body--dark .map-filter-toggle .q-btn {
   color: #eee;
}

.map-filter-toggle .q-btn.q-btn-item--active {
   color: white;
}

/* Form Fields Dark Mode */
.body--dark .task-dialog-card .q-field .q-field__label {
   color: #b0b0b0;
}

.body--dark .task-dialog-card .q-field .q-field__native {
   color: #f5f5f5;
}

.body--dark .task-dialog-card .q-field--outlined .q-field__control {
   border-color: #555;
}

.body--dark .task-dialog-card .q-field--outlined.q-field--focused .q-field__control {
   border-color: #bdd9f5;
}

.body--dark .q-menu {
   background-color: #1d1d1d;
   border: none;
   color: #f5f5f5;
}

.body--dark .q-item--highlighted {
   background-color: #bdd9f5;
   color: #fff;
}

/* Collapsible Legend Styles */
.info.legend {
   padding: 0;
   font: 12px/1.5 "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
   background: white;
   background: rgba(255, 255, 255, 0.95);
   box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
   border-radius: 5px;
   color: #555;
   min-width: 180px;
   margin: 0%;
}

.legend-header {
   display: flex;
   justify-content: space-between;
   height: 35px;
   align-items: center;
   padding-left: 8px;
   cursor: pointer;
   border-bottom: 1px solid #e0e0e0;
   user-select: none;
   transition: background-color 0.2s;
}

.legend-header:hover {
   background-color: rgba(0, 0, 0, 0.05);
}

.legend-header h4 {
   margin: 0;
   color: #333;
   font-size: 14px;
   font-weight: 400;
   text-align: center;
}

.legend-arrow {
   font-size: 20px;
   color: #666;
   transition: transform 0.3s ease;
}

.legend-content {
   padding: 10px;
   line-height: 24px;
   display: block;
   transition: all 0.3s ease;
}

.legend-content strong {
   display: block;
   color: #333;
   font-size: 11px;
   font-weight: 400;
   text-transform: uppercase;
   letter-spacing: 0.5px;
   margin-top: -12px;
}

.legend-content i {
   width: 18px;
   height: 18px;
   float: left;
   margin-right: 8px;
   opacity: 0.9;
   margin-top: 1px;
}

/* Legend Shapes for Icons */
.legend-shape-work,
.legend-shape-person {
   width: 20px !important;
   height: 20px !important;
   border-radius: 50% 50% 50% 0;
   transform: rotate(-45deg);
   display: inline-flex !important;
   align-items: center;
   justify-content: center;
   float: left;
   margin-right: 8px;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.legend-shape-work .material-icons,
.legend-shape-person .material-icons {
   transform: rotate(45deg);
}

/* Dark Mode Legend */
.body--dark .info.legend {
   background: rgba(42, 42, 42, 0.95);
   color: #E0E0E0;
}

.body--dark .legend-header {
   border-bottom-color: #555;
}

.body--dark .legend-header:hover {
   background-color: rgba(255, 255, 255, 0.05);
}

.body--dark .legend-header h4 {
   color: #E0E0E0;
}

.body--dark .legend-arrow {
   color: #B0B0B0;
}

.body--dark .legend-content strong {
   color: #E0E0E0;
}

.body--dark .legend-shape-work,
.body--dark .legend-shape-person {
   border: 1px solid #E0E0E0;
}

.q-menu .q-position-engine scroll .q-menu--dark .q-dark {
   border-color: transparent;
}

/* ========== ALERTIFY DARK MODE CUSTOMIZATION ========== */
.alertify-notifier.ajs-right {
   right: -25px;
   margin-right: 0px !important;
}

.alertify-notifier.ajs-bottom {
   bottom: 32px;
}


/* Dark Mode Dialog */
.body--dark .alertify .ajs-dialog {
   background: #2a2a2a;
   color: #e0e0e0;
   border: 1px solid #444;
   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
}

.body--dark .alertify .ajs-header {
   background: #1f1f1f;
   color: #e0e0e0;
   border-bottom: 1px solid #444;
}

.body--dark .alertify .ajs-footer {
   background: #1f1f1f;
   border-top: 1px solid #444;
}

/* Dark Mode Notifications */
.body--dark .alertify-notifier .ajs-message {
   background: rgba(42, 42, 42, 0.96);
   color: #e0e0e0;
   border: 1px solid #555;
   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
   backdrop-filter: blur(8px);
}

.body--dark .alertify-notifier .ajs-success {
   background: rgba(76, 175, 80, 0.93);
   color: white;
   border: 1px solid #4caf50;
}

.body--dark .alertify-notifier .ajs-error {
   background: rgba(211, 47, 47, 0.93);
   color: white;
   border: 1px solid #d32f2f;
}

.body--dark .alertify-notifier .ajs-warning {
   background: #e38800 !important;
   color: white !important;
   border: 1px solid #e38800 !important;
}

.body--dark .alertify-notifier .ajs-message.ajs-visible {
   animation: slideInRight 0.3s ease-out;
}

/* Light Mode Notifications */
.alertify-notifier .ajs-message {
   background: rgba(255, 255, 255, 0.96);
   border: 1px solid #ddd;
   box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
   font-size: 13px;
   padding: 12px 16px;
   border-radius: 4px;
   backdrop-filter: blur(8px);
}

.alertify-notifier .ajs-success {
   background: rgba(76, 175, 80, 0.95);
   border: 1px solid #4caf50;
   color: white;
}

.alertify-notifier .ajs-error {
   background: rgba(211, 47, 47, 0.95);
   border: 1px solid #d32f2f;
   color: white;
}

.alertify-notifier .ajs-warning {
   background: #e38800 !important;
   border: 1px solid #e38800 !important;
   color: white !important;
}

.alertify-notifier .ajs-message {
   font-family: "Roboto", "-apple-system", "Helvetica Neue", sans-serif;
   font-weight: 400;
   line-height: 1;
}

/* Animation for slide-in effect */
@keyframes slideInRight {
   from {
      transform: translateX(100%);
      opacity: 0;
   }

   to {
      transform: translateX(0);
      opacity: 1;
   }
}

/* Close button styling */
.body--dark .alertify-notifier .ajs-message .ajs-close {
   color: rgba(255, 255, 255, 0.8);
}

.alertify-notifier .ajs-message .ajs-close:hover {
   opacity: 1;
}

/* Improve text readability */
.alertify-notifier .ajs-message {
   text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.body--dark .alertify-notifier .ajs-message {
   text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>