<template>
  <div class="q-pa-sm border-bottom" style="background: none !important;">
    <q-input 
      dense 
      outlined 
      placeholder="Search Hierarchy..." 
      v-model="searchQuery"
      :class="{ 'my-dark-input': $q.dark.isActive, 'my-light-input': !$q.dark.isActive }"
    >
      <template v-slot:append>
        <q-icon name="search" style="font-size: 18px;" :color="$q.dark.isActive ? 'white' : 'grey-8'" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// 1. Define Props to accept the v-model from parent
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// 2. Define Emits to send changes back to parent
const emit = defineEmits(['update:modelValue'])

// 3. Create a computed property to handle the two-way binding
const searchQuery = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>

<style scoped>
/* LIGHT MODE STYLES */
.my-light-input :deep(.q-field__native) {
  color: #424242 !important;
}

.my-light-input :deep(.q-field__native)::placeholder {
  color: #424242 !important;
  opacity: 1;
}

/* DARK MODE STYLES */
.my-dark-input :deep(.q-field__native) {
  color: #ffffff !important;
}

.my-dark-input :deep(.q-field__native)::placeholder {
  color: #cccccc !important;
  opacity: 1;
}

/* Your existing overrides */
:deep(.q-field--dense) .q-field__control {
  background: transparent !important;
  border-radius: 5px !important;
}
</style>