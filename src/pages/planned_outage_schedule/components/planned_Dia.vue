<template>
  <q-dialog 
    v-model="internalModel" 
    @before-show="resetPosition" 
    transition-show="fade"
    transition-hide="minimize-to-footer" 
    seamless
  >
    <q-card 
      class="gpu-card"
      :class="$q.dark.isActive ? 'bg-card-dark' : 'bg-card-light'"
      :style="cardStyle">

      <q-bar class="my-dialog text-white cursor-pointer" v-touch-pan.mouse="onPan"
        :style="$q.dark.isActive ? 'background: #2f2f2f' : 'background: #385562'">

        <div :class="$q.dark.isActive ? 'dialog-header-dark' : 'dialog-header-light'">Planned Outage Request</div>

        <q-space />

        <q-btn dense flat icon="minimize" @click="onMinimize" class="q-mr-xs"
          :class="$q.dark.isActive ? 'dialog-btn-dark' : 'dialog-btn-light'" style="padding-bottom: 13px;">
          <q-tooltip>Minimize Window</q-tooltip>
        </q-btn>

        <q-btn dense flat icon="close" v-close-popup
          :class="$q.dark.isActive ? 'dialog-btn-dark' : 'dialog-btn-light'" />
      </q-bar>

      <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" style="margin: 0px;" />

      <q-scroll-area class="col q-pa-md"
        :thumb-style="{ backgroundColor: 'var(--scroll-bar-color)', width: '5px', borderRadius: '5px', opacity: 0.7 }"
        style="padding-top: 5px; padding-bottom: 5px;">
        <q-tab-panels v-model="tab" animated class="bg-transparent text-white">

          <q-tab-panel name="notification_details" class="q-pa-none">

            <div class="row q-col-gutter-sm">

              <div class="col-12 col-md-6">
                <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Outage Creation
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="text-caption"
                    :class="[$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light', $q.screen.lt.md ? 'col-3' : 'col-4']">
                    Outage Type</div>
                  <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                    <q-select dense outlined v-model="newForm.outageType" :options="outageTypes"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-4 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Affecting Asset
                  </div>
                  <div class="col-8">
                    <q-input dense outlined v-model="newForm.affectingAsset"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">
                      <template v-slot:append>
                        <q-icon name="list" class="cursor-pointer" @click="openAssetDialog" 
                          :color="$q.dark.isActive ? 'grey-4' : 'grey-7'" />
                      </template>
                    </q-input>
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="text-caption"
                    :class="[$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light', $q.screen.lt.md ? 'col-3' : 'col-4']">
                    Priority</div>
                  <div class="" :class="[$q.screen.lt.md ? 'col-9' : 'col-8']">
                    <q-select dense outlined v-model="newForm.priority" :options="priority"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>

                <!-- <div class="row items-center q-mb-xs">
                  <div class="col-4 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Reason For Outage
                  </div>
                  <div class="col-8">
                    <q-input dense outlined v-model="newForm.reasonForOutage"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-4 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Substation Name
                  </div>
                  <div class="col-8">
                    <q-input dense outlined v-model="newForm.substationName"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div> -->
              </div>

              <div class="col-12 col-md-6" :style="{ paddingTop: $q.screen.lt.md ? '0px' : '36px' }">


                <div class="row items-center q-mb-xs">
                  <div class="col-4 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Reason For Outage
                  </div>
                  <div class="col-8">
                    <q-input dense outlined v-model="newForm.reasonForOutage"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-4 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Substation Name
                  </div>
                  <div class="col-8">
                    <q-input dense outlined v-model="newForm.substationName"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>

              </div>
            </div>

            <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" class="q-my-md" />

            <div class="row q-col-gutter-md">

              <div class="col-12 col-md-6">
                <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Scheduled Event Date and
                  Time</div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Start Time</div>
                  <div class="col-9">
                    <q-input dense outlined v-model="form.schedStart" type="datetime-local"
                      :class="['date-wrapper', $q.dark.isActive ? 'date-mode-dark' : 'date-mode-light', $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light']" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">End Time</div>
                  <div class="col-9">
                    <q-input dense outlined v-model="form.schedEnd" type="datetime-local"
                      :class="['date-wrapper', $q.dark.isActive ? 'date-mode-dark' : 'date-mode-light', $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light']" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Duration (h:m)
                  </div>
                  <div class="col-4">
                    <q-input dense outlined v-model="form.schedDuration" mask="##:##" placeholder="00:05"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-subtitle2 q-mb-sm"
                  :class="$q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'">Alternate Event Date and
                  Time</div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Start Time</div>
                  <div class="col-9">
                    <q-input dense outlined v-model="form.altStart" type="datetime-local"
                      :class="['date-wrapper', $q.dark.isActive ? 'date-mode-dark' : 'date-mode-light', $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light']" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">End Time</div>
                  <div class="col-9">
                    <q-input dense outlined v-model="form.altEnd" type="datetime-local"
                      :class="['date-wrapper', $q.dark.isActive ? 'date-mode-dark' : 'date-mode-light', $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light']" />
                  </div>
                </div>

                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption"
                    :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'">Duration (h:m)
                  </div>
                  <div class="col-4">
                    <q-input dense outlined v-model="form.altDuration" mask="##:##" placeholder="00:05"
                      :class="$q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'" />
                  </div>
                </div>
              </div>
            </div>

          </q-tab-panel>

        </q-tab-panels>
      </q-scroll-area>

      <q-separator :color="$q.dark.isActive ? 'grey-8' : 'grey-4'" class="q-my-xs" />

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
      </q-card-actions>
    </q-card>

    <q-dialog v-model="showAssetDialog" @show="initAssetTable">
      <q-card :class="$q.dark.isActive ? 'bg-card-dark' : 'bg-card-light'" style="width: 500px; max-width: 90vw; height: 400px; display: flex; flex-direction: column; box-shadow: none;">
        <q-bar :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-blue-grey-8 text-white'">
          <div class="text-subtitle2">Select Asset</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        
        <div class="col q-pa-sm">
           <div ref="assetTableRef" class="asset-table-container asset-table-color"></div>
        </div>
      </q-card>
    </q-dialog>

  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { useWindowManager } from '../../../stores/window_manager' 
