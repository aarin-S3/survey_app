<template>
  <div class="adms-container q-pa-md">
    <!-- Page Title -->
    <div class="text-h6 q-mb-lg page-title">ADM / ACDB / DCDB Details</div>

    <!-- Section 1: ACDB Details (230V AC) -->
    <q-card class="details-card q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">ACDB Details (230V AC)</div>

        <!-- MCB 1 -->
        <div class="mcb-block q-mb-md">
          <div class="mcb-header">MCB 1</div>
          <div class="q-gutter-y-md">
            <q-select v-model="acdbData.mcb1.poleTyping" :options="poleTypingOptions" label="Pole Typing" outlined dense
              class="field-input" behavior="menu" />
            <q-input v-model.number="acdbData.mcb1.rating" label="Rating (A)" type="number" outlined dense
              class="field-input" />
          </div>
        </div>

        <!-- MCB 2 -->
        <div class="mcb-block q-mb-md">
          <div class="mcb-header">MCB 2</div>
          <div class="q-gutter-y-md">
            <q-select v-model="acdbData.mcb2.poleTyping" :options="poleTypingOptions" label="Pole Typing" outlined dense
              class="field-input" behavior="menu" />
            <q-input v-model.number="acdbData.mcb2.rating" label="Rating (A)" type="number" outlined dense
              class="field-input" />
          </div>
        </div>

        <!-- Battery Status -->
        <div class="q-gutter-y-md">
          <q-select v-model="acdbData.batteryStatus" :options="batteryStatusOptions" label="Battery Status" outlined
            dense class="field-input" behavior="menu" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Section 2: DCDB Details (230V AC) -->
    <q-card class="details-card q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">DCDB Details (230V AC)</div>

        <!-- MCB 1 -->
        <div class="mcb-block q-mb-md">
          <div class="mcb-header">MCB 1</div>
          <div class="q-gutter-y-md">
            <q-select v-model="dcdbData.mcb1.poleTyping" :options="poleTypingOptions" label="Pole Typing" outlined dense
              class="field-input" behavior="menu" />
            <q-input v-model.number="dcdbData.mcb1.rating" label="Rating (A)" type="number" outlined dense
              class="field-input" />
          </div>
        </div>

        <!-- MCB 2 -->
        <div class="mcb-block q-mb-md">
          <div class="mcb-header">MCB 2</div>
          <div class="q-gutter-y-md">
            <q-select v-model="dcdbData.mcb2.poleTyping" :options="poleTypingOptions" label="Pole Typing" outlined dense
              class="field-input" behavior="menu" />
            <q-input v-model.number="dcdbData.mcb2.rating" label="Rating (A)" type="number" outlined dense
              class="field-input" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Section 3: Network Metrics -->
    <q-card class="details-card q-mb-lg">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">METRICS</div>

        <!-- Provider Tabs -->
        <div class="q-mb-md">
          <q-btn-toggle v-model="activeProvider" :options="providerOptions" rounded unelevated
            class="provider-toggle" />
        </div>

        <!-- Metrics Fields for Selected Provider -->
        <div class="q-gutter-y-md">
          <q-input v-model.number="networkMetrics[activeProvider].dlSpeed" label="DL Speed (Mbps)" type="number"
            outlined dense class="field-input" />

          <q-input v-model.number="networkMetrics[activeProvider].ulSpeed" label="UL Speed (Mbps)" type="number"
            outlined dense class="field-input" />

          <q-input v-model.number="networkMetrics[activeProvider].signalStrength" label="Network signal strength in dBm"
            type="number" outlined dense class="field-input" />

          <q-input v-model="networkMetrics[activeProvider].remarks" label="Remarks" type="textarea" outlined dense
            class="field-input" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Section 4: General Comments -->
    <q-card class="details-card">
      <q-card-section>
        <div class="text-subtitle1 q-mb-md text-weight-bold section-title">General Comments</div>

        <q-input v-model="generalComments" type="textarea" autogrow outlined dense placeholder="Enter general observations…"
          class="field-input comments-field" />
      </q-card-section>
    </q-card>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Options
const poleTypingOptions = ['Single Pole', 'Double Pole']
const batteryStatusOptions = ['Healthy', 'Not Healthy']
const providerOptions = [
  { label: 'AIRTEL', value: 'airtel' },
  { label: 'JIO', value: 'jio' }
]

// ACDB Data
const acdbData = reactive({
  mcb1: { poleTyping: null, rating: null },
  mcb2: { poleTyping: null, rating: null },
  batteryStatus: null
})

// DCDB Data
const dcdbData = reactive({
  mcb1: { poleTyping: null, rating: null },
  mcb2: { poleTyping: null, rating: null }
})

// Network Metrics
const activeProvider = ref('airtel')
const networkMetrics = reactive({
  airtel: { dlSpeed: null, ulSpeed: null, signalStrength: null, remarks: '' },
  jio: { dlSpeed: null, ulSpeed: null, signalStrength: null, remarks: '' }
})

// General Comments
const generalComments = ref('')
</script>

<style scoped>
.adms-container {
  max-width: 100%;
  min-height: 100vh;
  padding: 1rem;
}

/* Light mode */
.adms-container {
  background-color: rgb(255, 255, 255);
}

/* Dark mode */
:global(.body--dark) .adms-container {
  background-color: #000000;
}

.page-title {
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

:global(.body--dark) .page-title {
  color: #ffffff;
}

.page-title {
  color: #000000;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
}

:global(.body--dark) .section-title {
  color: #ffffff;
}

.section-title {
  color: #000000;
}

/* Details Card */
.details-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: #2e2d2d 4px solid;
}

:global(.body--dark) .details-card {
  background-color: #333333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
/* MCB Block */
.mcb-block {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid #2e2d2d;
  border-right: 4px solid #2e2d2d;
}

:global(.body--dark) .mcb-block {
  background-color: #555555;
  border-left-color: #90caf9;
}

.mcb-header {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

:global(.body--dark) .mcb-header {
  color: #ffffff;
}

.mcb-header {
  color: #000000;
}

/* Field Inputs */
.field-input {
  width: 100%;
}

:global(.body--dark) .field-input :deep(.q-field__control) {
  color: #ffffff;
}

:global(.body--dark) .field-input :deep(input),
:global(.body--dark) .field-input :deep(.q-field__native),
:global(.body--dark) .field-input :deep(textarea) {
  background-color: #666666;
  color: #ffffff;
}

:global(.body--dark) .field-input :deep(.q-placeholder) {
  color: #999999;
}

/* Comments Field */
.comments-field {
  min-height: 150px;
  width: 100%;
}

:global(.body--dark) .comments-field :deep(textarea) {
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

/* Provider Toggle */
.provider-toggle {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

:global(.body--dark) .provider-toggle :deep(.q-btn) {
  color: #ffffff;
}

:global(.body--dark) .provider-toggle :deep(.q-btn.active) {
  background-color: #1976d2;
  color: #ffffff;
}

:global(.body--dark) .provider-toggle :deep(.q-btn) {
  border-color: #666666;
}

/* Responsive Design */
@media (max-width: 600px) {
  .adms-container {
    padding: 0.5rem;
  }

  .page-title {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .mcb-block {
    padding: 0.75rem;
  }

  .comments-field {
    min-height: 120px;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .details-card {
    margin-bottom: 1.5rem;
  }
}
</style>
