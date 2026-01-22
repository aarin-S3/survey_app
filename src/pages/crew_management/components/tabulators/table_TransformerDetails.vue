<template>
  <div class="feeder-survey-container q-pa-md">
    <!-- Header Section:-->
    <div class="header-section q-mb-md">
      <div class="text-h6 text-white q-mb-sm">{{ props.name }}</div>
    </div>
    <!-- Feeder List Content -->
    <div class="content-section q-mt-lg">
      <!-- Feeder Cards (Bars) -->
      <div class="feeder-list-container">
        <div v-for="feeder in feeders" :key="feeder.id"
          class="feeder-bar row items-center justify-between q-pa-md q-mb-sm clickable" @click="editFeeder(feeder)">
          <div class="text-h6 text-grey-9">Feeder - {{ feeder.bayName || feeder.id }}</div>
          <q-icon name="play_arrow" size="sm" color="grey-7" />
        </div>
      </div>

      <!-- Add Feeder Button: Cyan Rounded -->
      <div class="flex justify-center q-mt-xl">
        <q-btn label="Add Comm Cable Row" unelevated class="survey-add-btn" @click="openAddDialog" />
      </div>
    </div>

    <!-- Shared Add/Edit Feeder Dialog (Tablet Modal / Mobile ) -->
    <q-dialog v-model="feederDialogOpen" :maximized="$q.screen.lt.md" transition-show="slide-up"
      transition-hide="slide-down" persistent>
      <q-card class="survey-dialog-card" :style="$q.screen.gt.sm ? 'width: 70vw; max-width: 900px;' : ''">
        <q-toolbar class="bg-indigo-10 text-white">
          <q-toolbar-title class="text-subtitle1">{{ editingIndex === -1 ? 'Add New' : 'Edit' }} Transformer
            Details</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row q-col-gutter-md">

            <!-- Transformer Photo -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-file
                  outlined
                  accept="image/*"
                  v-model="form.transformerPhoto"
                  label="Upload Transformer No. Photo"
                  :class="inputClass"
                  clearable
                >
                  <template #prepend>
                    <q-icon name="image" />
                  </template>
                </q-file>
              </div>
            </div>

            <!-- Voltage Level -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-select
                  stack-label
                  label="Transformer Voltage Level"
                  outlined
                  emit-value
                  map-options
                  v-model="form.transformerVoltageLevel"
                  :options="voltageLevels"
                  :class="inputClass"
                />
              </div>
            </div>

            <!-- Rated Capacity -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-input
                  stack-label
                  outlined
                  class="field-input-dark"
                  label="Rated (20 MVA, 50 MVA, kVA)"
                  v-model="form.transformerRatedCapacity"
                />
              </div>
            </div>

            <!-- Resistance -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-input
                  stack-label
                  outlined
                  class="field-input-dark"
                  label="R (Resistance / % Impedance)"
                  v-model="form.transformerResistance"
                />
              </div>
            </div>

            <!-- Reactance -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-input
                  stack-label
                  outlined
                  class="field-input-dark"
                  label="X (Reactance)"
                  v-model="form.transformerReactance"
                />
              </div>
            </div>

            <!-- Grounded Neutral -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-select
                  label="Grounded (Neutral Status)"
                  stack-label
                  outlined
                  emit-value
                  map-options
                  v-model="form.groundedNeutralStatus"
                  :options="yesNoOptions"
                  :class="inputClass"
                />
              </div>
            </div>

            <!-- Vector Group -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-select
                  label="Vector Group (Star / Delta)"
                  stack-label
                  outlined
                  emit-value
                  map-options
                  v-model="form.vectorGroup"
                  :options="vectorGroupOptions"
                  :class="inputClass"
                />
              </div>
            </div>

            <!-- End Number -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-select
                  label="End Number (Single / Dual O/P)"
                  stack-label
                  outlined
                  emit-value
                  map-options
                  v-model="form.endNumber"
                  :options="endNumberOptions"
                  :class="inputClass"
                />
              </div>
            </div>

            <!-- RTCC Steps -->
            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="RTCC High Step" v-model="form.rtccHighStep" />
            </div>

            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="RTCC Low Step" v-model="form.rtccLowStep" />
            </div>

            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="RTCC Step Voltage Increment" v-model="form.rtccStepVoltageIncrement" />
            </div>

            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="RTCC Neutral Step" v-model="form.rtccNeutralStep" />
            </div>

            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="RTCC Normal Step" v-model="form.rtccNormalStep" />
            </div>

            <div class="col-12 col-md-6">
              <q-input stack-label outlined label="Neutral_U (U = Voltage)" v-model="form.neutralUVoltage" />
            </div>

            <!-- Tap Position -->
            <div class="col-12 col-md-6">
              <q-select
                stack-label
                label="Tap Position Connection Type"
                outlined
                emit-value
                map-options
                v-model="form.tapPositionConnectionType"
                :options="tapConnectionTypeOptions"
                :class="inputClass"
              />
            </div>

            <!-- RTCC Panel Status -->
            <div class="col-12 col-md-6">
              <q-select
                stack-label
                label="RTCC Panel Status"
                outlined
                emit-value
                map-options
                v-model="form.rtccPanelStatus"
                :options="rtccPanelStatusOptions"
                :class="inputClass"
              />
            </div>

            <!-- Reference Panel -->
            <div class="col-12 col-md-6">
              <q-input
                stack-label
                outlined
                label="Panel name from which TAP position is noted"
                v-model="form.rtccPanelReference"
                :disable="form.rtccPanelStatus !== 'Not Working'"
              />
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
          <span class="q-ml-sm">Are you sure you want to delete this feeder?</span>
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
import { ref, reactive, computed } from 'vue'
import { useWindowManager } from '../../../../stores/window_manager'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const inputClass = computed(() =>
   $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'
)

