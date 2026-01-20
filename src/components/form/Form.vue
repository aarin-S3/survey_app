<template>
  <q-page class="page-container">
    <q-card class="form-card">
      <!-- Header -->
      <q-card-section class="card-header">
        <div class="text-h6" style="color: #e0e0e0;">Create Planned Outage</div>
      </q-card-section>

      <q-separator />

      <!-- Form Content -->
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
          <div class="row q-col-gutter-md q-mb-md">
            <!-- Left Column - Company Contact Info -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="section-card company-info-card">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">Company Contact Info</div>

                  <q-input
                    v-model="form.name"

                    placeholder="Name"
                    outlined
                    dark
                    :rules="[val => !!val || 'Name is required']"
                    class="q-mb-md input-name"
                  />

                  <q-input
                    v-model="form.phone"
                    placeholder="Phone"
                    type="tel"
                    outlined
                    dark
                    :rules="[val => !!val || 'Phone is required']"
                    class="q-mb-md input-phone"
                  />

                  <q-input
                    v-model="form.email"
                    placeholder="Email"
                    type="email"
                    outlined
                    dark
                    :rules="[
                      val => !!val || 'Email is required',
                      val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
                    ]"
                    class="q-mb-md input-email"
                  />

                  <q-input
                    v-model="form.serviceCenter"
                    placeholder="Service Center"
                    outlined
                    dark
                    class="q-mb-md input-service-center"
                  />

                  <q-input
                    v-model="form.mailingAddress"
                    placeholder="Mailing Address"
                    type="textarea"
                    outlined
                    dark
                    :rows="4"
                    class="input-mailing-address"
                  />
                </q-card-section>
              </q-card>

              <!-- Scheduled Event Date and Time -->
              <q-card flat bordered class="section-card scheduled-event-card q-mt-md">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">Scheduled Event Date and Time</div>

                  <q-input
                    v-model="form.scheduledStartTime"
                    label="Start Time"
                    outlined
                    dark
                    type="datetime-local"
                    :rules="[val => !!val || 'Start time is required']"
                    class="q-mb-md input-scheduled-start-time"
                  />

                  <q-input
                    v-model="form.scheduledEndTime"
                    label="End Time"
                    outlined
                    dark
                    type="datetime-local"
                    :rules="[val => !!val || 'End time is required']"
                    class="q-mb-md input-scheduled-end-time"
                  />

                  <q-input
                    v-model="form.scheduledDuration"
                    label="Duration (hh:mm)"
                    outlined
                    dark
                    placeholder="00:05"
                    mask="##:##"
                    class="input-scheduled-duration"
                  />
                </q-card-section>
              </q-card>
            </div>

            <!-- Right Column - Event Details -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="section-card event-details-card">
                <q-card-section>
                  <q-input
                    v-model="form.creationDate"
                    label="Creation Date"
                    outlined
                    dark
                    type="date"
                    :rules="[val => !!val || 'Creation date is required']"
                    class="q-mb-md input-creation-date"
                  />

                  <q-checkbox
                    v-model="form.overrideMailingDate"
                    label="Override Mailing Date"
                    dark
                    color="primary"
                    class="q-mb-md checkbox-override-mailing"
                  />

                  <q-input
                    v-model="form.workOrderId"
                    placeholder="Work Order ID"
                    outlined
                    dark
                    class="q-mb-md input-work-order-id"
                  />

                  <q-select
                    v-model="form.eventType1"
                    :options="eventTypes"
                    label="Event type"
                    outlined
                    dark
                    options-dark
                    class="q-mb-md select-event-type-1"
                  />

                  <q-select
                    v-model="form.plannedOutageType"
                    :options="plannedOutageTypes"
                    label="Outage Type"
                    outlined
                    dark
                    options-dark
                    :rules="[val => !!val || 'Planned outage type is required']"
                    class="select-planned-outage-type"
                  />
                </q-card-section>
              </q-card>

              <!-- Alternate Event Date and Time -->
              <q-card flat bordered class="section-card alternate-event-card q-mt-md">
                <q-card-section>
                  <div class="text-subtitle1 q-mb-sm">Alternate Event Date and Time</div>

                  <q-input
                    v-model="form.alternateStartTime"
                    label="Start Time"
                    outlined
                    dark
                    type="datetime-local"
                    class="q-mb-md input-alternate-start-time"
                  />

                  <q-input
                    v-model="form.alternateEndTime"
                    label="End Time"
                    outlined
                    dark
                    type="datetime-local"
                    class="q-mb-md input-alternate-end-time"
                  />

                  <q-input
                    v-model="form.alternateDuration"
                    label="Duration (hh:mm)"
                    outlined
                    dark
                    placeholder="00:05"
                    mask="##:##"
                    class="q-mb-md input-alternate-duration"
                  />

                  <q-checkbox
                    v-model="form.useAlternateDateTime"
                    label="Use Alternate Date and Time"
                    dark
                    color="primary"
                    class="checkbox-use-alternate"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Switching Order Section with Bullet Points -->
          <q-card flat bordered class="section-card switching-order-card q-mb-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-sm">Switching Order</div>
              <q-input
                ref="switchingOrderTextarea"
                v-model="form.switchingOrder"
                type="textarea"
                outlined
                dark
                :rows="3"
                class="list-textarea input-switching-order"
                placeholder="• Press Enter to add new points"
                @keydown="handleListKeydown($event, 'switchingOrder')"
              />
            </q-card-section>
          </q-card>

          <!-- Creator Comments Section -->
          <q-card flat bordered class="section-card creator-comments-card q-mb-md">
            <q-card-section>
              <div class="text-subtitle1 q-mb-sm">Creator Comments</div>
              <q-input
                v-model="form.creatorComments"
                type="textarea"
                outlined
                dark
                :rows="3"
                class="input-creator-comments"
              />
            </q-card-section>
          </q-card>

          <!-- Action Buttons -->
          <div class="row q-gutter-sm button-container">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              unelevated
              padding="4px 24px"
              class="btn-submit"
            />
            <q-btn
              label="Cancel"
              type="reset"
              color="grey-7"
              flat
              padding="4px 24px"
              class="btn-cancel"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const formRef = ref(null)
