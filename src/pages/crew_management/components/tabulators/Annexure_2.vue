<template>
  <div class="annexure-container q-pa-md">
    <!-- Page Title -->
    <div :class="labelClass" class="text-h6 q-mb-lg page-title">Annexure - B</div>

    <!-- Section 1: Choose Panel Details -->
    <q-card class="panel-selection-card q-mb-lg">
      <q-card-section>
        <div :class="labelClass" class="text-subtitle2 text-weight-bold section-title q-mb-md">Choose Panel details</div>

        <q-select v-model="selectedPanel" :options="panelOptions" label="Choose" outlined dense emit-value map-options
          @update:model-value="onPanelSelect" class="panel-select-field" />
      </q-card-section>
    </q-card>

    <!-- Panel Details Dialog -->
    <q-dialog v-model="showPanelDialog" persistent>
      <q-card style="min-width: 350px; width: 90%; max-width: 500px;" class="dialog-card">
        <q-card-section>
          <div class="text-h6 dialog-title">{{ selectedPanel }} Panel Details</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-select v-model="currentPanel.signalname" :options="signalnameOptions" label="Signal Name" outlined
            dense class="field-input" behavior="menu" />
          <q-select v-model="currentPanel.lampVoltages" :options="lampVoltageOptions" label="Lamp Voltages" outlined
            dense class="field-input" behavior="menu" />

          <q-select v-model="currentPanel.runningOnDualVoltage" :options="yesNoOptions" label="Running on Dual Voltage"
            outlined dense class="field-input" behavior="menu" />

          <q-input v-model="currentPanel.remarks" label="Remarks" type="textarea" outlined dense class="field-input" />
        </q-card-section>

        <q-card-section class="row items-center justify-between q-pa-md">
          <q-btn label="Cancel" color="red" unelevated flat v-close-popup />
          <q-btn label="Save" color="blue" unelevated v-close-popup @click="savePanel" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Section 2: Panel Metering Chamber Dimension -->
    <q-card class="metering-chamber-card">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">Panel Metering chamber dimension</div>

        <!-- Voltage Blocks Container -->
        <div class="voltage-blocks-container">
          <!-- 66kV Block -->
          <div class="voltage-block">
            <div class="block-header">66kV</div>
            <div class="q-gutter-y-md">
              <q-select v-model="panelMeteringData.kv66.panelMake" :options="panelMakeOptions" label="Panel Make"
                outlined dense @update:model-value="checkIfOthers('66kv')" class="field-input" behavior="menu" />

              <q-input v-if="panelMeteringData.kv66.panelMake === 'Others'"
                v-model="panelMeteringData.kv66.customPanelMake" label="Specify Panel Make" outlined dense
                class="field-input" />

              <div class="dimensions-row">
                <q-input v-model.number="panelMeteringData.kv66.height" label="Height(m)" type="number" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv66.width" label="Width(m)" type="number" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv66.depth" label="Depth(m)" type="number" outlined dense
                  class="field-input dimension-field" />
              </div>
            </div>
          </div>

          <!-- 33kV Block -->
          <div class="voltage-block">
            <div class="block-header">33kV</div>
            <div class="q-gutter-y-md">
              <q-select v-model="panelMeteringData.kv33.panelMake" :options="panelMakeOptions" label="Panel Make"
                outlined dense @update:model-value="checkIfOthers('33kv')" class="field-input" behavior="menu" />

              <q-input v-if="panelMeteringData.kv33.panelMake === 'Others'"
                v-model="panelMeteringData.kv33.customPanelMake" label="Specify Panel Make" outlined dense
                class="field-input" />

              <div class="dimensions-row">
                <q-input v-model.number="panelMeteringData.kv33.height" label="Height(m)" type="text" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv33.width" label="Width(m)" type="text" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv33.depth" label="Depth(m)" type="text" outlined dense
                  class="field-input dimension-field" />
              </div>
            </div>
          </div>

          <!-- 11kV Block -->
          <div class="voltage-block">
            <div class="block-header">11kV</div>
            <div class="q-gutter-y-md">
              <q-select v-model="panelMeteringData.kv11.panelMake" :options="panelMakeOptions" label="Panel Make"
                outlined dense @update:model-value="checkIfOthers('11kv')" class="field-input" behavior="menu" />

              <q-input v-if="panelMeteringData.kv11.panelMake === 'Others'"
                v-model="panelMeteringData.kv11.customPanelMake" label="Specify Panel Make" outlined dense
                class="field-input" />

              <div class="dimensions-row">
                <q-input v-model.number="panelMeteringData.kv11.height" label="Height(m)" type="number" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv11.width" label="Width(m)" type="number" outlined dense
                  class="field-input dimension-field" />
                <q-input v-model.number="panelMeteringData.kv11.depth" label="Depth(m)" type="number" outlined dense
                  class="field-input dimension-field" />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar();

