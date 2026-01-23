<template>
  <div class="feeder-survey-container q-pa-md">
    <!-- Header Section:-->
    <div class="header-section q-mb-md">
      <div :class="labelClass" class="text-h6 q-mb-sm">Feeder List</div>
      <div class="row q-col-gutter-md q-col-gutter-y-md">
        <div class="col-12 col-sm-6 col-md-3">
          <div class="meta-field">
            <label :class="labelClass" class="survey-label">SUBSTATION NAME</label>
            <input v-model="headerData.substationName" type="text" class="survey-input" />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="meta-field">
            <label :class="labelClass" class="survey-label">IN-CHARGE NAME</label>
            <input v-model="headerData.inChargeName" type="text" class="survey-input" />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="meta-field">
            <label :class="labelClass" class="survey-label">DATE</label>
            <input v-model="headerData.date" type="date" class="survey-input" />
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="meta-field">
            <label :class="labelClass" class="survey-label">ENGINEER</label>
            <input v-model="headerData.engineerName" type="text" class="survey-input" />
          </div>
        </div>
      </div>
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
        <q-btn label="Add Feeder" unelevated class="survey-add-btn" @click="openAddDialog" />
      </div>
    </div>

    <!-- Shared Add/Edit Feeder Dialog (Tablet Modal / Mobile ) -->
    <q-dialog v-model="feederDialogOpen" :maximized="$q.screen.lt.md" transition-show="slide-up"
      transition-hide="slide-down" persistent>
      <q-card class="survey-dialog-card" :style="$q.screen.gt.sm ? 'width: 70vw; max-width: 900px;' : ''">
        <q-toolbar class="text-white">
          <q-toolbar-title :class="labelClass" class="text-subtitle1">{{ editingIndex === -1 ? 'Add New' : 'Edit' }}
            Feeder
            Details</q-toolbar-title>
          <q-btn flat :class="labelClass" round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="scroll" style="max-height: 70vh">
          <div class="row q-col-gutter-md">
            <!-- Bay Name -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Bay Name</q-label>
                <input v-model="form.bayName" type="text" class="field-input-dark" placeholder="Name field" />
              </div>
            </div>

            <!-- Nominal Voltage -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Nominal Voltage</q-label>
                <select v-model="form.nominalVoltage" class="field-input-dark">
                  <option value="" disabled>Select Voltage</option>
                  <option value="66kV">66kV</option>
                  <option value="33kV">33kV</option>
                  <option value="11kV">11kV</option>
                </select>
              </div>
            </div>

            <!-- Description -->
            <div class="col-12">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Feeder / Transformer Description</q-label>
                <textarea v-model="form.description" class="field-input-dark" rows="3"></textarea>
              </div>
            </div>

            <!-- Space Availability -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Availability of SPACE in C&R Panel</q-label>
                <input v-model="form.spaceAvail" type="text" class="field-input-dark" />
              </div>
            </div>

            <!-- Feeder Category -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Feeder Category</q-label>
                <input v-model="form.feederCategory" type="text" class="field-input-dark" />
              </div>
            </div>

            <!-- Requirement of CMR -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Requirement of CMR</q-label>
                <select v-model="form.reqCMR" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- Requirement of HDR -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Requirement Of HDR</q-label>
                <select v-model="form.reqHDR" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- Potential Free Contacts -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Potential free contacts available</q-label>
                <select v-model="form.contactsAvail" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- Supply on Lamp -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Supply available on lamp</q-label>
                <select v-model="form.supplyLamp" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- Metering Core CT -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">Metering core CT available</q-label>
                <select v-model="form.meteringCT" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- PT Voltage -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">PT voltage available</q-label>
                <select v-model="form.ptVoltage" class="field-input-dark">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <!-- CT Ratio -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">CT Ratio</q-label>
                <input v-model="form.ctRatio" type="text" class="field-input-dark" />
              </div>
            </div>

            <!-- CT Cable Length -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">CT Cable length from MFT location to VCB/CRP
                  TB</q-label>
                <input v-model="form.ctCableLength" type="text" class="field-input-dark" />
              </div>
            </div>

            <!-- PT Cable Length -->
            <div class="col-12 col-md-6">
              <div class="meta-field dark">
                <q-label :class="labelClass" class="field-label-dark">PT Cable length from MFT location to VCB/CRP
                  TB</q-label>
                <input v-model="form.ptCableLength" type="text" class="field-input-dark" />
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
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar();

const headerData = reactive({
  substationName: '',
  inChargeName: '',
  date: '',
  engineerName: ''
})

const feeders = ref([])

const feederDialogOpen = ref(false)
const deleteConfirmOpen = ref(false)
const editingIndex = ref(-1)
const selectedRow = ref(null)

const defaultForm = {
  bayName: '',
  nominalVoltage: '',
  description: '',
  spaceAvail: '',
  feederCategory: '',
  reqCMR: 'Yes',
  reqHDR: 'Yes',
  contactsAvail: 'Yes',
  supplyLamp: 'Yes',
  meteringCT: 'Yes',
  ptVoltage: 'Yes',
  ctRatio: '',
  ctCableLength: '',
  ptCableLength: ''
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

const labelClass = computed(() =>
  $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'
)

const inputClass = computed(() =>
  $q.dark.isActive ? 'dialog-field-label-dark' : 'dialog-field-label-light'
)

const subtitleClass = computed(() =>
  $q.dark.isActive ? 'dialog-subtitle-dark' : 'dialog-subtitle-light'
)

</script>

<style scoped>
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

.feeder-survey-container {
  max-width: 100%;
  background-color: transparent;
  min-height: 100vh;
}

.header-section {
  /* background: #84aedb; */
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
  border: 1px solid gray;
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
  /* background: #d4d4d4; */
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
</style>