const switchingOrderTextarea = ref(null)

const form = ref({
  name: '',
  phone: '',
  email: '',
  serviceCenter: '',
  mailingAddress: '',
  scheduledStartTime: '',
  scheduledEndTime: '',
  scheduledDuration: '',
  creationDate: '',
  overrideMailingDate: false,
  workOrderId: '',
  eventType1: '',
  eventType2: '',
  plannedOutageType: '',
  alternateStartTime: '',
  alternateEndTime: '',
  alternateDuration: '',
  useAlternateDateTime: false,
  switchingOrder: '',
  creatorComments: ''
})

const eventTypes = [
  'Replacement',
  'Maintenance',
  'Emergency',
  'Upgrade'
]

const plannedOutageTypes = [
  'Planned Outage',
  'Unplanned Outage',
  'Unplanned Planned Outage',
  'Changed Planned Outage'
]

// Initialize with first bullet point
onMounted(() => {
  if (form.value.switchingOrder === '') {
    form.value.switchingOrder = '• '
  }
})

// Handle bullet point list in textarea
const handleListKeydown = (event, fieldName) => {
  if (event.key === 'Enter') {
    event.preventDefault()

    const textarea = event.target
    const cursorPos = textarea.selectionStart
    const textBeforeCursor = form.value[fieldName].substring(0, cursorPos)
    const textAfterCursor = form.value[fieldName].substring(cursorPos)

    const lines = textBeforeCursor.split('\n')
    const currentLine = lines[lines.length - 1]

    const bulletMatch = currentLine.match(/^([ \t]*[•\-\*])\s*(.*)$/)
    const numberedMatch = currentLine.match(/^([ \t]*\d+\.)\s*(.*)$/)

    if (bulletMatch) {
      const [, bullet, content] = bulletMatch

      if (content.trim() === '') {
        const newText = textBeforeCursor.substring(0, textBeforeCursor.lastIndexOf('\n')) + textAfterCursor
        form.value[fieldName] = newText

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = textBeforeCursor.lastIndexOf('\n')
        }, 0)
      } else {
        const newText = textBeforeCursor + '\n' + bullet + ' ' + textAfterCursor
        form.value[fieldName] = newText

        setTimeout(() => {
          const newCursorPos = cursorPos + bullet.length + 2
          textarea.selectionStart = textarea.selectionEnd = newCursorPos
        }, 0)
      }
    } else if (numberedMatch) {
      const [, numberedBullet, content] = numberedMatch

      if (content.trim() === '') {
        const newText = textBeforeCursor.substring(0, textBeforeCursor.lastIndexOf('\n')) + textAfterCursor
        form.value[fieldName] = newText

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = textBeforeCursor.lastIndexOf('\n')
        }, 0)
      } else {
        const currentNum = parseInt(numberedBullet.match(/\d+/)[0])
        const nextNum = currentNum + 1
        const indent = numberedBullet.match(/^[ \t]*/)[0]
        const newBullet = `${indent}${nextNum}.`

        const newText = textBeforeCursor + '\n' + newBullet + ' ' + textAfterCursor
        form.value[fieldName] = newText

        setTimeout(() => {
          const newCursorPos = cursorPos + newBullet.length + 2
          textarea.selectionStart = textarea.selectionEnd = newCursorPos
        }, 0)
      }
    } else {
      const newText = textBeforeCursor + '\n• ' + textAfterCursor
      form.value[fieldName] = newText

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 3
      }, 0)
    }
  } else if (event.key === 'Backspace') {
    const textarea = event.target
    const cursorPos = textarea.selectionStart
    const textBeforeCursor = form.value[fieldName].substring(0, cursorPos)

    const lines = textBeforeCursor.split('\n')
    const currentLine = lines[lines.length - 1]

    if (currentLine.match(/^[•\-\*]\s*$/) || currentLine.match(/^\d+\.\s*$/)) {
      event.preventDefault()

      const newText = textBeforeCursor.substring(0, textBeforeCursor.lastIndexOf('\n') + 1) +
                      form.value[fieldName].substring(cursorPos)
      form.value[fieldName] = newText

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = textBeforeCursor.lastIndexOf('\n') + 1
      }, 0)
    }
  }
}

