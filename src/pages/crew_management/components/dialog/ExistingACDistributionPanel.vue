<template>
   <!-- <q-dialog v-model="internalModel" @before-show="resetPosition" transition-show="scale"
    transition-hide="minimize-to-footer" seamless> -->
   <q-card :class="[$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562']"
      :style="[{ height: $q.screen.lt.md ? 'calc(100vh - 160px)' : 'calc(100vh - 100px)', width: '100%', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: 'none !important' }]">

       
      <q-tab-panel name="notification_details" class="q-pa-none" :style="$q.screen.lt.sm ? 'width: 75%;' : 'width: 65%;'" style="margin: 0px auto; padding-bottom: 2rem !important;">
         <q-bar class="my-dialog text-white q-pa-none" 
            :style="$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562'" style="margin: auto;">

            <div :class="$q.dark.isActive ? 'dialog-form-header-dark' : 'dialog-form-header-light'">{{ props.name }}</div>

            <q-space />
         </q-bar>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Cable distance from Proposed RTU Location to ACDB
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Space available for mounting a new MCB in ACDB
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Cable Entrance Space in ACDB is available
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Space for Existing Gland or New Gland is available
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Space for Existing Gland or New Gland is available
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Existing Earth Bar is Available in Distribution Board (Yes /No)
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-option-group v-model="form.mplsAvailable" :options="yesNoOptions" color="secondary" inline dense
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Earth Bar Strip is available for extending to new equipment’s
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Check value between Neutral to Earth Voltage with Multi meter
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Check Value between Ph- N with Multi meter
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Check Value between Ph-Earth with Multi meter
         </div>
         <div class="row items-center q-mb-md">
            <div class="col-12">
               <q-input dense outlined v-model="form.civilWorkCompletion"
                  :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
            </div>
         </div>
         <q-separator spaced style="margin: 1.5rem 0;" />
         <!-- </div> -->

      </q-tab-panel>
   </q-card>
   <!-- </q-dialog> -->
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useWindowManager } from '../../../../stores/window_manager'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps(['modelValue', 'name'])
const emit = defineEmits(['update:modelValue'])
const store = useWindowManager()

/* ---------------- TABLE ---------------- */

const communicationRows = ref([])

const columns = [
   { name: 'S. No', label: 'S. No', field: 'sNo', align: 'left' },
   { name: 'loopNo', label: 'Loop No', field: 'loopNo', align: 'left' },
   { name: 'feeders', label: 'Feeder Name', field: 'feeders' },
   { name: 'distance', label: 'Distance', field: 'distance' },
   { name: 'tray', label: 'Cable Tray', field: 'trayAvailable' },
   { name: 'length', label: 'Looping Cable Length', field: 'loopingLength' }
]

/* ---------------- DIALOG ---------------- */

const dialogOpen = ref(false)

const form = reactive({
   loopNo: null,
   feeders: [],
   distance: '',
   trayAvailable: false,
   loopingLength: ''
})

const resetForm = () => {
   form.loopNo = null
   form.feeders = []
   form.distance = ''
   form.trayAvailable = false
   form.loopingLength = ''
}

let nSerialNumber = 0;

const openDialog = () => {
   resetForm()
   nSerialNumber++;
   dialogOpen.value = true
}

const saveRow = () => {
   communicationRows.value.push({
      id: Date.now(),
      sNo: nSerialNumber,
      loopNo: form.loopNo,
      feeders: [...form.feeders],
      distance: form.distance,
      trayAvailable: form.trayAvailable,
      loopingLength: form.loopingLength
   })

   dialogOpen.value = false
}

const cancelRow = () => {
   nSerialNumber--;
}

/* ---------------- OPTIONS ---------------- */

const loopOptions = Array.from({ length: 12 }, (_, i) => i + 1)

const feederOptions = [
   'Feeder-A',
   'Feeder-B',
   'Feeder-C',
   'Feeder-D',
   'Feeder-E',
   'Feeder-F'
]

const yesNoOptions = [
   { label: 'Yes', value: true },
   { label: 'No', value: false }
]

/* ---------------- STYLES ---------------- */

const subtitleClass = computed(() =>
   $q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'
)

</script>

<style scoped>
.communication-table {
   font-size: 12px;
}

.communication-table th {
   background: #a7cbe8;
   font-weight: 600;
}

/* .communication-table td {
  background: #fff;
} */


/* --- SCOPED STYLES (Colors, Buttons, Inputs) --- */
.bg-card-light {
   background: white;
   border: 1px solid #ccc;
}

.bg-card-dark {
   background: #1d1d1d;
   /* border: 2px solid #444; */
}

.dialog-header-light {
   color: #fff;
   font-weight: 500;
   font-size: 14px;
}

.dialog-header-dark {
   color: #e0e0e0;
   font-weight: 500;
   font-size: 14px;
}

.dialog-btn-light {
   color: #455a64;
}

.dialog-btn-dark {
   color: #bbb;
}

.dialog-btn-dark:hover {
   color: white;
   background: rgba(255, 255, 255, 0.1);
}

.dialog-subtitle-light {
   color: #385562;
}

.dialog-subtitle-dark {
   color: #81d4fa;
}

.dialog-field-label-light {
   color: #333;
}

.dialog-field-label-dark {
   color: #ccc;
}

:deep(.q-field__native) {
   padding-top: 5px;
}

:deep(.q-field--dense) .q-field__control {
   height: 1.6rem !important;
   background: transparent !important;
}

:deep(.q-field--auto-height).q-field--dense .q-field__control,
:deep(.q-field--auto-height.q-field--dense) .q-field__native {
   min-height: 1.6rem;
}

:deep(.q-field--dense .q-field__marginal) {
   height: 25px !important;
}

/* FIXED: Date Wrapper Styles for consistent icon placement on mobile */
.date-wrapper :deep(input) {
   display: block;
}

.date-wrapper.date-mode-light :deep(input) {
   color: #333 !important;
   color-scheme: light !important;
}

.date-wrapper.date-mode-light :deep(input::-webkit-calendar-picker-indicator) {
   filter: none !important;
   cursor: pointer;
   opacity: 0.8;
   /* Added to fix mobile view consistency */
   margin-left: auto;
   margin-right: 5px;
   display: block;
}

.date-wrapper.date-mode-dark :deep(input) {
   color: #f4f5f7 !important;
   color-scheme: dark !important;
}

.date-wrapper.date-mode-dark :deep(input::-webkit-calendar-picker-indicator) {
   filter: invert(1) !important;
   cursor: pointer;
   opacity: 0.8;
   /* Added to fix mobile view consistency */
   margin-left: auto;
   margin-right: 5px;
   display: block;
}

.date-wrapper :deep(input::-webkit-calendar-picker-indicator):hover {
   opacity: 1;
}

.custom-create-btn {
   background-color: transparent;
   color: #385562;
   border: 2px solid #385562;
   cursor: pointer;
   font-size: 14px;
   font-weight: 500;
   text-transform: uppercase;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   transition: background-color 0.3s ease;
}

.custom-create-btn:hover {
   background-color: #1d2c33;
   border: 2px solid #385562;
   color: grey;
   font-weight: 500;
}
</style>

<style>
/* Active State: Controls the duration and curve */
.minimize-to-footer-leave-active {
   /* Use a cubic-bezier for a smooth 'suck' effect */
   transition: all 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

/* Ending State: Where the dialog goes */
.minimize-to-footer-leave-to {
   opacity: 0;
   transform: translate(-35vw, 48vh) scale(0.1) !important;
}
</style>