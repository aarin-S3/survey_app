<template>
   <!-- <q-dialog v-model="internalModel" @before-show="resetPosition" transition-show="scale"
    transition-hide="minimize-to-footer" seamless> -->
   <q-card :class="[$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562']"
      :style="[{ height: $q.screen.lt.md ? 'calc(100vh - 160px)' : 'calc(100vh - 100px)', width: '100%', display: 'flex', flexDirection: 'column', border: 'none', boxShadow: 'none !important' }]">


      <q-tab-panel name="notification_details" class="q-pa-none"
         style=" width: 65%;  margin: 0px auto; padding-bottom: 2rem !important;">
         <q-bar class="my-dialog text-white q-pa-none"
            :style="$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562'" style="margin: auto;">

            <div :class="$q.dark.isActive ? 'dialog-form-header-dark' : 'dialog-form-header-light'">{{ props.name }}
            </div>

            <q-space />
         </q-bar>

         <div class="text-subtitle2 q-mb-sm" style="margin-top: 2rem !important"
            :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">
         </div>
         <q-separator spaced style="margin: 1.5rem 0;" />

         <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
               <!-- Survey Engineer Name -->
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Survey Engineer Name</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.surveyEngineerName" :class="inputClass" />
                  </div>
               </div>

            </div>
            <div class="col-12 col-sm-6">
               <!-- Survey Engineer Phone -->
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Survey Engineer Contact No.</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.surveyEngineerPhone" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">
               <!-- GPS -->
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Location GPS</div>
                  <div class="row">
                     <div class="col-5 q-mr-xs">
                        <q-input dense outlined v-model="form.latitude" placeholder="Lat" :class="inputClass" />
                     </div>
                     <div class="col-5">
                        <q-input dense outlined v-model="form.longitude" placeholder="Lng" :class="inputClass" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <!-- Google Map -->
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Google Map Location Link</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.googleMapLocation" :class="inputClass" />
                  </div>
               </div>
            </div>
         </div>
         <q-separator spaced style="margin: 1.5rem 0;" />
         <!-- Heading -->
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Substation Details
         </div>
         <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
               <!-- Substation Name -->
               <div class="items-center q-mb-md">
                  <div class="col-3 text-caption" :class="labelClass">Substation Name</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.substationName" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <!-- Relay Placement -->
               <div class="items-start q-mb-xs">
                  <div class="text-caption" :class="labelClass">
                     Placement of Control relay Panels
                  </div>
                  <div :class="inputClass">
                     <q-select dense outlined emit-value map-options v-model="form.relayPlacement"
                        :options="relayPlacements" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <!-- Voltage Level -->
               <div class="items-start q-mb-xs">
                  <div class="text-caption" :class="labelClass">
                     Voltage Levels
                  </div>
                  <div :class="inputClass">
                     <q-select dense outlined emit-value map-options v-model="form.voltageLevel"
                        :options="voltageLevels" :class="inputClass" />
                  </div>
               </div>

            </div>

            <!-- ========================= -->
            <!-- 66 kV BAYS -->
            <!-- ========================= -->
            <div v-if="form.voltageLevel === '66'" class="row q-col-gutter-md q-mb-md q-mb-md">

               <div v-for="(field, idx) in [
                  ['bus', 'Total No. of Bus in 66kV'],
                  ['incomerLine', 'Total No. of 66kV Incomer Line'],
                  ['transformer_66_33', 'Total No. of 66/33kV Transformer'],
                  ['transformer_66_11', 'Total No. of 66/11kV Transformer'],
                  ['outgoing', 'Total No. of 66kV Outgoing'],
                  ['busCoupler', 'Total No. of 66kV Bus Coupler'],
                  ['interconnector', 'Total No. of 66kV Interconnector'],
                  ['capacitorBank', 'Total No. of 66kV Capacitor Bank']
               ]" :key="idx" class="col-12 col-sm-6">
                  <div class="items-start q-mb-xs">
                     <div class="text-caption" :class="labelClass">
                        {{ field[1] }}
                     </div>

                     <div :class="inputClass">
                        <q-select dense outlined v-model="form.bays['66'][field[0]]" :options="dropdown20" />
                     </div>
                  </div>
               </div>

            </div>



            <!-- ========================= -->
            <!-- 33 kV BAYS -->
            <!-- ========================= -->
            <div v-if="form.voltageLevel === '33'" class="row q-col-gutter-md q-mb-md q-mb-md">

               <div class="col-12 col-sm-6" v-for="(field, key) in [
                  ['bus', 'Total No. of Bus in 33kV'],
                  ['incomerLine', 'Total No. of 33kV Incomer Line'],
                  ['incomerTransformer', 'Total No. of 33kV Incomer Transformer'],
                  ['transformer_33_11', 'Total No. of 33/11kV Transformer'],
                  ['outgoing', 'Total No. of 33kV Outgoing'],
                  ['busCoupler', 'Total No. of 33kV Bus Coupler'],
                  ['interconnector', 'Total No. of 33kV Interconnector'],
                  ['capacitorBank', 'Total No. of 33kV Capacitor Bank'],
                  ['busSection', 'Total No. of 33kV Bus Section']
               ]" :key="key">
                  <div class="items-start q-mb-xs">
                     <div class="text-caption" :class="labelClass">
                        {{ field[1] }}
                     </div>
                     <div :class="inputClass">
                        <q-select dense outlined v-model="form.bays['33'][field[0]]" :options="dropdown20" />
                     </div>
                  </div>
               </div>

            </div>


            <!-- ========================= -->
            <!-- 11 kV BAYS -->
            <!-- ========================= -->
            <div v-if="form.voltageLevel === '11'" class="row q-col-gutter-md q-mb-md q-mb-md">

               <div class="col-12 col-sm-6" v-for="(field, key) in [
                  ['bus', 'Total No. of Bus in 11kV'],
                  ['incomer', 'Total No. of 11kV Incomer'],
                  ['transformer_11_415', 'Total No. of 11/0.415kV Transformer'],
                  ['outgoing', 'Total No. of 11kV Outgoing'],
                  ['busCoupler', 'Total No. of 11kV Bus Coupler'],
                  ['interconnector', 'Total No. of 11kV Interconnector'],
                  ['capacitorBank', 'Total No. of 11kV Capacitor Bank'],
                  ['busSection', 'Total No. of 11kV Bus Section']
               ]" :key="key">
                  <div class="items-start q-mb-xs">
                     <div class="text-caption" :class="labelClass">
                        {{ field[1] }}
                     </div>
                     <div :class="inputClass">
                        <q-select dense outlined v-model="form.bays['11'][field[0]]" :options="dropdown30" />
                     </div>
                  </div>
               </div>

            </div>

         </div>
         <q-separator spaced style="margin: 1.5rem 0;" />
         <!-- Heading -->
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Location & Permission Details
         </div>
         <div class="row q-col-gutter-md q-mb-md">

            <!-- Location & Permission Details -->
            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Nearest Metro Station</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.nearestMetro" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Distance (Km) from SS</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.distanceFromSS" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Nearest Landmark</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.nearestLandmark" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">
               <div class="items-start q-mb-md">
                  <div class="col-3 text-caption" :class="labelClass">
                     Permission required for SS entry
                  </div>
                  <div class="col-9">
                     <q-input autogrow outlined type="textarea" v-model="form.permissionDetails" :class="inputClass" />
                  </div>
               </div>
            </div>
         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />
         <!-- Heading -->
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Contact Details
         </div>
         <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Substation In-charge Name</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.inchargeName" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">In-charge Contact</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.inchargeContact" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Substation Telephone No. (Landline)</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.landline" :class="inputClass" />
                  </div>
               </div>

            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Shift Operator Contacts</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.shiftOperatorContacts" :class="inputClass" />
                  </div>
               </div>

            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Substation Address with Pin code</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.addressWithPincode" :class="inputClass" />
                  </div>
               </div>

            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Circle Name</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.circleName" :class="inputClass" />
                  </div>
               </div>

            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-md">
                  <div class="col-3 text-caption" :class="labelClass">Division Name</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.divisionName" :class="inputClass" />
                  </div>
               </div>
            </div>
         </div>

         <q-separator spaced style="margin: 1.5rem 0;" />
         <!-- Heading -->
         <div class="text-subtitle1 q-mb-sm" :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">
            Control Room Details
         </div>
         <div class="row q-col-gutter-md q-mb-md">
            <div class="items-center q-mb-xs">
               <div class="text-subtitle2 q-mb-sm" :class="subtitleClass">
                  Dimensions of Existing Control Room
               </div>

               <div class="text-caption q-mb-sm" :class="labelClass">
                  Prepare a sketch of panel placements and identify proposed RTU location on it
                  after consultation with local S/S In-charge.
               </div>
               <div class="col-12 col-sm-6">
                  <!-- RTU Panel Size -->
                  <div class="items-center q-mb-xs">
                     <div class="col-3 text-caption" :class="labelClass">
                        RTU Panel Size
                     </div>
                     <div class="col-9">
                        <q-input dense outlined placeholder="H × W × D (in mm)" v-model="form.rtuPanelSize"
                           :class="inputClass" />
                     </div>
                  </div>
               </div>
               <div class="col-12 col-sm-6">

                  <!-- Upload Photo -->
                  <div class="items-start q-mb-xs">
                     <div class="col-3 text-caption" :class="labelClass">
                        Panel Layout Photo
                     </div>
                     <div class="col-9">
                        <q-file outlined accept="image/*" v-model="form.controlRoomPhoto" label="Upload sketch / photo"
                           :class="inputClass" clearable>
                           <template v-slot:prepend>
                              <q-icon name="image"></q-icon>
                           </template>
                        </q-file>
                     </div>
                  </div>
               </div>
               <div class="col-12 col-sm-6">

                  <!-- Notes -->
                  <div class="items-start q-mb-md">
                     <div class="col-3 text-caption" :class="labelClass">
                        Notes / Description
                     </div>
                     <div class="col-9">
                        <q-input outlined stack-label type="textarea" autogrow
                           placeholder="Describe panel placement & RTU location" v-model="form.controlRoomNotes"
                           :class="inputClass" />
                     </div>
                  </div>
               </div>
               <div class="col-12 col-sm-6">
                  <div class="col-3 text-caption" :class="labelClass">Room Temperature</div>
                  <div class="col-9">
                     <q-input dense outlined v-model="form.roomTemperature" :class="inputClass" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">AC Available</div>
                  <div class="col-9">
                     <q-option-group inline type="radio" :options="yesNoOptions" v-model="form.acAvailable" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div v-show="form.acAvailable">
                  <div class="items-center q-mb-xs">
                     <div class="col-3 text-caption" :class="labelClass">AC Working</div>
                     <div class="col-9">
                        <q-option-group inline type="radio" :options="yesNoOptions" v-model="form.acWorking" />
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Existing RTU</div>
                  <div class="col-9">
                     <q-option-group inline type="radio" :options="yesNoOptions" v-model="form.existingRTU" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div v-if="form.existingRTU">
                  <div class="items-center q-mb-xs">
                     <div class="col-3 text-caption" :class="labelClass">RTU Size</div>
                     <div class="col-9">
                        <q-input dense outlined v-model="form.existingRTUSize" :class="inputClass" />
                     </div>
                  </div>
               </div>
            </div>
         </div>




         <q-separator spaced style="margin: 1.5rem 0;" />
         <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Cable Trench Available</div>
                  <div class="col-9">
                     <q-option-group inline type="radio" :options="yesNoOptions" v-model="form.cableTrenchAvailable" />
                  </div>
               </div>
            </div>
            </div>
               <div v-if="form.cableTrenchAvailable" class="row q-col-gutter-md q-mb-md">
                  <div v-for="n in 4" :key="n" class="col-12 col-sm-6">
                     <div class="items-center q-mb-xs">
                        <div class="text-caption" :class="labelClass">Cable Trench {{ n }} Size (H×W×D)</div>
                        <q-input dense outlined v-model="form.cableTrenches[n - 1].size" :class="inputClass" />
   
                        <div class="text-caption" :class="labelClass">Trench {{ n }} Marked on Layout</div>
                        <q-option-group inline type="radio" :options="yesNoOptions"
                           v-model="form.cableTrenches[n - 1].marked" />
                     </div>
                  </div>
               </div>

            <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">

               <div class="items-center q-mb-xs">
                  <div class="col-3 text-caption" :class="labelClass">Trench Extension Required</div>
                  <div class="col-9">
                     <q-option-group inline type="radio" :options="yesNoOptions"
                        v-model="form.trenchExtensionRequired" />
                  </div>
               </div>
            </div>
            <div class="col-12 col-sm-6">

               <div v-if="form.trenchExtensionRequired">
                  <div class="col-3 text-caption" :class="labelClass">Cable trench extention details</div>
                  <q-input dense outlined type="textarea" v-model="form.trenchExtensionDetails" :class="inputClass" />
               </div>

            </div>


         </div>


      </q-tab-panel>


      <!-- <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" class="q-my-xs" />

      <q-card-actions class="row justify-between items-center" style=" padding: 2px;">
         <div class="text-red-4 q-ml-md text-caption">
            <q-icon name="error" /> Representative name required
         </div>
         <div>
            <q-btn label="Cancel" :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'"
               style="padding: 2.5px 4px !important; font-size:10.5px !important; border-radius: 0px; border-width: 2px !important;"
               outline v-close-popup />
            <button class="custom-create-btn"
               style="padding: 4px 5px !important; font-size: 11px !important;  margin-left: 5px; margin-top: -1px !important;"
               type="submit">
               Save
            </button>
         </div>
      </q-card-actions> -->

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

