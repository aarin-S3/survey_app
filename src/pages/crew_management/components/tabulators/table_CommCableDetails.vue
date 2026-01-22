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
          <q-toolbar-title class="text-subtitle1">{{ editingIndex === -1 ? 'Add New' : 'Edit' }} Comm Cable
            Details</q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <!-- <label class="field-label-dark">Loop No.</label> -->
                <q-select class="field-input-dark" outlined v-model="form.LoopNo" label="Loop No." :options="dropdown12" />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <!-- <label class="field-label-dark">Nominal Voltage</label> -->
                <q-select stack-label outlined multiple label="RTU to nearby 1st feeder (Max 5)"
                     v-model="form.feeders" class="field-input-dark" :options="feederOptions" :max-values="5" />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-input stack-label outlined  class="field-input-dark" label="RTU to feeder distance" v-model="form.distance" />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <label class="field-label-dark">Nominal Voltage</label>
                <q-option-group inline label="Cable tray available" type="radio" :options="yesNoOptions"
                     v-model="form.trayAvailable" class="field-input-dark" />
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-input stack-label outlined label="Panel to Panel looping cable length"
                     v-model="form.loopingLength" />
              </div>
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
import { ref, reactive } from 'vue'
import { useWindowManager } from '../../../../stores/window_manager'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const props = defineProps(['modelValue', 'name'])
const emit = defineEmits(['update:modelValue'])
const store = useWindowManager()

const feeders = ref([])

const feederDialogOpen = ref(false)
const deleteConfirmOpen = ref(false)
const editingIndex = ref(-1)
const selectedRow = ref(null)

const dropdown12 = Array.from({ length: 12 }, (_, i) => i + 1)

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


const defaultForm = {
  LoopNo: 'Not Selected',
  feeders: [],
  distance: '',
  trayAvailable: false,
  loopingLength: '',
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
