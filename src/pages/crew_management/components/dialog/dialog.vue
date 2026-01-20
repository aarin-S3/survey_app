<template>
  <q-dialog>
    <div class="form-wrapper column no-wrap" style="max-height: 500px; overflow: hidden;">

      <div class="col-auto page-header row justify-between items-center">
        <div class="text-h5 text-grey-5" style="font-weight: 500; font-size: 1.2rem; ">
          Create Planned Outage
        </div>
        <q-btn icon="close" flat round dense text-color="grey-5" v-close-popup />
      </div>

      <q-form @submit="onSubmit" ref="formRef" class="col column no-wrap" style="min-height: 0;">
        
        <div class="col scroll form-scroll-area">
          
          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Company Contact Info</h2>
              <p class="section-description">Enter the company contact details</p>
            </div>

            <div class="form-content">
              <div class="field-row">
                <div class="field-item full-width">
                  <label class="field-label">Name</label>
                  <q-input v-model="form.name" placeholder="Enter name" outlined dark
                    :rules="[val => !!val || 'Name is required']" class="input-field" />
                </div>
              </div>

              <div class="field-row two-columns">
                <div class="field-item">
                  <label class="field-label">Phone</label>
                  <q-input v-model="form.phone" placeholder="Enter phone" type="tel" outlined dark
                    :rules="[val => !!val || 'Phone is required']" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Email</label>
                  <q-input v-model="form.email" placeholder="Enter email" type="email" outlined dark :rules="[
                      val => !!val || 'Email is required',
                      val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
                    ]" class="input-field" />
                </div>
              </div>

              <div class="field-row">
                <div class="field-item full-width">
                  <label class="field-label">Service Center</label>
                  <q-input v-model="form.serviceCenter" placeholder="Enter service center" outlined dark
                    class="input-field" />
                </div>
              </div>

              <div class="field-row" style="height: 80px !important;">
                <div class="field-item full-width" style="height: 80px !important;">
                  <label class="field-label">Mailing Address</label>
                  <q-input v-model="form.mailingAddress" placeholder="Enter mailing address" type="textarea" outlined
                    dark :rows="3" class="input-field" style="height: 80px !important;" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Scheduled Event Date and Time</h2>
              <p class="section-description">Define the scheduled event timing</p>
            </div>

            <div class="form-content">
              <div class="field-row three-columns">
                <div class="field-item">
                  <label class="field-label">Start Time</label>
                  <q-input v-model="form.scheduledStartTime" outlined dark type="datetime-local"
                    :rules="[val => !!val || 'Start time is required']" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">End Time</label>
                  <q-input v-model="form.scheduledEndTime" outlined dark type="datetime-local"
                    :rules="[val => !!val || 'End time is required']" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Duration (hh:mm)</label>
                  <q-input v-model="form.scheduledDuration" placeholder="00:05" outlined dark mask="##:##"
                    class="input-field" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Event Details</h2>
              <p class="section-description">Configure event type and information</p>
            </div>

            <div class="form-content">
              <div class="field-row four-columns">
                <div class="field-item">
                  <label class="field-label">Creation Date</label>
                  <q-input v-model="form.creationDate" outlined dark type="date"
                    :rules="[val => !!val || 'Creation date is required']" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Work Order ID</label>
                  <q-input v-model="form.workOrderId" placeholder="Enter ID" outlined dark class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Event Type</label>
                  <q-select v-model="form.eventType1" :options="eventTypes" placeholder="Choose" outlined dark
                    options-dark class="select-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Outage Type</label>
                  <q-select v-model="form.plannedOutageType" :options="plannedOutageTypes" placeholder="Choose" outlined
                    dark options-dark :rules="[val => !!val || 'Outage type is required']" class="select-field" />
                </div>
              </div>

              <div class="field-row">
                <div class="field-item">
                  <q-checkbox v-model="form.overrideMailingDate" label="Override Mailing Date" dark dense
                    class="checkbox-field" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Alternate Event Date and Time</h2>
              <p class="section-description">Optional alternate scheduling</p>
            </div>

            <div class="form-content">
              <div class="field-row three-columns">
                <div class="field-item">
                  <label class="field-label">Start Time</label>
                  <q-input v-model="form.alternateStartTime" outlined dark type="datetime-local" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">End Time</label>
                  <q-input v-model="form.alternateEndTime" outlined dark type="datetime-local" class="input-field" />
                </div>

                <div class="field-item">
                  <label class="field-label">Duration (hh:mm)</label>
                  <q-input v-model="form.alternateDuration" placeholder="00:05" outlined dark mask="##:##"
                    class="input-field" />
                </div>
              </div>

              <div class="field-row">
                <div class="field-item">
                  <q-checkbox v-model="form.useAlternateDateTime" label="Use Alternate Date and Time" dark dense
                    class="checkbox-field" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Switching Order</h2>
              <p class="section-description">Define the switching sequence steps</p>
            </div>

            <div class="form-content">
              <div class="field-row">
                <div class="field-item full-width">
                  <q-input ref="switchingOrderTextarea" v-model="form.switchingOrder" type="textarea" outlined dark
                    :rows="4" placeholder="• Press Enter to add new points"
                    @keydown="handleListKeydown($event, 'switchingOrder')" class="input-field" />
                </div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="section-header">
              <h2 class="section-title">Creator Comments</h2>
              <p class="section-description">Add any additional notes or comments</p>
            </div>

            <div class="form-content">
              <div class="field-row">
                <div class="field-item full-width">
                  <q-input v-model="form.creatorComments" type="textarea" outlined dark :rows="4"
                    placeholder="Enter comments..." class="input-field" />
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="col-auto form-actions-footer">
          <div class="form-actions-content">
            <q-btn label="Save Outage" type="submit" unelevated no-caps icon-right="add" class="btn-primary" />
            <q-btn label="Back" flat no-caps class="btn-secondary" v-close-popup />
          </div>
        </div>

      </q-form>
    </div>
  </q-dialog>
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

