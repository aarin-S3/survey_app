<template>
  <div class="annexure-container q-pa-md">
    <!-- Page Title -->
    <div class="text-h6 q-mb-lg page-title">Annexure -A</div>

    <!-- Handmade CR Layout Section -->
    <q-card class="upload-card q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 text-weight-bold section-title q-mb-md">Block 1: Handmade Control Room Lay Out</div>
        <q-file v-model="crLayoutFile" label="Upload Image" accept=".jpg, .jpeg, .png" max-file-size="10485760"
          @rejected="onRejected" @update:model-value="updateCrPreview" class="custom-file-input" outlined dense>
          <template v-slot:append>
            <q-icon name="cloud_upload" color="primary" />
          </template>
        </q-file>
        <div v-if="crLayoutFile" class="text-caption q-mt-xs file-info">
          Selected: {{ crLayoutFile.name }}
        </div>
        <div v-if="crLayoutPreview" class="image-preview-container q-mt-md">
          <img :src="crLayoutPreview" alt="CR Layout Preview" class="image-preview" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Handmade SLD Section -->
    <q-card class="upload-card q-mb-md">
      <q-card-section>
        <div class="text-subtitle2 text-weight-bold section-title q-mb-md">Block 2: Handmade SLD</div>
        <q-file v-model="sldFile" label="Upload Image" accept=".jpg, .jpeg, .png" max-file-size="10485760"
          @rejected="onRejected" @update:model-value="updateSldPreview" class="custom-file-input" outlined dense>
          <template v-slot:append>
            <q-icon name="cloud_upload" color="primary" />
          </template>
        </q-file>
        <div v-if="sldFile" class="text-caption q-mt-xs file-info">
          Selected: {{ sldFile.name }}
        </div>
        <div v-if="sldLayoutPreview" class="image-preview-container q-mt-md">
          <img :src="sldLayoutPreview" alt="SLD Preview" class="image-preview" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Interconnector Relay Details Section -->
    <q-card class="relay-section q-mt-xl">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">Interconnector Relay Details</div>

        <!-- Relay List -->
        <div class="q-gutter-y-md">
          <q-card v-for="(relay, index) in relays" :key="index" class="relay-card clickable" @click="editRelay(index)">
            <q-card-section class="flex items-center justify-between">
              <div class="text-subtitle2 text-weight-medium relay-name">{{ relay.feederName || `Relay - ${index + 1}` }}
              </div>
              <q-icon name="delete" size="md" class="delete-icon" @click.stop="deleteRelay(index)" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Add Button -->
        <div class="flex justify-end q-mt-md">
          <q-btn label="Add Relay" color="blue" class="q-px-lg" unelevated flat="" @click="addRelay" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Relay Details Dialog -->
    <q-dialog v-model="showRelayDialog" persistent>
      <q-card style="min-width: 350px; width: 90%; max-width: 500px;" class="bg-white text-black">
        <q-card-section>
          <div class="text-h6">Interconnector Relay Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input v-model="currentRelay.feederName" label="Interconnector Feeder Name" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-select v-model="currentRelay.voltageLevel" :options="['66 kV', '33 kV', '11 kV']" label="Voltage Level"
            outlined dense bg-color="white" label-color="grey-8" color="black" behavior="menu" />

          <q-input v-model="currentRelay.relayMake" label="Relay Make" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-input v-model="currentRelay.relayModel" label="Relay Model" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-input v-model="currentRelay.remarks" label="Remarks" type="textarea" outlined dense bg-color="white"
            label-color="grey-8" color="black" />
        </q-card-section>

        <q-card-section class="row items-center justify-between q-pa-md">
          <q-btn label="Cancel" color="red" elevated flat="" v-close-popup />
          <q-btn label="Save" color="green" unelevated v-close-popup @click="saveRelay" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Numerical Relay DI/DO Points Details Section -->
    <q-card class="relay-section q-mt-xl">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">Numerical Relay DI/DO Points Details</div>

        <!-- Relay List -->
        <div class="q-gutter-y-md">
          <q-card v-for="(diDoRelay, index) in diDoRelays" :key="index" class="relay-card clickable"
            @click="editDiDoRelay(index)">
            <q-card-section class="flex items-center justify-between">
              <div class="text-subtitle2 text-weight-medium relay-name">{{ diDoRelay.feederName || `Relay - ${index +
                1}` }}
              </div>
              <q-icon name="delete" size="md" class="delete-icon" @click.stop="deleteDiDoRelay(index)" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Add Button -->
        <div class="flex justify-end q-mt-md">
          <q-btn label="Add Relay" color="blue" class="q-px-lg" unelevated flat="" @click="addDiDoRelay" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Numerical Relay DI/DO Points Details Dialog -->
    <q-dialog v-model="showDiDoRelayDialog" persistent>
      <q-card style="min-width: 350px; width: 90%; max-width: 500px;" class="bg-white text-black">
        <q-card-section>
          <div class="text-h6">Numerical Relay DI/DO Points Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input v-model="currentDiDoRelay.feederName" label="Feeder Name" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-input v-model="currentDiDoRelay.relayMake" label="Relay Make" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-input v-model="currentDiDoRelay.relayModel" label="Relay Model" outlined dense bg-color="white"
            label-color="grey-8" color="black" />

          <q-select v-model="currentDiDoRelay.noOfDiPoints" :options="diPointsOptions" label="No. of DI points in relay"
            outlined dense bg-color="white" label-color="grey-8" color="black" behavior="menu" />

          <q-select v-model="currentDiDoRelay.noOfDoPoints" :options="doPointsOptions" label="No. of DO points in relay"
            outlined dense bg-color="white" label-color="grey-8" color="black" behavior="menu" />

          <q-input v-model="currentDiDoRelay.remarks" label="Remarks" type="textarea" outlined dense bg-color="white"
            label-color="grey-8" color="black" />
        </q-card-section>

        <q-card-section class="row items-center justify-between q-pa-md">
          <q-btn label="Cancel" color="red" elevated flat="" v-close-popup />
          <q-btn label="Save" color="green" unelevated v-close-popup @click="saveDiDoRelay" />
        </q-card-section>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const crLayoutFile = ref(null)
