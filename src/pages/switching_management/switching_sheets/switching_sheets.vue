<template>
  <q-page class="tag-page overflow-hidden">
    <div class="bg-transparent">
      <q-toolbar style="min-height: 30px; padding: 0px !important;">
        <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;'"
          style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px;">
          Tree Tabulator
        </h3>
      </q-toolbar>
    </div>

    <div class="q-pa-sm content-area column" style="margin-top: -10px;">

      <q-splitter v-model="splitterModel" unit="px" :limits="splitterLimits" :horizontal="$q.screen.lt.md" class=""
        :style="{
          height: $q.screen.lt.md ? 'calc(100vh - 150px)' : 'calc(100vh - 100px)',
        }">

        <template v-slot:before>
          <q-card flat bordered class="custom-card full-height flex column">
            <TreeSearch v-model="treeFilter" />
            <q-card-section class="col q-pa-none scroll">
              <q-tree dense :nodes="treeNodes" node-key="id" label-key="label" v-model:selected="selectedTreeNode"
                :filter="treeFilter" :filter-method="filterTreeMethod" default-expand-all selected-color="grey-6"
                text-color="grey-5" class="compact-tree q-pa-sm">
                <template v-slot:default-header="prop">
                  <div class="row items-center full-width">
                    <q-icon :name="prop.node.icon || 'folder'" :color="prop.node.children ? 'amber-9' : 'grey-8'"
                      size="xs" class="q-mr-xs" />
                    <span class="text-caption text-weight-medium">{{ prop.node.label }}</span>
                  </div>
                </template>
              </q-tree>
            </q-card-section>
          </q-card>
        </template>

        <template v-slot:after>
          <div class="fit flex column" :class="$q.screen.lt.md ? 'q-pt-xs' : 'q-pl-xs'">
            <q-card flat bordered class="custom-card col flex column overflow-hidden">
              <q-card-section class="col q-pa-none relative-position overflow-hidden">
                <div ref="tableWrapperRef" class="absolute-full">
                  <div ref="tabulatorRef" class="tabulator-custom full-height"></div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>

      </q-splitter>
    </div>

    <q-dialog v-model="showEditDialog">
      <q-card class="edit-dialog-card">
        <q-bar class="bg-grey-9 text-white" style="background-color: #1c1c1c !important;">
          <div class="" style="color: #90a4ae;">Edit Row Details</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup style="color: #e0e0e0;" />
        </q-bar>
        <q-separator color="grey-8" style="margin: 0px;" />
        <q-card-section class="q-pt-md">
          <q-form class="q-gutter-md">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption text-grey-5">Tag Name</div>
                  <div class="col-9"><q-input dense outlined dark v-model="editFormData.tag" /></div>
                </div>
                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption text-grey-5">Type</div>
                  <div class="col-9"><q-input dense outlined dark v-model="editFormData.type" /></div>
                </div>
                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption text-grey-5">Group</div>
                  <div class="col-9"><q-input dense outlined dark v-model="editFormData.group" /></div>
                </div>
                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption text-grey-5">Quality</div>
                  <div class="col-9"><q-select dense outlined dark v-model="editFormData.quality"
                      :options="['GOOD', 'BAD']" /></div>
                </div>
                <div class="row items-center q-mb-xs">
                  <div class="col-3 text-caption text-grey-5">Value</div>
                  <div class="col-9"><q-input type="number" dense outlined dark v-model.number="editFormData.val" />
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-separator color="grey-8" class="q-my-xs" />
        <q-card-actions align="right" class="bg-grey-8" style="background-color: #1c1c1c !important; padding: 2px;">
          <div>
            <q-btn label="Cancel" color="grey"
              style="padding: 2.5px 4px !important; font-size:10.5px !important; border-radius: 0px; border-width: 2px !important;"
              outline v-close-popup />
            <button @click="saveRowUpdates" class="custom-create-btn"
              style="padding: 4px 5px !important; font-size: 11px !important; margin-left: 5px; margin-top: -1px !important;"
              type="submit">Save</button>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, watch, computed, nextTick } from 'vue'
import { useQuasar } from 'quasar'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'
import TreeSearch from '../switching_sheets/components/tree_search/tree_search.vue'

const $q = useQuasar()

// --- STATE ---
const selectedTreeNode = ref(null)
const tabulatorRef = ref(null)
const tableWrapperRef = ref(null) // ADDED: Ref for the wrapper
const splitterModel = ref(250)
let tableInstance = null
let resizeObserver = null // ADDED: Observer instance

const treeFilter = ref('')
const tableFilter = ref('')

// Responsive Splitter Limits
const splitterLimits = computed(() => {
  if ($q.screen.lt.md) {
    return [150, window.innerHeight * 0.6]
  }
  return [200, 450]
})

// --- EDIT DIALOG ---
const showEditDialog = ref(false)
let currentRowInstance = null
const editFormData = reactive({ tag: '', type: '', group: '', quality: '', val: 0 })