const internalModel = computed({
   get: () => props.modelValue,
   set: (val) => emit('update:modelValue', val)
})

const tab = ref('notification_details')
const dialogId = 'work-order-dia'

// Minimize Logic
const onMinimize = () => {
   store.minimize(dialogId, 'Work Order Dialog', () => {
      internalModel.value = true
   })
   internalModel.value = false
}

// Draggable Logic
const dialogPos = ref({ x: 0, y: 0 })
const dialogStyle = computed(() => {
   return {
      transform: `translate(${dialogPos.value.x}px, ${dialogPos.value.y}px)`
   }
})
const onPan = (evt) => {
   dialogPos.value = {
      x: dialogPos.value.x + evt.delta.x,
      y: dialogPos.value.y + evt.delta.y
   }
}
const resetPosition = () => {
   dialogPos.value = { x: 0, y: 0 }
}


// Form Data
const relayPlacements = ['Basement Floor', 'Ground Floor', 'First Floor']
const voltageLevels = [
   { label: '66 kV', value: '66' },
   { label: '33 kV', value: '33' },
   { label: '11 kV', value: '11' },
]
const baySchema = {
   '66': {
      bus: 0,
      incomerLine: 0,
      transformer_66_33: 0,
      transformer_66_11: 0,
      outgoing: 0,
      busCoupler: 0,
      interconnector: 0,
      capacitorBank: 0
   },
   '33': {
      bus: 0,
      incomerLine: 0,
      incomerTransformer: 0,
      transformer_33_11: 0,
      outgoing: 0,
      busCoupler: 0,
      interconnector: 0,
      capacitorBank: 0,
      busSection: 0
   },
   '11': {
      bus: 0,
      incomer: 0,
      transformer_11_415: 0,
      outgoing: 0,
      busCoupler: 0,
      interconnector: 0,
      capacitorBank: 0,
      busSection: 0
   }
}