const onSubmit = () => {
  console.log('Form submitted:', form.value)
  $q.notify({
    type: 'positive',
    message: 'Planned outage created successfully!',
    position: 'top'
  })
}

const onReset = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to cancel? All changes will be lost.',
    cancel: true,
    persistent: true,
    dark: true
  }).onOk(() => {
    form.value = {
      name: '',
      phone: '',
      email: '',
      serviceCenter: '',
      mailingAddress: '',
      scheduledStartTime: '',
      scheduledEndTime: '',
      scheduledDuration: '',
      creationDate: '',
      overrideMailingDate: false,
      workOrderId: '',
      eventType1: '',
      eventType2: '',
      plannedOutageType: '',
      alternateStartTime: '',
      alternateEndTime: '',
      alternateDuration: '',
      useAlternateDateTime: false,
      switchingOrder: '• ',
      creatorComments: ''
    }
    formRef.value.resetValidation()
  })
}
</script>

<style scoped>
/* ============================================
   BASE STYLES
   ============================================ */
.page-container {
  padding: 24px;
  background-color: #1a1a1a;
  min-height: 90vh !important;
  padding-bottom: 70px;
  box-shadow: none;
}

.form-card {
  max-width: 1400px;
  margin: 0 auto;
  background: #1a1a1a;
  box-shadow: none;
}

.card-header {
  padding: 12px 16px;
}

.text-subtitle1 {
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
}

/* ============================================
   SECTION CARD STYLES
   ============================================ */
.section-card {
  background: #1a1a1a;
  border: 1px solid #555;
}

/* Customize individual section cards */
.company-info-card {
  /* Add custom styles for company info card */
}

.scheduled-event-card {
  /* Add custom styles for scheduled event card */
}