// --- DATA ---
const treeNodes = reactive([
  {
    id: 'root', label: 'Site Root', icon: 'domain',
    children: [
      { id: '1', label: '11KV Distribution', children: [{ id: '1-1', label: 'Rodkan Region', children: [{ id: '1-1-1', label: 'Nask Zone A', icon: 'bolt' }, { id: '1-1-2', label: 'Ahilynagar Creek', icon: 'bolt' }] }] },
      { id: '2', label: 'RCDOMER-1 System', children: [{ id: '2-1', label: '33/11 KV Alkui', children: [{ id: '2-1-1', label: 'Feeder 014098', icon: 'sensors' }, { id: '2-1-2', label: 'Feeder Parkner', icon: 'sensors' }] }] }
    ]
  }
])

const tableData = [
  { id: 1, tag: 'AAMG_11BC1_L3B', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 452.1, ts: '10:23:01' },
  { id: 2, tag: 'AAMG_11BC2_C3B', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 448.4, ts: '10:23:01' },
  { id: 3, tag: 'AAMG_SWITCH_01', type: 'Discrete', group: 'State', quality: 'BAD', val: 0, ts: '10:22:55' },
  { id: 4, tag: 'AAMG_TEMP_MAIN', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 65.5, ts: '10:23:00' },
  { id: 5, tag: 'RELAY_TRIP_STAT', type: 'Discrete', group: 'Protection', quality: 'GOOD', val: 1, ts: '09:15:00' },
  { id: 6, tag: 'HV_BUSHING_TEMP', type: 'Analog', group: 'Safety', quality: 'GOOD', val: 32.1, ts: '10:23:02' },
  { id: 7, tag: 'LV_LINE_VOLT_A', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 230.1, ts: '10:23:02' },
  { id: 8, tag: 'LV_LINE_VOLT_B', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 229.8, ts: '10:23:02' },
  { id: 9, tag: 'LV_LINE_VOLT_C', type: 'Analog', group: 'Live_Data', quality: 'GOOD', val: 231.2, ts: '10:23:02' },
]

const addTableData = () => {
  for (let i = 0; i < 100; i++) {
    tableData.push({
      id: tableData.length + 1,
      tag: 'AAMG_11BC1_L3B',
      type: 'Analog',
      group: 'Live_Data',
      quality: 'GOOD',
      val: 452.1,
      ts: '10:23:01'
    })
  }
  tableData.push({
    id: tableData.length + 1,
    tag: 'AAMG_11BC1_L3B',
    type: 'Analog',
    group: 'Live_Data',
    quality: 'BAD',
    val: 452.1,
    ts: '10:23:01'
  })
}

// --- LOGIC ---
const updateTreeFlags = (nodes, term, parentMatched) => {
  const lowerTerm = term.toLowerCase()
  nodes.forEach(node => {
    const selfMatch = node.label.toLowerCase().includes(lowerTerm)
    const isMatched = parentMatched || selfMatch
    node._isMatched = isMatched
    if (node.children) updateTreeFlags(node.children, term, isMatched)
  })
}
watch(treeFilter, (val) => { if (val) updateTreeFlags(treeNodes, val, false) })
const filterTreeMethod = (node, filter) => !filter || node._isMatched === true

watch(tableFilter, (val) => {
  if (!tableInstance) return;
  val ? tableInstance.setFilter(d => Object.values(d).some(v => String(v).toLowerCase().includes(val.toLowerCase()))) : tableInstance.clearFilter();
});

watch(() => $q.screen.name, () => { nextTick(() => { if (tableInstance) tableInstance.redraw() }) })

const openEditDialog = (row) => {
  currentRowInstance = row;
  Object.assign(editFormData, row.getData());
  showEditDialog.value = true;
}
const saveRowUpdates = () => {
  if (currentRowInstance) currentRowInstance.update(editFormData);
  showEditDialog.value = false;
}

