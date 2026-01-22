<template>
   <div class="feeder-survey-container q-pa-sm">
      <!-- Header Section:-->
      <div class="header-section">
         <div class="text-h6 text-white">{{ name }}</div>
         <div class="row q-col-gutter-md q-col-gutter-y-md">
            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">SUBSTATION NAME</label>
                  <input v-model="surveyData.substationName" type="text" class="survey-input" />
               </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">Substation In charge Name</label>
                  <input v-model="surveyData.substationChargeName" type="text" class="survey-input" />
               </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">No of Bays</label>

                  <select v-model="surveyData.noOfBays" class="survey-input">
                     <option value="" disabled selected>Select an option</option>
                     <option v-if="noOfBayOptions.length > 0" v-for="(option, index) in noOfBayOptions" :key="index"
                        :value="option.value">
                        {{ option.label }}
                     </option>
                  </select>

               </div>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">Date of Survey</label>
                  <input v-model="surveyData.dateOfSurvey" type="date" class="survey-input" />
               </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">Participants</label>
                  <input v-model="surveyData.participants" type="text" class="survey-input" />
               </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
               <div class="meta-field">
                  <label class="survey-label">Voltage Level</label>

                  <select v-model="surveyData.voltageLevel" class="survey-input">
                     <option value="" disabled selected>Select an option</option>
                     <option v-if="voltageLevelOptions.length > 0" v-for="(option, index) in voltageLevelOptions"
                        :key="index" :value="option.value">
                        {{ option.label }}
                     </option>
                  </select>
               </div>
            </div>
         </div>

         <div v-if="feeders.length < 60" class="flex justify-start">
            <q-btn flat dense bordered label="ADD" icon="add" class="survey-add-btn" @click="openAddDialog"
               :class="$q.screen.lt.sm ? 'btn-size-dialog-small' : 'btn-size-dialog'">
            </q-btn>
         </div>
      </div>

      <!-- Feeder List Content -->
      <div class="content-section q-mt-md">
         <!-- Feeder Cards (Bars) -->
         <div class="feeder-list-container">
            <div v-for="feeder in feeders" :key="feeder.id"
               class="feeder-bar row items-center justify-between q-pa-md q-mb-sm clickable"
               @click="editFeeder(feeder)">
               <div class="text-h6 text-grey-9">CB - {{ feeder.bayName || feeder.id }}</div>
               <q-icon name="play_arrow" size="sm" color="grey-7" />
            </div>
         </div>

         <!-- Add Feeder Button: Cyan Rounded -->
         <!-- <div v-if="feeders.length < 60" class="flex justify-center q-mt-md">
        <q-btn label="Add CRP Relay" unelevated class="survey-add-btn" @click="openAddDialog" />
      </div> -->
      </div>

      <!-- Shared Add/Edit Feeder Dialog (Tablet Modal / Mobile ) -->
      <q-dialog v-model="feederDialogOpen" :maximized="$q.screen.lt.md" transition-show="slide-up"
         transition-hide="slide-down" persistent>
         <q-card class="survey-dialog-card" :style="$q.screen.gt.sm ? 'width: 70vw; max-width: 900px;' : ''">
            <q-toolbar class="bg-indigo-10 text-white">
               <q-toolbar-title class="text-subtitle1">{{ editingIndex === -1 ? 'Add New' : 'Edit' }} CRP Relay
                  Details</q-toolbar-title>
               <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>

            <q-card-section class="scroll" style="max-height: 70vh; margin-bottom: 2rem;">
               <div class="row q-col-gutter-md">

                  <div class="col-12 col-sm-6">
                     <div class="items-center q-mb-xs">
                        <div class="text-subtitle2 q-mb-sm"
                           :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                           Bay Name
                        </div>
                        <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                           <q-select dense outlined v-model="form.bayName" :options="bayNameOptions" behavior="menu"
                              emit-value map-options
                              :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                        </div>
                     </div>
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="items-center q-mb-xs">
                        <div class="text-subtitle2 q-mb-sm"
                           :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                           Nominal Voltage
                        </div>
                        <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                           <q-select dense outlined v-model="form.nominalVoltage" :options="nominalVoltageOptions"
                              behavior="menu" emit-value map-options
                              :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                        </div>
                     </div>
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="items-center q-mb-xs">
                        <div class="text-subtitle2 q-mb-sm"
                           :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                           VCB Details
                        </div>
                        <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                           <q-select dense outlined v-model="form.vcbDetails" :options="vcbDetailsOptions"
                              behavior="menu" emit-value map-options
                              :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                        </div>
                     </div>
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Make of Breaker
                     </div>
                     <q-input dense outlined v-model="form.makeOfBreaker" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Model of Breaker
                     </div>
                     <q-input dense outlined v-model="form.modelOfBreaker" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>



                  <div class="col-12 col-sm-6">
                     <div class="items-center q-mb-xs">
                        <div class="text-subtitle2 q-mb-sm"
                           :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                           Type of Relay
                        </div>
                        <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                           <q-select dense outlined v-model="form.typeOfRelay" :options="typeOfRelayOptions"
                              behavior="menu" emit-value map-options
                              :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                        </div>
                     </div>
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Electro-Mechanical
                     </div>
                     <q-input dense outlined v-model="form.electroMechanical" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Numeric
                     </div>
                     <q-input dense outlined v-model="form.numeric" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Operating Voltage-Ac/Dc
                     </div>
                     <q-input dense outlined v-model="form.operatingVoltageAcDc" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Make
                     </div>
                     <q-input dense outlined v-model="form.make" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Model No
                     </div>
                     <q-input dense outlined v-model="form.modelNo" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        Ethernet Port
                     </div>
                     <q-option-group v-model="form.ethernetPort" :options="yesNoOptions" color="secondary" inline dense
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                  <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                        DI/DO Wiring
                     </div>
                     <q-option-group v-model="form.diDoWiring" :options="availNAOptions"
                        color="secondary" inline dense
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

                   <div class="col-12 col-sm-6">
                     <div class="text-subtitle2 q-mb-sm"
                        :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
                       Wiring Signal Details of Relay
                     </div>
                     <q-input dense outlined v-model="form.wiringSignalDetailsOfRelay" placeholder="Enter"
                        :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>

               </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="center" class="q-pa-md figma-dialog-actions">
               <q-btn label="Done" unelevated class="figma-done-btn" @click="saveFeeder" />
               <q-btn v-if="editingIndex !== -1" label="Delete" flat color="negative" class="q-ml-sm"
                  @click="confirmDeleteFromForm" />
            </q-card-actions>
         </q-card>
      </q-dialog>

      <!-- Delete Confirmation -->
      <q-dialog v-model="deleteConfirmOpen">
         <q-card>
            <q-card-section class="row items-center">
               <q-avatar icon="warning" color="negative" text-color="white" />
               <span class="q-ml-sm">Are you sure you want to delete this CRP?</span>
            </q-card-section>
            <q-card-actions align="right">
               <q-btn flat label="Cancel" color="primary" v-close-popup />
               <q-btn flat label="Delete" color="negative" @click="deleteFeeder" />
            </q-card-actions>
         </q-card>
      </q-dialog>
   </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
   name: String,
})