import { useQuasar } from 'quasar'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const store = useWindowManager()
const $q = useQuasar()

const internalModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const tab = ref('notification_details')
const dialogId = 'planned-dialog'
const isMinimizing = ref(false)

// --- Minimize Logic ---
const onMinimize = () => {
  isMinimizing.value = true
  store.minimize(dialogId, 'Planned Dialog', () => {
    internalModel.value = true
  })
  internalModel.value = false
}

const dialogPos = ref({ x: 0, y: 0 })

// GPU Acceleration Style
const cardStyle = computed(() => {
   const shadow = $q.dark.isActive ? '1px 1px 70px 13px #000' : 'none'
  
   if (isMinimizing.value) {
    return {
      height: '521px', width: '700px', display: 'flex', flexDirection: 'column',
      borderRadius: '2px', boxShadow: shadow
    }
  }
 
  return {
    transform: `translate3d(${dialogPos.value.x}px, ${dialogPos.value.y}px, 0)`,
    height: '521px', width: '700px', display: 'flex', flexDirection: 'column',
    boxShadow: shadow, borderRadius: '2px'
  }
})

const onPan = (evt) => {
  dialogPos.value = { x: dialogPos.value.x + evt.delta.x, y: dialogPos.value.y + evt.delta.y }
}
const resetPosition = () => {
  isMinimizing.value = false
  dialogPos.value = { x: 0, y: 0 }
}

// --- Asset Selection Logic ---
const showAssetDialog = ref(false)
const assetTableRef = ref(null)
let assetTable = null

const openAssetDialog = () => {
  showAssetDialog.value = true
}

const assetsData = [
  { id: 1, name: 'Transformer TX-101', type: 'Transformer' },
  { id: 2, name: 'Feeder F-22', type: 'Feeder Line' },
  { id: 3, name: 'Substation Alpha', type: 'Substation' },
  { id: 4, name: 'Pole P-505', type: 'Pole' },
  { id: 5, name: 'Switch S-12', type: 'Switchgear' },
  { id: 6, name: 'Transformer TX-102', type: 'Transformer' },
  { id: 7, name: 'Feeder F-23', type: 'Feeder Line' },
  { id: 8, name: 'Capacitor Bank C-1', type: 'Capacitor' },
  { id: 9, name: 'Capacitor Bank C-2', type: 'Capacitor' },
  { id: 10, name: 'Capacitor Bank C-3', type: 'Capacitor' },
  { id: 11, name: 'Capacitor Bank C-4', type: 'Capacitor' },
]