const dropdown20 = Array.from({ length: 20 }, (_, i) => i + 1)
const dropdown30 = Array.from({ length: 30 }, (_, i) => i + 1)

const yesNoOptions = [
   { label: 'Yes', value: true },
   { label: 'No', value: false }
]

const labelClass = computed(() =>
   $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'
)

const inputClass = computed(() =>
   $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'
)

const subtitleClass = computed(() =>
   $q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'
)

const form = reactive({
   // Survey
   surveyEngineerName: '',
   surveyEngineerPhone: '',
   latitude: '',
   longitude: '',
   googleMapLocation: '',

   // Substation
   substationName: '',
   relayPlacement: 'Ground Floor',
   voltageLevel: '66',

   // Bays
   bays: JSON.parse(JSON.stringify(baySchema)),

   // Location & Permission
   nearestMetro: '',
   distanceFromSS: '',
   nearestLandmark: '',
   permissionDetails: '',

   // Contact
   inchargeName: '',
   inchargeContact: '',
   landline: '',
   shiftOperatorContacts: '',
   addressWithPincode: '',
   circleName: '',
   divisionName: '',

   // Control Room
   rtuPanelSize: '',
   controlRoomPhoto: null,   // File object
   controlRoomNotes: '',
   roomTemperature: '',
   acAvailable: false,
   acWorking: false,
   existingRTU: false,
   existingRTUSize: '',

   // Cable trench
   cableTrenchAvailable: false,
   trenchExtensionRequired: false,
   trenchExtensionDetails: '',
   cableTrenches: [
      { size: '', marked: false },
      { size: '', marked: false },
      { size: '', marked: false },
      { size: '', marked: false }
   ],

   // Misc
   creationDate: '',
   overrideMailing: false
})
</script>

<style scoped>
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