const feeders = ref([])

const feederDialogOpen = ref(false)
const deleteConfirmOpen = ref(false)
const editingIndex = ref(-1)
const selectedRow = ref(null)

const bayNameOptions = ref([
   { label: 'Line', value: 'line' },
   { label: 'Transformer', value: 'transformer' },
   { label: 'Bus Section', value: 'bus section' },
   { label: 'Bus Coupler', value: 'bus coupler' },
   { label: 'Capacitor', value: 'capacitor' },
   { label: 'BB', value: 'bb' },
])

const noOfBayOptions = ref(
   Array.from({ length: 41 }, (_, i) => ({ label: `${i}`, value: `${i}` }))
)

const voltageLevelOptions = ref([
   { label: '66kV', value: '66kV' },
   { label: '33kV', value: '33kV' },
   { label: '11kV', value: '11kV' },
])

const nominalVoltageOptions = ref([
   { label: '66kV', value: '66kV' },
   { label: '33kV', value: '33kV' },
   { label: '11kV', value: '11kV' },
])

const vcbDetailsOptions = ref([
   { label: 'VCB', value: 'VCB' },
   { label: 'OCB', value: 'OCB' },
   { label: 'SF6', value: 'SF6' },
   { label: 'CRP', value: 'CRP' },
])

const typeOfRelayOptions = ref([
   { label: 'Electro-Mechanical', value: 'electro-mechanical' },
   { label: 'Numeric', value: 'numeric' },
   { label: 'Operating voltage-AC/DC', value: 'operating voltage-ac/dc' },
])