const props = defineProps(['modelValue', 'name'])
const emit = defineEmits(['update:modelValue'])
const store = useWindowManager()

const feeders = ref([])

const feederDialogOpen = ref(false)
const deleteConfirmOpen = ref(false)
const editingIndex = ref(-1)
const selectedRow = ref(null)

const dropdown12 = Array.from({ length: 12 }, (_, i) => i + 1)

const voltageLevels = [
  { label: '11 kV', value: '11kV' },
  { label: '33 kV', value: '33kV' },
  { label: '66 kV', value: '66kV' }
]

const yesNoOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' }
]

const vectorGroupOptions = [
  { label: 'Star', value: 'Star' },
  { label: 'Delta', value: 'Delta' }
]

const endNumberOptions = [
  { label: 'Single O/P', value: 'Single' },
  { label: 'Dual O/P', value: 'Dual' }
]

const tapConnectionTypeOptions = [
  { label: 'Resistance', value: 'Resistance' },
  { label: 'Lamp', value: 'Lamp' }
]

const rtccPanelStatusOptions = [
  { label: 'Working', value: 'Working' },
  { label: 'Not Working', value: 'Not Working' }
]


const defaultForm = {
  // Transformer / RTCC specific fields
  transformerPhoto: null,
  transformerVoltageLevel: '',
  transformerRatedCapacity: '',
  transformerResistance: '',
  transformerReactance: '',
  groundedNeutralStatus: '',
  vectorGroup: '',
  endNumber: '',
  rtccHighStep: '',
  rtccLowStep: '',
  rtccStepVoltageIncrement: '',
  rtccNeutralStep: '',
  rtccNormalStep: '',
  neutralUVoltage: '',
  tapPositionConnectionType: '',

  // 🔹 NEW FIELD YOU ASKED FOR
  rtccPanelStatus: '',
  rtccPanelReferencePanel: ''
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
  min-height: 100vh;
}

.header-section {
  background: #46586b;
  /* Indigo dark background from image */
  padding: 20px;
  border-bottom: 1px solid #ffffff40;
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
  border-radius: 20px;
  padding: 8px 30px;
  font-weight: bold;
  font-size: 14px;
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
  /* border: 1px solid #bdbdbd; */
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
</style>
