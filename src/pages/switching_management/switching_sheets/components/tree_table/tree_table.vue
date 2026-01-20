<template>
  <div ref="tableWrapperRef" class="absolute-full overflow-hidden">
    <div ref="tabulatorRef" class="tabulator-custom full-height"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, toRaw } from 'vue' // Import toRaw
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'
import { useQuasar } from 'quasar'

const $q = useQuasar()

// --- PROPS & EMITS ---
const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  filterTerm: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['edit-row', 'delete-row'])

// --- STATE ---
const tabulatorRef = ref(null)
const tableWrapperRef = ref(null)
let tableInstance = null
let resizeObserver = null

// --- WATCHERS ---

// 1. Filter Watcher
watch(() => props.filterTerm, (val) => {
  if (!tableInstance) return
  if (val) {
    tableInstance.setFilter(d => Object.values(d).some(v => String(v).toLowerCase().includes(val.toLowerCase())))
  } else {
    tableInstance.clearFilter()
  }
})

// 2. Data Watcher (CRITICAL FIX HERE)
watch(() => props.rows, (newRows) => {
  if (tableInstance) {
    // We must use toRaw() to give Tabulator a clean JS array, not a Vue Proxy
    const cleanRows = toRaw(newRows)
    
    // replaceData is the correct method for full updates
    tableInstance.replaceData(cleanRows)
  }
}, { deep: true })

// 3. Screen Resize Watcher
watch(() => $q.screen.name, () => {
  nextTick(() => { if (tableInstance) tableInstance.redraw() })
})

// --- MOUNT ---
onMounted(() => {
  if (tabulatorRef.value) {
    // Context Menu Definition
    const tagContextMenu = [
      { 
        label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>content_copy</i> Copy Tag Name", 
        action: (e, cell) => navigator.clipboard.writeText(cell.getValue()) 
      },
      {
        label: "Admin Functions", menu: [
          { 
            label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>edit</i> Edit Row", 
            action: (e, cell) => emit('edit-row', cell.getRow()) 
          },
          { 
            label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>delete</i> Delete Row", 
            action: (e, cell) => cell.getRow().delete() 
          }
        ]
      }
    ];

    const initialLayout = window.innerWidth < 1024 ? "fitData" : "fitColumns";

    // Initialize Tabulator with toRaw(props.rows)
    tableInstance = new Tabulator(tabulatorRef.value, {
      data: toRaw(props.rows), // FIX: Use raw data for initialization
      reactiveData: false,     // FIX: Disable Tabulator's internal reactivity sync to prevent conflicts
      layout: initialLayout,
      columnHeaderVertAlign: "center",
      height: "100%",
      headerVisible: true,
      rowHeight: 25,
      placeholder: "<div style='display:flex; flex-direction:column; align-items:center; opacity:0.6;'><i class='material-icons' style='font-size: 24px; margin-bottom:5px;'>search_off</i><span>No Data Found</span></div>",
      columns: [
        { formatter: "rowSelection", titleFormatter: "rowSelection", width: 30, hozAlign: "center", headerSort: false, frozen: true },
        { title: "Tag Name", field: "tag", widthGrow: 2, minWidth: 150, cssClass: "text-bold text-grey-6", headerFilter: "input", headerFilterPlaceholder: "Search...", contextMenu: tagContextMenu },
        { title: "Type", field: "type", widthGrow: 1, minWidth: 80, headerFilter: "input" },
        { title: "Group", field: "group", widthGrow: 1, minWidth: 100, headerFilter: "input", formatter: c => `<span>${c.getValue()}</span>` },
        { title: "Quality", field: "quality", widthGrow: 1, minWidth: 80, hozAlign: "center", headerFilter: "input", formatter: c => `<span class="status-pill ${c.getValue() === 'GOOD' ? 'green' : 'red'}">${c.getValue()}</span>` },
        { title: "Value", field: "val", widthGrow: 1, minWidth: 80, hozAlign: "right", cssClass: "text-weight-bold", headerFilter: "input", formatter: c => `<span style="padding:1px 6px; background-color:#d86471; color:white; border-radius:6px">${c.getValue()}</span>` },
        { title: "Timestamp", field: "ts", widthGrow: 1, minWidth: 90, hozAlign: "right", cssClass: "text-grey-5", headerFilter: "input" },
      ]
    })

    // Resize Observer
    if (tableWrapperRef.value) {
      resizeObserver = new ResizeObserver(() => {
        if (tableInstance) {
          tableInstance.redraw();
        }
      });
      resizeObserver.observe(tableWrapperRef.value);
    }
  }
})

// --- CLEANUP ---
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (tableInstance) {
    tableInstance.destroy(); // Good practice to destroy table on unmount
  }
})
</script>

<style lang="scss" scoped>
/* Use the same styles as before */
$bg-color: #1c1c1c;
$text-dim: #888888;

.tabulator-custom {
  background-color: transparent;
  border: none;
  font-size: 11px;

  :deep(.tabulator-header) {
    color: $text-dim;
    font-weight: 600;
    .tabulator-col {
      height: auto !important;
      .tabulator-col-content { padding: 4px 8px; }
    }
  }
  :deep(.tabulator-header-filter) {
    margin-top: 4px;
    input {
      border: 1px solid #444;
      color: #ccc;
      font-size: 10px;
      padding: 4px;
      width: 100%;
      border-radius: 3px;
      outline: none;
      background: transparent;
      &:focus { border-color: #00bcd4; }
    }
    select {
      background: #111;
      border: 1px solid #444;
      color: #ccc;
      font-size: 10px;
      padding: 2px;
      width: 100%;
    }
  }
  :deep(.tabulator-row) {
    min-height: 26px;
    .tabulator-cell {
      padding: 4px 8px;
      height: 26px;
      line-height: 18px;
    }
  }
  :deep(.tabulator-tableHolder) {
    .tabulator-table { background-color: $bg-color; }
  }
}

:deep(.status-pill) {
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  &.green { background: rgba(76, 175, 80, 0.2); color: #66bb6a; }
  &.red { background: rgba(244, 67, 54, 0.2); color: #ef5350; }
}

.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar { width: 4px !important; height: 4px !important; }
.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar-track { background: #1c1c1c; }
</style>