const sldFile = ref(null)
const crLayoutPreview = ref(null)
const sldLayoutPreview = ref(null)

// Relay Logic
const showRelayDialog = ref(false)
const editingIndex = ref(-1)

// Initialize with 2 default relays as requested
const relays = ref([
  { feederName: 'Relay - 1', voltageLevel: '', relayMake: '', relayModel: '', remarks: '' },
  { feederName: 'Relay - 2', voltageLevel: '', relayMake: '', relayModel: '', remarks: '' }
])

const currentRelay = reactive({
  feederName: '',
  voltageLevel: '',
  relayMake: '',
  relayModel: '',
  remarks: ''
})

// DI/DO Relay Logic
const showDiDoRelayDialog = ref(false)
const editingDiDoIndex = ref(-1)

// Initialize with 3 default relays as requested
const diDoRelays = ref([
  { feederName: 'Relay-1', relayMake: '', relayModel: '', noOfDiPoints: null, noOfDoPoints: null, remarks: '' },
  { feederName: 'Relay-2', relayMake: '', relayModel: '', noOfDiPoints: null, noOfDoPoints: null, remarks: '' },
  { feederName: 'Relay-3', relayMake: '', relayModel: '', noOfDiPoints: null, noOfDoPoints: null, remarks: '' }
])

const currentDiDoRelay = reactive({
  feederName: '',
  relayMake: '',
  relayModel: '',
  noOfDiPoints: null,
  noOfDoPoints: null,
  remarks: ''
})

// DI/DO Points options
const diPointsOptions = ref(Array.from({ length: 10 }, (_, i) => i + 1))
const doPointsOptions = ref(Array.from({ length: 10 }, (_, i) => i + 1))

