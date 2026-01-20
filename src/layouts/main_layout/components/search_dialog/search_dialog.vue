<template>
  <q-dialog v-model="isOpen" position="top" transition-show="scale" transition-hide="scale" transition-duration="50"
    :style="{ marginTop: '60px' }">
    <q-card :style="{
      width: '80vw',
      maxWidth: '85vw',
      minHeight: $q.screen.lt.md ? '75vh' : '87vh',
      background: $q.dark.isActive ? 'rgba(24, 27, 31, 0.98)' : '#ffff',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'none',
      marginTop: '5px'
    }">
      <q-card-section
        :style="{ padding: '0px', borderBottom: '1px solid rgba(204, 204, 220, 0.1) !important', backgroundColor: `${$q.dark.isActive ? '#1a1a1a' : '#ffffff'}` }">

        <q-input class="searchInput" ref="modalSearchInput" v-model="internalQuery" dense filled autofocus
          placeholder="Search or jump to..." @keyup.esc="isOpen = false" style="height: 30px !important; font-size: 12px ;">
          <template v-slot:prepend>
            <q-icon name="search" :style="{
              color: $q.dark.isActive ? 'rgba(204, 204, 220, 0.7)' : '#90A4AE',
              fontSize: '20px'
            }" />
          </template>

          <template v-slot:append>
            <q-icon v-if="internalQuery" name="close" @click="internalQuery = ''" :style="{
              color: 'rgba(204, 204, 220, 0.7)',
              cursor: 'pointer'
            }" />
          </template>
        </q-input>
      </q-card-section>

      <div :style="{
        paddingTop: '8px',
        paddingLeft: '10px',
        fontSize: '11px',
        fontWeight: '600',
        color: $q.dark.isActive ? 'rgba(204, 204, 220, 0.5)' : '#90a4ae',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }">
        Pages
      </div>

      <q-scroll-area :style="{ flex: 1 }"
        :thumb-style="{ backgroundColor: 'var(--scroll-bar-color)', width: '5px', borderRadius: '5px', opacity: 0.7 }">

        <q-list v-if="sidebarPages.length > 0" :style="{ padding: '0px 0px' }">
          <q-item v-for="(page, index) in sidebarPages" :key="index" clickable :active="selectedPage === page.value"
            @click="onPageClick(page)" :style="{
              padding: '12px 16px',
              height: '30px',
              margin: '2px 0',
              borderRadius: '4px',
              color: selectedPage === page.value ? `${$q.dark.isActive ? 'rgba(255, 255, 255, 0.95)' : '#455a64'}` : `${$q.dark.isActive ? '#90a4ae' : '#455a64'}`,
              background: selectedPage === page.value ? 'rgba(51, 133, 255, 0.15)' : 'transparent',
              borderLeft: selectedPage === page.value ? '3px solid rgba(51, 133, 255, 1)' : '3px solid transparent'
            }" class="sidebar-item">
            <q-item-section :style="{ fontSize: '14px' }">
              {{ page.label }}
            </q-item-section>
          </q-item>
        </q-list>

        <div v-else :style="{
          padding: '32px 16px',
          textAlign: 'center',
          color: 'rgba(204, 204, 220, 0.6)'
        }">
          <q-icon name="search_off" size="32px" :style="{ marginBottom: '12px', opacity: 0.4 }" />
          <div :style="{ fontSize: '13px', marginBottom: '6px' }">No pages found</div>
          <div :style="{ fontSize: '11px', color: 'rgba(204, 204, 220, 0.5)' }">
            Try a different search term
          </div>
        </div>
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SearchDialog',
  props: {
    // Controls if the modal is shown (v-model in parent)
    modelValue: {
      type: Boolean,
      required: true
    },
    // The current search text (v-model:modalSearchQuery in parent)
    modalSearchQuery: {
      type: String,
      default: ''
    },
    // The filtered list of pages provided by MainLayout
    sidebarPages: {
      type: Array,
      default: () => []
    },
    // Which page is currently highlighted
    selectedPage: {
      type: String,
      default: ''
    },
  },
  emits: ['update:modelValue', 'update:modalSearchQuery', 'page-selected'],
  computed: {
    // 1. Bridge for Dialog Open/Close
    isOpen: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
    // 2. Bridge for Search Input Text
    internalQuery: {
      get() {
        return this.modalSearchQuery
      },
      set(val) {
        this.$emit('update:modalSearchQuery', val)
      }
    }
  },
  methods: {
    // 3. Emit event when a user clicks a result
    onPageClick(page) {
      this.$emit('page-selected', page)
    }
  }
}
</script>

<style lang="scss" scoped>
/* Your existing styles preserved */
:root {
  --scroll-bar-color: #d1d1d1;
  --search-input-color: #424242;
}

.body--dark {
  --scroll-bar-color: #4a4a4a;
  --search-input-color: #ffff;
}

.sidebar-item:hover {
  background: rgba(204, 204, 220, 0.08) !important;
}

:deep(.q-field--dense) .q-field__control {

  background: transparent !important;
  border-radius: 5px !important;

}

:deep(.q-field--dark) .q-field__native {
  color: #ffff !important;
}

:deep(.q-field__native) {
  color: #000 !important;
}

:deep(.q-placeholder) {
  font-weight: 300 !important;
}

:deep(.q-item) {
  min-height: 30px !important;
}
</style>