onMounted(() => {
  if (form.value.switchingOrder === '') {
    form.value.switchingOrder = '• '
  }
})

const handleListKeydown = (event, fieldName) => {
  if (event.key === 'Enter') {
    event.preventDefault()

    const textarea = event.target
    const cursorPos = textarea.selectionStart
    const textBeforeCursor = form.value[fieldName].substring(0, cursorPos)
    const textAfterCursor = form.value[fieldName].substring(cursorPos)

    const lines = textBeforeCursor.split('\n')
    const currentLine = lines[lines.length - 1]

    const bulletMatch = currentLine.match(/^([ \t]*[â€¢\-*])\s*(.*)$/)

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

    if (currentLine.match(/^[â€¢\-\*]\s*$/)) {
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
</script>

<style scoped>
/* ============================================
   FORM WRAPPER & LAYOUT
   ============================================ */
.form-wrapper {
  background-color: #1c1c1c;
  max-width: 50vw;
  min-width: 10vw;
  width: 100%;
  /* Padding removed here and applied to children to handle scrolling edge-to-edge */
  padding: 0; 
  margin: 0 auto;
}

/* ============================================
   HEADER
   ============================================ */
.page-header {
  background-color: #1c1c1c; /* Matches body background */
  padding: 3px 16px;
  border-bottom: 1px solid #2d2d31;
  z-index: 10; /* Ensures it stays above scroll content */
}

/* ============================================
   SCROLLABLE AREA
   ============================================ */
.form-scroll-area {
  padding: 24px 32px 24px; 
  /* Padding moved inside the scroll area */
  padding-top: 3px;
  padding-left: 16px;
  padding-right: 16px;
}

/* ============================================
   FOOTER (Sticky Bottom)
   ============================================ */
.form-actions-footer {
  background-color: #1c1c1c; /* Matches Header/Body */
  border-top: 1px solid #2d2d31;
  /* padding: 16px 32px 24px; */
  padding: 5px;
  z-index: 10;
}

.form-actions-content {
  display: flex;
  gap: 2px;
  justify-content: end;
  /* Adjusted to align with form fields on the right side */
  /* align-items: end; */
}

/* ============================================
   FORM SECTIONS
   ============================================ */
.form-section {
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1px;
  align-items: start;
}

.form-section:last-of-type {
  margin-bottom: 0; /* Remove bottom margin of last element */
}

/* ============================================
   SECTION HEADER (LEFT SIDE)
   ============================================ */
.section-header {
  padding-top: 4px;
  /* Sticky removed here because the whole header row is now sticky via flexbox structure */
  position: relative; 
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #90a4ae;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.section-description {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* ============================================
   FORM CONTENT (RIGHT SIDE)
   ============================================ */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ============================================
   FIELD ROWS
   ============================================ */
.field-row {
  display: grid;
  gap: 4px;
  grid-template-columns: 1fr;
}

.field-row.two-columns {
  grid-template-columns: repeat(2, 1fr);
}

.field-row.three-columns {
  grid-template-columns: repeat(3, 1fr);
}

.field-row.four-columns {
  grid-template-columns: repeat(4, 1fr);
}

/* ============================================
   FIELD ITEMS
   ============================================ */
.field-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.field-item.full-width {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 0.3px;
}

/* ============================================
   INPUT FIELD STYLING
   ============================================ */
:deep(.q-field__marginal) {
  height: auto;
}

.input-field :deep(.q-field__control),
.select-field :deep(.q-field__control) {
  background-color: #0f0f11;
  border-radius: 2px;
  min-height: 30px !important;
}

.input-field :deep(.q-field__control:not(:has(textarea))),
.select-field :deep(.q-field__control) {
  height: 30px !important;
}

.input-field :deep(.q-field__native),
.select-field :deep(.q-field__native) {
  color: #e0e0e0;
  font-size: 12px;
}

.q-field--auto-height .q-field__native {
  height: auto !important;
}

.input-field :deep(textarea.q-field__native) {
  padding: 8px 0px;
  height: 70px !important;
  line-height: 1.5;
  resize: vertical;
}

.input-field :deep(.q-field__control):before,
.select-field :deep(.q-field__control):before {
  border: 1px solid #2d2d31;
  transition: border-color 0.2s ease;
}

.input-field :deep(.q-field__control):hover:before,
.select-field :deep(.q-field__control):hover:before {
  border-color: #3d3d41;
}

.input-field :deep(.q-field--focused .q-field__control):before,
.select-field :deep(.q-field--focused .q-field__control):before {
  border-color: #5a9fd4;
  border-width: 1px;
  box-shadow: 0 0 0 1px rgba(90, 159, 212, 0.2);
}

.input-field :deep(.q-field__native)::placeholder {
  color: #52525b;
  font-size: 13px;
}

.input-field :deep(.q-field__label),
.select-field :deep(.q-field__label) {
  color: #9ca3af;
  font-size: 13px;
}

/* ============================================
   SELECT DROPDOWN
   ============================================ */
.select-field :deep(.q-field__append) {
  color: #6b7280;
  padding-right: 8px;
}

.select-field :deep(.q-icon) {
  font-size: 20px;
}

/* ============================================
   CHECKBOX
   ============================================ */
.checkbox-field {
  margin-top: 4px;
  align-items: center;
}

.checkbox-field :deep(.q-checkbox__label) {
  font-size: 13px;
  color: #f4f5f7;
  padding-left: 8px;
  user-select: none;
}

.checkbox-field :deep(.q-checkbox__inner) {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  color: #2d2d31;
}

.checkbox-field :deep(.q-checkbox__svg) {
  color: #ffffff;
}

.checkbox-field :deep(.q-checkbox__bg) {
  border: 1px solid #2d2d31;
  border-radius: 2px;
}

/* ============================================
   ERROR STYLING
   ============================================ */
:deep(.q-field--error .q-field__control):before {
  border-color: #f87171 !important;
}

:deep(.q-field--error .q-field__label) {
  color: #f87171;
}

:deep(.q-field__bottom) {
  font-size: 11px;
  color: #f87171;
  padding: 0px 0 0;
  min-height: 16px;
  line-height: 1.3;
}

:deep(.q-field__messages) {
  line-height: 1.3;
}

/* ============================================
   CALENDAR ICON
   ============================================ */
:deep(input[type="date"]::-webkit-calendar-picker-indicator),
:deep(input[type="datetime-local"]::-webkit-calendar-picker-indicator) {
  filter: invert(0.6);
  width: 14px;
  height: 14px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

:deep(input[type="date"]::-webkit-calendar-picker-indicator):hover,
:deep(input[type="datetime-local"]::-webkit-calendar-picker-indicator):hover {
  opacity: 1;
}

:deep(input[type="date"]),
:deep(input[type="datetime-local"]) {
  color-scheme: dark;
}

:deep(input[type="date"]::-webkit-datetime-edit),
:deep(input[type="datetime-local"]::-webkit-datetime-edit) {
  color: #f4f5f7;
}

:deep(input[type="date"]::-webkit-datetime-edit-fields-wrapper),
:deep(input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper) {
  color: #f4f5f7;
}

/* ============================================
   ACTION BUTTONS
   ============================================ */
.btn-primary {
  background-color: #3871dc;
  color: #ffffff;
  height: 24px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 400;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #4a7fde;
}

.btn-primary :deep(.q-icon) {
  font-size: 14px;
  margin-left: 4px;
}

.btn-secondary {
  color: #9ca3af;
  height: 24px;
  padding: 0 10px;
  font-size: 16px !important;
  font-weight: 500;
  border-radius: 2px;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #f4f5f7;
}

:deep(.q-btn) {
  font-size: 10px !important;
}

/* ============================================
   SCROLLBAR STYLING
   ============================================ */
:deep(::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: #18181b;
}

:deep(::-webkit-scrollbar-thumb) {
  background: #2d2d31;
  border-radius: 4px;
}

:deep(::-webkit-scrollbar-thumb):hover {
  background: #3d3d41;
}

/* ============================================
   RESPONSIVE DESIGN
   ============================================ */
@media (max-width: 1024px) {
  .form-section {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-actions-content {
    margin-left: 0;
  }

  .field-row.four-columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-wrapper {
    /* padding: 24px 16px;  REMOVED */
  }

  .field-row.two-columns,
  .field-row.three-columns,
  .field-row.four-columns {
    grid-template-columns: 1fr;
  }

  .form-actions-content {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 12px;
  }

  .form-scroll-area {
     padding: 16px 12px;
  }

  .form-actions-footer {
     padding: 16px 12px;
  }
}

/* ============================================
   UTILITY CLASSES
   ============================================ */
:deep(.q-field--with-bottom) {
  padding-bottom: 0px !important;
}
</style>