const onRejected = (rejectedEntries) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`
  })
}

const addRelay = () => {
  editingIndex.value = -1 // New Entry
  Object.assign(currentRelay, {
    feederName: '',
    voltageLevel: '',
    relayMake: '',
    relayModel: '',
    remarks: ''
  })
  showRelayDialog.value = true
}

const editRelay = (index) => {
  editingIndex.value = index
  Object.assign(currentRelay, { ...relays.value[index] })
  showRelayDialog.value = true
}

const saveRelay = () => {
  if (editingIndex.value === -1) {
    // Add new
    relays.value.push({ ...currentRelay })
  } else {
    // Update existing
    relays.value[editingIndex.value] = { ...currentRelay }
  }
}

const deleteRelay = (index) => {
  relays.value.splice(index, 1)
}

const updateCrPreview = () => {
  if (crLayoutFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      crLayoutPreview.value = e.target.result
    }
    reader.readAsDataURL(crLayoutFile.value)
  }
}

const updateSldPreview = () => {
  if (sldFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      sldLayoutPreview.value = e.target.result
    }
    reader.readAsDataURL(sldFile.value)
  }
}

// DI/DO Relay Methods
const addDiDoRelay = () => {
  editingDiDoIndex.value = -1 // New Entry
  Object.assign(currentDiDoRelay, {
    feederName: '',
    relayMake: '',
    relayModel: '',
    noOfDiPoints: null,
    noOfDoPoints: null,
    remarks: ''
  })
  showDiDoRelayDialog.value = true
}

const editDiDoRelay = (index) => {
  editingDiDoIndex.value = index
  Object.assign(currentDiDoRelay, { ...diDoRelays.value[index] })
  showDiDoRelayDialog.value = true
}

const saveDiDoRelay = () => {
  if (editingDiDoIndex.value === -1) {
    // Add new
    diDoRelays.value.push({ ...currentDiDoRelay })
  } else {
    // Update existing
    diDoRelays.value[editingDiDoIndex.value] = { ...currentDiDoRelay }
  }
}

const deleteDiDoRelay = (index) => {
  diDoRelays.value.splice(index, 1)
}

</script>

<style scoped>
.annexure-container {
  max-width: 100%;
  min-height: 100vh;
  padding: 1rem;
}

/* Light mode */
.annexure-container {
  background-color: rgb(255, 255, 255);
}

/* Dark mode */
:global(.body--dark) .annexure-container {
  background-color: #000000;
}

.page-title {
  font-weight: 600;
}

:global(.body--dark) .page-title {
  color: #ffffff;
}

.page-title {
  color: #000000;
}

.section-title {
  font-size: 1.1rem;
}

:global(.body--dark) .section-title {
  color: #ffffff;
}

.section-title {
  color: #000000;
}

/* Card Styling */
.upload-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:global(.body--dark) .upload-card {
  background-color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.upload-card :deep(.q-field__control) {
  color: #333;
}

:global(.body--dark) .upload-card :deep(.q-field__control) {
  color: #ffffff;
}

:global(.body--dark) .upload-card :deep(.q-field__input) {
  color: #ffffff;
}

:global(.body--dark) .upload-card :deep(.q-field__native),
:global(.body--dark) .upload-card :deep(input) {
  background-color: #555555;
  color: #ffffff;
}

:global(.body--dark) .upload-card :deep(.q-placeholder) {
  color: #999999;
}

.file-info {
  font-size: 0.85rem;
}

:global(.body--dark) .file-info {
  color: #b0b0b0;
}

.file-info {
  color: #666666;
}

/* Image Preview */
.image-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  padding: 1rem;
}

:global(.body--dark) .image-preview-container {
  background-color: #555555;
  border: 1px solid #666666;
}

.image-preview {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
}

/* Relay Card Styling */
.relay-card {
  background-color: #faf9f9;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

:global(.body--dark) .relay-card {
  background-color: #555555;
  border-color: #666666;
}

.relay-card:hover {
  background-color: #e8e8e8;
  border-color: #90caf9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:global(.body--dark) .relay-card:hover {
  background-color: #333333;
  border-color: #90caf9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.relay-name {
  flex: 1;
}

:global(.body--dark) .relay-name {
  color: #d1cfcf;
}

.relay-name {
  color: #1a1a1a;
}

.clickable {
  cursor: pointer;
}

.delete-icon {
  cursor: pointer;
  transition: color 0.2s ease;
  color: #bb201d;
}

:global(.body--dark) .delete-icon {
  color: #ff6b6b;
}

.delete-icon:hover {
  color: #ff5252 !important;
  transform: scale(1.2);
}

/* Custom File Input */
.custom-file-input {
  border-radius: 8px;
  font-weight: 500;
}

/* Relay Section Card */
.relay-section {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:global(.body--dark) .relay-section {
  background-color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
</style>