.event-details-card {
  /* Add custom styles for event details card */
}

.alternate-event-card {
  /* Add custom styles for alternate event card */
}

.switching-order-card {
  /* Add custom styles for switching order card */
}

.creator-comments-card {
  /* Add custom styles for creator comments card */
}

/* ============================================
   INPUT FIELD STYLES - COMPANY INFO
   ============================================ */

/* Example: Customize Name input */
.input-name :deep(.q-field__control) {
  /* background-color: #2a2a2a; */
  height: 40px !important;
}

.input-name :deep(.q-field__label) {
  /* color: #90caf9; */

}

/* Customize Phone input */
.input-phone :deep(.q-field__control) {
  /* Add custom styles */
  height: 40px !important;
}

/* Customize Email input */
.input-email :deep(.q-field__control) {
  /* Add custom styles */
  height: 40px !important;
}

.input-email :deep(.q-field__native) {
  /* font-weight: 500; */
}

/* Customize Service Center input */
.input-service-center :deep(.q-field__control) {
  /* Add custom styles */
  height: 40px !important;
}

/* Customize Mailing Address textarea */
.input-mailing-address :deep(.q-field__control) {
  /* Add custom styles */
}

.input-mailing-address :deep(textarea) {
  /* line-height: 1.8; */
}

/* ============================================
   INPUT FIELD STYLES - SCHEDULED EVENT
   ============================================ */

/* Customize Scheduled Start Time */
.input-scheduled-start-time :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Scheduled End Time */
.input-scheduled-end-time :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Scheduled Duration */
.input-scheduled-duration :deep(.q-field__control) {
  /* Add custom styles */
}

/* ============================================
   INPUT FIELD STYLES - EVENT DETAILS
   ============================================ */

/* Customize Creation Date */
.input-creation-date :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Override Mailing Date checkbox */
.checkbox-override-mailing :deep(.q-checkbox__label) {
  font-size: 12px;
}

:deep(.q-checkbox){
  margin-bottom: 1px;
  margin-top: -10px;
  padding-bottom: 0px !important;
}
:deep(.q-checkbox__inner){
  height: 36px !important;
}
/* Customize Work Order ID */
.input-work-order-id :deep(.q-field__control) {
  /* Add custom styles */
  height: 40px !important;
}

.input-work-order-id :deep(.q-field__native) {
  /* text-transform: uppercase; */
}

/* Customize Event Type 1 select */
.select-event-type-1 :deep(.q-field__control) {
  /* height: 40px !important;
  min-height: 40px !important; */

}

.select-event-type-1 :deep(.q-field__native) {
  /* min-height: 40px !important; */
}

/* Customize Planned Outage Type select */
.select-planned-outage-type :deep(.q-field__control) {
  /* height: 40px !important;
  min-height: 40px !important; */
}

.select-planned-outage-type :deep(.q-field__native) {
  /* min-height: 40px !important; */
}

.select-planned-outage-type :deep(.q-field__label) {
  /* font-weight: 600; */
}

/* ============================================
   INPUT FIELD STYLES - ALTERNATE EVENT
   ============================================ */

/* Customize Alternate Start Time */
.input-alternate-start-time :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Alternate End Time */
.input-alternate-end-time :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Alternate Duration */
.input-alternate-duration :deep(.q-field__control) {
  /* Add custom styles */
}

/* Customize Use Alternate checkbox */
.checkbox-use-alternate :deep(.q-checkbox__label) {
  /* Add custom styles */
  font-size: 12px;
}

:deep(.q-checkbox__inner){
  font-size: 40px;
    width: 0.9em;
    min-width: 0.5em;
    height: 1em;
    outline: 0;
    border-radius: 50%;
    color: grey;
}
:deep(.q-checkbox__svg){
  color: black;
}
/* ============================================
   INPUT FIELD STYLES - OTHER
   ============================================ */

/* Customize Switching Order textarea */
.input-switching-order :deep(.q-field__control) {
  /* Add custom styles */
}