const initAssetTable = async () => {
  await nextTick()
  
  // FIX: Destroy any existing instance first
  if (assetTable) {
    assetTable.destroy()
    assetTable = null
  }

  if (assetTableRef.value) {
    assetTable = new Tabulator(assetTableRef.value, {
      data: assetsData,
      layout: "fitColumns",
      height: "320px",
      selectable: 1, // Allow row selection
      columns: [
        { title: "Asset Name", field: "name", widthGrow: 1.5 },
        { title: "Asset Type", field: "type", widthGrow: 1 }
      ],
    })

    // FIX: Attach row click listener explicitly
    assetTable.on("rowClick", function(e, row){
        const data = row.getData();
        console.log("Row Clicked:", data); // Debug
        
        // FILL INPUT WITH BOTH NAME AND TYPE
        newForm.affectingAsset = `${data.name} - ${data.type}`;
        
        // Close the dialog
        showAssetDialog.value = false;
    });
  }
}

// --- Form Data ---
const eventTypes = ['replacing meters', 'maintenance', 'emergency']
const outageTypes = ['Maintenance', 'Upgrade', 'Construction']
const priority = ['Normal', 'High', 'Critical']

const newForm = reactive({
  outageType: 'Maintenance',
  affectingAsset: '', 
  priority: 'Normal',
  reasonForOutage: '',
  substationName: '',
})

const form = reactive({
  name: '', phone: '', email: '', serviceCenter: '', address: '',
  creationDate: '2025-09-29', overrideMailing: false, workOrderId: '',
  eventType: 'replacing meters', outageType: 'Regular Outage',
  schedStart: '2025-09-30T00:00', schedEnd: '2025-09-30T00:05', schedDuration: '00:05',
  altStart: '2025-10-01T00:00', altEnd: '2025-10-01T00:05', altDuration: '00:05',
  useAlternate: false, switchingOrder: null, comments: ''
})
</script>

<style scoped>
/* --- SCOPED STYLES --- */
.bg-card-light { background: white; border: 1px solid #ccc; }
.bg-card-dark { background: #1d1d1d; border: 2px solid #444; }

.dialog-header-light { color: #fff; font-weight: 500; font-size: 14px; }
.dialog-header-dark { color: #e0e0e0; font-weight: 500; font-size: 14px; }

.dialog-btn-light { color: #455a64; }
.dialog-btn-dark { color: #bbb; }
.dialog-btn-dark:hover { color: white; background: rgba(255, 255, 255, 0.1); }

.dialog-subtitle-light { color: #385562; }
.dialog-subtitle-dark { color: #81d4fa; }

.dialog-field-label-light { color: #333; }
.dialog-field-label-dark { color: #ccc; }

:deep(.q-field__native) { padding-top: 5px; }
:deep(.q-field--dense) .q-field__control { height: 1.6rem !important; background: transparent !important; }
:deep(.q-field--auto-height).q-field--dense .q-field__control,
:deep(.q-field--auto-height.q-field--dense) .q-field__native { min-height: 1.6rem; }
:deep(.q-field--dense .q-field__marginal) { height: 25px !important; }

.date-wrapper.date-mode-light :deep(input) { color: #333 !important; color-scheme: light !important; }
.date-wrapper.date-mode-light :deep(input::-webkit-calendar-picker-indicator) { filter: none !important; cursor: pointer; opacity: 0.8; }
.date-wrapper.date-mode-dark :deep(input) { color: #f4f5f7 !important; color-scheme: dark !important; }
.date-wrapper.date-mode-dark :deep(input::-webkit-calendar-picker-indicator) { filter: invert(1) !important; cursor: pointer; opacity: 0.8; }
.date-wrapper :deep(input::-webkit-calendar-picker-indicator):hover { opacity: 1; }

.custom-create-btn {
  background-color: transparent; color: #385562; border: 2px solid #385562; cursor: pointer;
  font-size: 14px; font-weight: 500; text-transform: uppercase; display: inline-flex;
  align-items: center; justify-content: center; transition: background-color 0.3s ease;
}
.custom-create-btn:hover { background-color: #1d2c33; border: 2px solid #385562; color: grey; font-weight: 500; }

.asset-table-container {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}


</style>
<style>
/* GPU CARD ISOLATION */
.gpu-card {
  contain: layout style;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Animation */
.minimize-to-footer-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  box-shadow: none !important;
  border: 1px solid #777 !important;
}

.minimize-to-footer-leave-to {
  opacity: 0;
  transform: translate3d(-35vw, 48vh, 0) scale(0.1) !important;
}



</style>