const yesNoOptions = [
   { label: 'Yes', value: 'yes' },
   { label: 'No', value: 'no' }
]

const availNAOptions = [
   { label: 'Available', value: 'available' },
   { label: 'Not', value: 'not' }
]

const surveyData = reactive({

   substationName: '',
   substationChargeName: '',
   noOfBays: '',
   dateOfSurvey: '',
   participants: '',
   voltageLevel: '',

});

const defaultForm = {

   bayName: '',
   nominalVoltage: '',
   vcbDetails: '',
   makeOfBreaker: '',
   modelOfBreaker: '',
   typeOfRelay: '',
   electroMechanical: '',
   numeric: '',
   operatingVoltageAcDc: '',
   make: '',
   modelNo: '',
   ethernetPort: 'no',
   diDoWiring: 'not',
   wiringSignalDetailsOfRelay: '',

}

const form = reactive({ ...defaultForm })

const openAddDialog = () => {
   editingIndex.value = -1
   Object.assign(form, defaultForm)
   feederDialogOpen.value = true
}

const editFeeder = (row) => {
   editingIndex.value = feeders.value.findIndex(f => f.id === row.id)
   Object.assign(form, row)
   feederDialogOpen.value = true
}

const saveFeeder = () => {
   if (editingIndex.value === -1) {
      const newId = feeders.value.length ? Math.max(...feeders.value.map(f => f.id)) + 1 : 1
      feeders.value.push({
         ...form,
         id: newId,
         s_no: feeders.value.length + 1
      })
   } else {
      feeders.value[editingIndex.value] = { ...form }
   }
   feederDialogOpen.value = false
}

const confirmDeleteFromForm = () => {
   selectedRow.value = { id: feeders.value[editingIndex.value].id }
   deleteConfirmOpen.value = true
}

const deleteFeeder = () => {
   feeders.value = feeders.value.filter(f => f.id !== selectedRow.value.id)
   feeders.value.forEach((f, idx) => { f.s_no = idx + 1 })
   deleteConfirmOpen.value = false
   feederDialogOpen.value = false
}
</script>

<style scoped>
.feeder-survey-container {
   max-width: 100%;
   background-color: transparent;
}

.header-section {
   background: #46586b;
   /* Indigo dark background from image */
   /* display: flex;
  justify-content: space-between;
  align-items: center; */
   padding: 20px;
   /* border-bottom: 1px solid #ffffff40; */
}

/* Header Inputs */
.meta-field {
   display: flex;
   flex-direction: column;
   gap: 4px;
}

.survey-label {
   font-size: 10px;
   color: #c5cae9;
   letter-spacing: 0.5px;
   font-weight: 600;
}

.survey-input {
   /* background: #ffffff; */
   border: none;
   height: 28px;
   padding: 4px 8px;
   border-radius: 2px;
   font-size: 13px;
   color: #9c9c9c;
   /* Grey text as requested */
   width: 100%;
}

/* Feeder Bar Styling */
.feeder-bar {
   background: #e0e0e0;
   border-radius: 4px;
   transition: background 0.2s;
   margin-bottom: 10px !important;
   /* margin-top: 10px !important; */
}

.feeder-bar:hover {
   background: #d5d5d5;
}

.clickable {
   cursor: pointer;
}

/* Add Button Styling */
.survey-add-btn {
   background: #b2ebf2;
   /* Light cyan from image */
   color: #006064;
   font-weight: bold;
   margin-top: 2rem;

}

/* Dialog Refinements */
.survey-dialog-card {
   background: #ffffff;
   /* Grey background for modal content */
}

.field-label-dark {
   font-size: 11px;
   color: #ffffff;
   /* White text for labels in dark dialog */
   font-weight: 600;
   margin-bottom: 2px;
}

.field-input-dark {
   /* background: #0e0d0d; */
   /* White box */
   border: 1px solid #bdbdbd;
   border-radius: 4px;
   padding: 8px 12px;
   width: 100%;
   font-size: 14px;
   color: #8b8b8b;
   /* Grey text */
}

textarea.field-input-dark {
   resize: none;
}

.survey-done-btn {
   background: #80deea;
   color: #006064;
   padding: 8px 40px;
   border-radius: 20px;
   font-weight: bold;
}

.bg-indigo-10 {
   background: #3c4b64 !important;
}

/* Mobile specific overrides */
@media (max-width: 600px) {
   .header-section {
      padding: 15px;
   }
}

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
