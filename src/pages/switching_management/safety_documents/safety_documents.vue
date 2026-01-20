<template>
  <q-page class="tag-page">
    <div class="bg-transparent no-shrink"> <q-toolbar style="min-height: 30px; padding: 0px !important;">
        <h3 :style="$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;'"
          style="font-size: 1rem; display: inline-block; font-weight: 400; padding-left: 8px;">
          Tree Tabulator
        </h3>
      </q-toolbar>
    </div>

    <div class="table-wrapper">
      <div ref="tabulatorRef" class="tabulator-custom"></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator.min.css'

const tabulatorRef = ref(null)

// ... [Keep your treeNodes and tableData data exactly as they were] ...
const tableData = [
  {
    name: "Oli Bob", location: "United Kingdom", gender: "male", col: "red", dob: "14/04/1984", _children: [
      { name: "Mary May", location: "Germany", gender: "female", col: "blue", dob: "14/05/1982" },
      { name: "Christine Lobowski", location: "France", gender: "female", col: "green", dob: "22/05/1982" },
      {
        name: "Brendon Philips", location: "USA", gender: "male", col: "orange", dob: "01/08/1980", _children: [
          { name: "Margret Marmajuke", location: "Canada", gender: "female", col: "yellow", dob: "31/01/1999" },
          { name: "Frank Harbours", location: "Russia", gender: "male", col: "red", dob: "12/05/1966" },
        ]
      },
    ]
  },
  { name: "Jamie Newhart", location: "India", gender: "male", col: "green", dob: "14/05/1985" },
  {
    name: "Gemma Jane", location: "China", gender: "female", col: "red", dob: "22/05/1982", _children: [
      { name: "Emily Sykes", location: "South Korea", gender: "female", col: "maroon", dob: "11/11/1970" },
    ]
  },
  { name: "James Newman", location: "Japan", gender: "male", col: "red", dob: "22/03/1998" },
    {
    name: "Oli Bob", location: "United Kingdom", gender: "male", col: "red", dob: "14/04/1984", _children: [
      { name: "Mary May", location: "Germany", gender: "female", col: "blue", dob: "14/05/1982" },
      { name: "Christine Lobowski", location: "France", gender: "female", col: "green", dob: "22/05/1982" },
      {
        name: "Brendon Philips", location: "USA", gender: "male", col: "orange", dob: "01/08/1980", _children: [
          { name: "Margret Marmajuke", location: "Canada", gender: "female", col: "yellow", dob: "31/01/1999" },
          { name: "Frank Harbours", location: "Russia", gender: "male", col: "red", dob: "12/05/1966" },
        ]
      },
    ]
  },
  { name: "Jamie Newhart", location: "India", gender: "male", col: "green", dob: "14/05/1985" },
  {
    name: "Gemma Jane", location: "China", gender: "female", col: "red", dob: "22/05/1982", _children: [
      { name: "Emily Sykes", location: "South Korea", gender: "female", col: "maroon", dob: "11/11/1970" },
    ]
  },
  { name: "James Newman", location: "Japan", gender: "male", col: "red", dob: "22/03/1998" },
  
];

const addMoreData = () => {
  for(let i =0 ; i<100 ; i++){
    tableData.push({
      name: "Oli Bob", location: "United Kingdom", gender: "male", col: "red", dob: "14/04/1984", _children: [
        { name: "Mary May", location: "Germany", gender: "female", col: "blue", dob: "14/05/1982" },
        { name: "Christine Lobowski", location: "France", gender: "female", col: "green", dob: "22/05/1982" },
        {
          name: "Brendon Philips", location: "USA", gender: "male", col: "orange", dob: "01/08/1980", _children: [
            { name: "Margret Marmajuke", location: "Canada", gender: "female", col: "yellow", dob: "31/01/1999" },
            { name: "Frank Harbours", location: "Russia", gender: "male", col: "red", dob: "12/05/1966" },
          ]
        },
      ]
    })
  }
}

onMounted(() => {
  addMoreData()
  if (tabulatorRef.value) {
    var table = new Tabulator(tabulatorRef.value, {
      height: "100%", // CHANGED: Set to 100% to fill the parent .table-wrapper
      layout: "fitColumns",
      data: tableData,
      dataTree: true,
      dataTreeStartExpanded: true,
      columns: [
        { title: "Name", field: "name", widthGrow: 1, responsive: 0 },
        { title: "Location", field: "location", widthGrow: 1 },
        { title: "Gender", field: "gender", widthGrow: 1, responsive: 2 },
        { title: "Favourite Color", field: "col", widthGrow: 1 },
        { title: "Date Of Birth", field: "dob", hozAlign: "center", sorter: "date", widthGrow: 1 },
      ],
    });
  }
})
</script>

<style lang="scss" scoped>
/* --- Global Variables (Kept yours) --- */
$bg-color: #1c1c1c;
$card-bg: #1c1c1c;
$border-color: #333333;
$text-main: #d0d0d0;
$text-dim: #888888;

/* --- Page Layout --- */
.tag-page {
  height: 100vh; /* Full viewport height */
  display: flex;
  flex-direction: column; /* Stack children vertically */
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  font-size: 12px;
  overflow: hidden; /* Prevent body scroll */
}

/* --- New Wrapper Class --- */
.table-wrapper {
  width: 99%;
  flex: 1; /* Grow to fill all remaining space */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures the scrollbar stays inside this div, not the page */
  padding-left: 8px;
  position: relative; /* Anchor for absolute positioning if needed */
}

.no-shrink {
  flex-shrink: 0; /* Ensures header stays fixed size */
}

/* --- Tabulator Overrides --- */
.tabulator-custom {
  background-color: transparent;
  border: none;
  font-size: 11px;
  width: 100%; 
  /* Note: width 98% might cause horizontal scroll if padding adds up. 
     Consider width: 100% and using padding on the container instead. */

  .tabulator-header {
    font-weight: 600;
    .tabulator-col {
      background-color: #232323;
      border-right: 1px solid $border-color;
      height: 30px !important;
      .tabulator-col-content {
        padding: 4px 8px;
      }
    }
  }

  .tabulator-tableHolder {
    background-color: $bg-color;
    /* This ensures the scrollbar matches your dark theme */
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: #1c1c1c;
    }
    &::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #444;
    }
  }

  /* ... [Rest of your styles remain unchanged] ... */
  .tabulator-row {
    background-color: $bg-color;
    color: $text-main;
    border-bottom: 1px solid #2a2a2a;
    min-height: 26px;

    &:hover {
      background-color: #2a2a2a !important;
    }
    &.tabulator-selected {
      background-color: rgba(0, 188, 212, 0.1) !important;
    }
    .tabulator-cell {
      border-right: 1px solid #2a2a2a;
      padding: 4px 8px;
      height: 26px;
      line-height: 18px;
    }
  }
}

:deep(.tabulator-row .tabulator-cell .tabulator-data-tree-control) {
  background-color: #90a4ae;
}
</style>