.input-switching-order :deep(textarea) {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Customize Creator Comments textarea */
.input-creator-comments :deep(.q-field__control) {
  /* Add custom styles */
}

.input-creator-comments :deep(textarea) {
  /* min-height: 80px; */
}

/* ============================================
   BUTTON STYLES
   ============================================ */

.button-container {
  /* Add custom styles for button container */
}

/* Customize Submit button */
.btn-submit {
  /* min-width: 120px; */
}

/* Customize Cancel button */
.btn-cancel {
  /* min-width: 120px; */
}

/* ============================================
   GLOBAL QUASAR OVERRIDES
   ============================================ */

/* Override Quasar dark mode inputs */
:deep(.q-field--dark .q-field__control) {
  background-color: #1a1a1a;
  color: #e0e0e0;
  /* height: 40px !important; */
}

:deep(.q-field--dark .q-field__native),
:deep(.q-field--dark .q-field__label) {
  color: #e0e0e0;
}

:deep(.q-field--outlined.q-field--dark .q-field__control:before) {
  border-color: #555;
}

:deep(.q-field--outlined.q-field--dark .q-field__control:hover:before) {
  border-color: #777;
}

:deep(.q-field--outlined.q-field--dark.q-field--focused .q-field__control:before) {
  border-color: #64b5f6;
}

/* ============================================
   CALENDAR PICKER DARK THEME - ENHANCED
   ============================================ */

/* Increase size and change color of calendar icon */
:deep(input[type="date"]::-webkit-calendar-picker-indicator),
:deep(input[type="datetime-local"]::-webkit-calendar-picker-indicator) {
  /* Size control */
  width: 20px !important;           /* Adjust size (default is ~16px) */
  height: 20px !important;          /* Adjust size (default is ~16px) */

  /* Color control - choose one method below */

  /* Method 1: Simple invert for white icon */
  filter: invert(#e0e0e0);

  /* Method 2: Custom color using filter (uncomment to use) */
  /* filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(186deg) brightness(118%) contrast(119%); */ /* Blue color */
  /* filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%); */  /* Red color */
  /* filter: invert(64%) sepia(98%) saturate(459%) hue-rotate(2deg) brightness(102%) contrast(101%); */    /* Yellow/Orange */

  /* Other styles */
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
  margin-right: 8px;                /* Add spacing from edge */
  padding: 2px;                     /* Add padding around icon */
}

/* Hover effect */
:deep(input[type="date"]::-webkit-calendar-picker-indicator:hover),
:deep(input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover) {
  opacity: 1;
  transform: scale(1.1);            /* Slightly enlarge on hover */
}

/* Keep dark color scheme for picker popup */
:deep(input[type="date"]),
:deep(input[type="datetime-local"]) {
  color-scheme: dark;
}

/* Ensure text color remains visible */
:deep(input[type="date"]::-webkit-datetime-edit),
:deep(input[type="datetime-local"]::-webkit-datetime-edit) {
  color: #e0e0e0;
}

:deep(input[type="date"]::-webkit-datetime-edit-fields-wrapper),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper) {
  color: #e0e0e0;
}

:deep(input[type="date"]::-webkit-datetime-edit-text),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-text) {
  color: #999;
  padding: 0 0.3em;
}

:deep(input[type="date"]::-webkit-datetime-edit-month-field),
:deep(input[type="date"]::-webkit-datetime-edit-day-field),
:deep(input[type="date"]::-webkit-datetime-edit-year-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-month-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-day-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-year-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-hour-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-minute-field),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-ampm-field) {
  color: #e0e0e0;
}


.q-mb-md{
  margin-bottom: 8px !important;
  padding-bottom: 8px !important;
}

:deep(.q-field__bottom) {
    font-size: 11px !important;
    /* min-height: 10px !important; */
    /* line-height: 1 !important; */
    color: #EE3158;
    padding: 2px !important;
    backface-visibility: hidden;
}
:deep(.q-field__bottom--animated){
  padding: 2px !important;
}

:deep(.q-field__marginal ){
  height: auto;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */

@media (max-width: 600px) {
  .page-container {
    padding: 12px;
  }
}
</style>