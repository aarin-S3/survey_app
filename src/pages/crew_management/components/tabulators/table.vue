<template>
   <!-- <div style="height: 100%; width: 100%; overflow: hidden;"> -->
   <!-- <div style="background-color: red; height: 100%; width: 100%; overflow: hidden;">

      </div> -->
   <div class="" style="height: 100%; width: 100%; overflow: hidden;">

      <div class="report-header col-auto q-pa-sm  text-white z-top">
         <div class="header-content">
            <div class="row items-center justify-between q-mb-sm">
               <div class="text-subtitle1 text-weight-bold text-uppercase">Sub-Station Survey</div>
               <div class="text-caption text-uppercase text-grey-4">Feeder List</div>
            </div>

            <div class="meta-grid">
               <div class="meta-field">
                  <label>Substation Name</label>
                  <input v-model="surveyData.metadata.substationName" type="text" placeholder="Name..." />
               </div>
               <div class="meta-field">
                  <label>In-charge Name</label>
                  <input v-model="surveyData.metadata.inChargeName" type="text" placeholder="Name..." />
               </div>
               <div class="meta-field">
                  <label>Date</label>
                  <input v-model="surveyData.metadata.surveyDate" type="date" />
               </div>
               <div class="meta-field">
                  <label>Engineer</label>
                  <input v-model="surveyData.metadata.engineerName" type="text" placeholder="Name..." />
               </div>
            </div>
         </div>
      </div>

      <div class="grid-container col relative-position">
         <div :style="$q.screen.lt.sm ? { width: '69vw' } : { width: '75vw' }" style=" height: calc(100vh - 200px)"
            ref="tableRef" class="absolute-full"></div>
      </div>

   </div>
   <!-- </div> -->
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';

const tableRef = ref(null);
const tabulatorInstance = ref(null);

const surveyData = reactive({
   metadata: { substationName: '', inChargeName: '', surveyDate: '', engineerName: '' },
   tableRows: Array.from({ length: 105 }, (_, i) => ({ id: i + 1, s_no: i + 1 }))
});

const yesNoEditor = "list";
const yesNoParams = { values: ["Yes", "No"] };

const onDataChanged = () => {
   if (tabulatorInstance.value) {
      surveyData.tableRows = tabulatorInstance.value.getData();
   }
};

onMounted(() => {
   nextTick(() => {
      tabulatorInstance.value = new Tabulator(tableRef.value, {
         data: surveyData.tableRows,
         // CRITICAL: Tells Tabulator to look at parent height (grid-container)
         height: "calc(100vh - 200px)",
         width: "100%",
         layout: "fitDataStretch",
         columnHeaderVertAlign: "bottom",
         dataChanged: onDataChanged,
         cellEdited: onDataChanged,
         columns: [
            { title: "S.No", field: "s_no", width: 50, frozen: true, hozAlign: "center", headerHozAlign: "center", resizable: false },
            { title: "Bay Name", field: "bay_name", editor: "input", minWidth: 120 },
            { title: "Nominal Voltage", field: "nominal_voltage", editor: "input", minWidth: 80 },
            { title: "Description", field: "feeder_desc", editor: "textarea", formatter: "textarea", minWidth: 180 },
            { title: "Space Avail", field: "space_avail", editor: yesNoEditor, editorParams: yesNoParams, width: 90, hozAlign: "center" },
            { title: "Category", field: "feeder_cat", editor: "input", minWidth: 120 },
            { title: "Req CMR", field: "req_cmr", editor: yesNoEditor, editorParams: yesNoParams, width: 80, hozAlign: "center" },
            { title: "Req HDR", field: "req_hdr", editor: yesNoEditor, editorParams: yesNoParams, width: 80, hozAlign: "center" },
            { title: "Free Cont.", field: "free_contacts", editor: yesNoEditor, editorParams: yesNoParams, width: 90, hozAlign: "center" },
            { title: "Supply Lamp", field: "supply_lamp", editor: yesNoEditor, editorParams: yesNoParams, width: 90, hozAlign: "center" },
            { title: "Met. Core", field: "metering_ct", editor: yesNoEditor, editorParams: yesNoParams, width: 90, hozAlign: "center" },
            { title: "PT Volt", field: "pt_voltage", editor: yesNoEditor, editorParams: yesNoParams, width: 90, hozAlign: "center" },
            { title: "CT Ratio", field: "ct_ratio", editor: "input", width: 80 },
            { title: "CT Len", field: "ct_cable", editor: "input", width: 80 },
            { title: "PT Len", field: "pt_cable", editor: "input", width: 80 },
         ],
      });
   });
});
</script>

<style scoped>
/* Container Styling
  No 'position: absolute' on the wrapper to ensure it stays in the flex column.
*/
.body--dark .tabulator-row .tabulator-cell {
   color: #90a4ae !important;
}

.survey-wrapper {
   background-color: #2c3e50;
   font-family: 'Roboto', sans-serif;
   max-width: 50%;
   /* Prevent overflowing width */
}

.report-header {
   border-bottom: 1px solid #455a64;
   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
   background-color: #2c394f;
}

/* Grid Container 
  Uses Quasar's 'relative-position' to contain the absolute table inside it.
*/
.grid-container {
   width: 100%;
}

/* --- Input Grid Responsive --- */
.meta-grid {
   display: grid;
   gap: 10px;
   grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 800px) {
   .meta-grid {
      grid-template-columns: repeat(2, 1fr);
   }
}

@media (max-width: 500px) {
   .meta-grid {
      grid-template-columns: 1fr;
   }

   .meta-field input {
      padding: 8px;
      font-size: 13px;
   }
}

.meta-field {
   display: flex;
   flex-direction: column;
}

.meta-field label {
   font-size: 10px;
   color: #b0bec5;
   margin-bottom: 2px;
   text-transform: uppercase;
}

/* .meta-field input {
  background: #37474f; border: 1px solid #546e7a; color: white;
  padding: 4px 8px; border-radius: 4px; font-size: 12px; outline: none;
} */
.meta-field input:focus {
   border-color: #29b6f6;
}

/* --- Tabulator Overrides --- */
/* :deep(.tabulator) { border: none; background: transparent; }
:deep(.tabulator-header) { background-color: #263238 !important; border-bottom: 2px solid #546e7a; color: #eceff1; }
:deep(.tabulator-row) { background-color: rgb(200, 200, 200); color: #eceff1; border-bottom: 1px solid #455a64; }
:deep(.tabulator-row:nth-child(even)) { background-color: #34495e; }
:deep(.tabulator-cell) { border-right: 1px solid #455a64; padding: 4px; font-size: 13px; } */

/* Mobile Font Scaling */
@media (max-width: 600px) {

   :deep(.tabulator-cell),
   :deep(.tabulator-col-title) {
      font-size: 11px !important;
      padding: 2px !important;
   }
}

/* Input Styling inside Grid */
:deep(.tabulator-cell input),
:deep(.tabulator-cell select),
:deep(.tabulator-cell textarea) {
   background: #fff;
   color: #000;
   border: 2px solid #2196f3;
}

</style>