onMounted(() => {
  addTableData()

  if (tabulatorRef.value) {
    const tagContextMenu = [
      { label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>content_copy</i> Copy Tag Name", action: (e, cell) => navigator.clipboard.writeText(cell.getValue()) },
      {
        label: "Admin Functions", menu: [
          { label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>edit</i> Edit Row", action: (e, cell) => openEditDialog(cell.getRow()) },
          { label: "<i class='material-icons' style='font-size:16px; vertical-align:middle; margin-right:5px;'>delete</i> Delete Row", action: (e, cell) => cell.getRow().delete() }
        ]
      }
    ];

    const initialLayout = window.innerWidth < 1024 ? "fitData" : "fitColumns";

    tableInstance = new Tabulator(tabulatorRef.value, {
      data: tableData,
      layout: initialLayout,
      columnHeaderVertAlign: "center",
      height: "100%",
      headerVisible: true,
      rowHeight: 25,
      placeholder: "<div style='display:flex; flex-direction:column; align-items:center; opacity:0.6;'><i class='material-icons' style='font-size: 24px; margin-bottom:5px;'>search_off</i><span>No Data Found</span></div>",
      columns: [
        { formatter: "rowSelection", titleFormatter: "rowSelection", width: 30, hozAlign: "center", headerSort: false, frozen: true },
        { title: "Tag Name", field: "tag", widthGrow: 2, minWidth: 10, cssClass: "text-bold text-grey-6", headerFilter: "input", headerFilterPlaceholder: "Search...", contextMenu: tagContextMenu },
        { title: "Type", field: "type", widthGrow: 1, minWidth: 80, headerFilter: "input" },
        { title: "Group", field: "group", widthGrow: 1, minWidth: 100, headerFilter: "input", formatter: c => `<span>${c.getValue()}</span>` },
        { title: "Quality", field: "quality", widthGrow: 1, minWidth: 80, hozAlign: "center", headerFilter: "input", formatter: c => `<span class="status-pill ${c.getValue() === 'GOOD' ? 'green' : 'red'}">${c.getValue()}</span>` },
        { title: "Value", field: "val", widthGrow: 1, minWidth: 80, hozAlign: "right", cssClass: "text-weight-bold", headerFilter: "input", formatter: c => `<span style="padding:1px 6px; background-color:#d86471; color:white; border-radius:6px">${c.getValue()}</span>` },
        { title: "Timestamp", field: "ts", widthGrow: 1, minWidth: 90, hozAlign: "right", cssClass: "text-grey-5", headerFilter: "input" },
      ]
    })

    // --- ADDED: RESIZE OBSERVER ---
    // This detects when the parent div changes size (drawer move, window resize, splitter move)
    // and forces Tabulator to redraw cleanly.
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

// Cleanup observer
onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
})
</script>

<style lang="scss" scoped>
/* --- Global Variables --- */
$bg-color: #1c1c1c;
$text-dim: #888888;
$border-color: #333333;

.tag-page {
  /* Fix 1: Ensure dvh for mobile address bars */
  height: 84vh;

  @supports (height: 100dvh) {
    height: 90dvh;
  }

  /* Fix 2: Prevent Page Horizontal Scroll */
  overflow-x: hidden;
  width: 100vw;

  display: flex;
  flex-direction: column;
  font-family: 'Roboto',
  'Segoe UI',
  sans-serif;
  font-size: 12px;
}

.content-area {
  flex: 1;
  overflow: hidden;
  padding: 8px;

  .q-splitter {
    border: none;
  }
}

.edit-dialog-card {
  min-width: 350px;
  background-color: #232323;
  color: #e0e0e0;
  border: 1px solid #444;

  @media (max-width: 600px) {
    min-width: unset;
    width: 95vw;
  }
}

/* --- Tabulator Styling --- */
.tabulator-custom {
  background-color: transparent;
  border: none;
  font-size: 11px;

  :deep(.tabulator-header) {
    color: $text-dim;
    font-weight: 600;

    .tabulator-col {
      height: auto !important;

      .tabulator-col-content {
        padding: 4px 8px;
      }
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

      &:focus {
        border-color: #00bcd4;
      }
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
    .tabulator-table {
      background-color: $bg-color;
    }
  }
}

:deep(.status-pill) {
  padding: 1px 6px;
  border-radius: 10px;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;

  &.green {
    background: rgba(76, 175, 80, 0.2);
    color: #66bb6a;
  }

  &.red {
    background: rgba(244, 67, 54, 0.2);
    color: #ef5350;
  }
}

::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}

::-webkit-scrollbar-track {
  background: #1c1c1c;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #444;
}

.q-splitter__separator {
  background-color: $border-color;
}

:deep(.q-field--dense) .q-field__marginal {
  height: 29px !important;
}

:deep(.q-field__native) {
  padding-top: 5px;
}

.custom-create-btn {
  background-color: transparent;
  color: #385562;
  border: 1px solid #385562;
  cursor: pointer;

  &:hover {
    background-color: #385562;
    color: white;
  }
}
/* --- Scrollbar Styling --- */

/* 1. Target Tabulator's specific scroll container using :deep */
.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar {
  width: 4px !important;   /* Fix for vertical thickness */
  height: 4px !important;  /* Fix for horizontal thickness */
}

.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 10px;    /* Rounded edges look smoother on thin bars */
}

.tabulator-custom :deep(.tabulator-tableHolder)::-webkit-scrollbar-track {
  background: #1c1c1c; 
}

/* 2. (Optional) Your Global Scrollbar Styling for other parts of the page */
::-webkit-scrollbar {
  width: 4px !important;
  height: 4px !important;
}

::-webkit-scrollbar-track {
  background: #1c1c1c;
}

::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555; /* Slightly lighter on hover so user knows they can grab it */
}
</style>