const panelOptions = [
  { label: '66kV', value: '66kV' },
  { label: '33kV', value: '33kV' },
  { label: '11kV', value: '11kV' }
]
const signalnameOptions = ['CB ON', 'CB OFF', 'AUTO TRIP', 'SPRING CHARGE', 'TRIP CIRCUIT HEALTHY', 'DC FAIL',
  'Breaker In Service', 'EARTH SWITCH ', 'ISOA', 'ISOB']
const lampVoltageOptions = ['110V', '220V', '230V', '440V']
const yesNoOptions = ['YES', 'NO']
const panelMakeOptions = ['CG', 'Mega Win', 'Stelmec', 'Others']

const selectedPanel = ref(null)
const showPanelDialog = ref(false)

const currentPanel = reactive({
  signalname: null,
  lampVoltages: null,
  runningOnDualVoltage: null,
  remarks: ''
})

// Store panel details for each voltage level
const panelDetails = reactive({
  '66kV': { signalname: null, lampVoltages: null, runningOnDualVoltage: null, remarks: '' },
  '33kV': { signalname: null, lampVoltages: null, runningOnDualVoltage: null, remarks: '' },
  '11kV': { signalname: null, lampVoltages: null, runningOnDualVoltage: null, remarks: '' }
})

// Panel Metering Data
const panelMeteringData = reactive({
  kv66: { panelMake: null, customPanelMake: '', height: null, width: null, depth: null },
  kv33: { panelMake: null, customPanelMake: '', height: null, width: null, depth: null },
  kv11: { panelMake: null, customPanelMake: '', height: null, width: null, depth: null }
})

const onPanelSelect = () => {
  if (selectedPanel.value) {
    // Load existing panel details if available
    Object.assign(currentPanel, panelDetails[selectedPanel.value])
    showPanelDialog.value = true
  }
}

const savePanel = () => {
  // Store panel details for the selected voltage
  Object.assign(panelDetails[selectedPanel.value], { ...currentPanel })
}

const checkIfOthers = (voltageLevel) => {
  // This can be used for additional logic if needed
}
</script>

<style scoped>
.annexure-container {
  max-width: 100%;
  min-height: 100vh;
  padding: 1rem;
}
/* Dark mode */
:global(.body--dark) .annexure-container {
  background-color: #000000;
}

.page-title {
  font-weight: 600;
  font-size: 1.5rem;
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

/* Panel Selection Card */
.panel-selection-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:global(.body--dark) .panel-selection-card {
  background-color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.panel-select-field {
  width: 100%;
}

/* Metering Chamber Card */
.metering-chamber-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:global(.body--dark) .metering-chamber-card {
  background-color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Voltage Blocks Container */
.voltage-blocks-container {
  display: grid;
  gap: 1.5rem;
}

/* Individual Voltage Block */
.voltage-block {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 1.5rem;
}

:global(.body--dark) .voltage-block {
  background-color: #555555;
  border-left-color: #90caf9;
}

.block-header {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

:global(.body--dark) .block-header {
  color: #ffffff;
}

.block-header {
  color: #000000;
}

/* Dimensions Row */
.dimensions-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
}

@media (max-width: 768px) {
  .dimensions-row {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .dimensions-row {
    grid-template-columns: 1fr 1fr;
  }
}

.dimension-field {
  width: 100%;
}

/* Field Inputs */
.field-input {
  width: 100%;
}

:global(.body--dark) .field-input :deep(.q-field__control) {
  color: #ffffff;
}

:global(.body--dark) .field-input :deep(input),
:global(.body--dark) .field-input :deep(.q-field__native) {
  background-color: #666666;
  color: #ffffff;
}

:global(.body--dark) .field-input :deep(.q-placeholder) {
  color: #999999;
}

/* Dialog Card */
.dialog-card {
  background-color: #ffffff;
}

:global(.body--dark) .dialog-card {
  background-color: #2a2a2a;
}

.dialog-title {
  font-weight: 600;
}

:global(.body--dark) .dialog-title {
  color: #ffffff;
}

.dialog-title {
  color: #000000;
}

:global(.body--dark) .dialog-card :deep(.q-field__control) {
  color: #ffffff;
}

:global(.body--dark) .dialog-card :deep(input),
:global(.body--dark) .dialog-card :deep(.q-field__native) {
  background-color: #555555;
  color: #ffffff;
}

:global(.body--dark) .dialog-card :deep(textarea) {
  background-color: #555555;
  color: #ffffff;
}

:global(.body--dark) .dialog-card :deep(.q-placeholder) {
  color: #999999;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .annexure-container {
    padding: 0.5rem;
  }

  .voltage-blocks-container {
    gap: 1rem;
  }

  .voltage-block {
    padding: 1rem;
  }

  .dimensions-row {
    gap: 0.5rem;
  }
}
</style>
