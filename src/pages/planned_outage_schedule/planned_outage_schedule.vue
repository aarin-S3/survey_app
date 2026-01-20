<template>
  <!-- Main Page -->
  <q-page class="q-pa-sm main-page" :class="setPageColor">

    <!-- Page Header -->

     <div class="col-auto bg-transparent z-top" >
         <q-toolbar style="min-height: 30px; padding: 0px;">
            <h4 v-on:click="currentPage = 'home'"
               :style="[$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;', $q.screen.lt.md ? 'display: none;' : 'display: inline-block;']"
               style="font-size: 1rem;  font-weight: 400; cursor: pointer;">
               Planned Outage Schedule
            </h4>
            <h4 :style="[$q.dark.isActive ? 'color:#9e9e9e;' : 'color:#424242;', $q.screen.lt.md ? 'display: inline-block;' : 'display: none;']"
               style="font-size: 1rem;  font-weight: 400; cursor: pointer;">
               POS
            </h4>

            <q-space />

            <q-btn flat dense bordered icon="add" label="New" @click="showWorkOrderDialog = true"
               :text-color="$q.dark.isActive ? 'grey-4' : 'grey-9'" class=""
               :class="[$q.dark.isActive ? 'my-btn-dark' : 'my-btn-light', $q.screen.lt.sm ? 'btn-size-dialog-planned-small' : 'btn-size-dialog-planned']">
               <q-tooltip :offset="[10, 5]"
                  style="background-color: #1d1d1d; border: 1px solid white; font: 100 !important">
                  Add New Outage
               </q-tooltip>
            </q-btn>

            <q-btn flat dense bordered label="Crew Order" 
               :text-color="$q.dark.isActive ? 'grey-4' : 'grey-9'" class=""
               :class="[$q.dark.isActive ? 'my-btn-dark' : 'my-btn-light', $q.screen.lt.sm ? 'btn-size-dialog-planned-small' : 'btn-size-dialog-planned']">
               <q-tooltip :offset="[10, 5]"
                  style="background-color: #1d1d1d; border: 1px solid white; font: 100 !important">
                  Add New Crew Order
               </q-tooltip>
            </q-btn>

         </q-toolbar>
      </div>

      <plannedDia v-model="showWorkOrderDialog" />

    <!-- Db Number Chart Wrapper -->
    <div class="row q-col-gutter-xs">
      <!-- Db Number Chart Container -->
      <div v-for="(objCircularValue, nIndex) in arrCircularValues" :key="nIndex" class="col-12 col-sm-6 col-md-3">
        <!-- Db Number Chart -->
        <db-number :value="objCircularValue.nValue" :total="objCircularValue.nTotal" :title="objCircularValue.strTitle"
          :subtitle="objCircularValue.strSubtitle" :trend="objCircularValue.arrTrend"
          :percentRanges="objCircularValue?.arrPercentRanges" :trackColor="setDbNumberTrackColor" class="db-chart"
          :class="setDbNumberClass" />
      </div>
    </div>

    <!-- Tabulator and Chart Wrapper -->
    <div class="row q-col-gutter-xs q-mt-xs full-height-responsive">

      <!-- Tabulator Table Wrapper -->
      <div class="col-12 col-md-9 tabulator-table-wrapper">
        <!-- Tabulator Table Container -->
        <div class="table-outer-wrapper">
          <!-- Tabulator Table -->
          <div ref="tabulatorRef" class="tabulator-container"></div>
        </div>
      </div>

      <!-- Charts Wrapper -->
      <div class="col-12 col-md-3">
        <!-- Charts Row -->
        <div class="row q-col-gutter-xs">
          <!-- Donut Chart Container -->
          <div class="col-12 col-sm-4 col-md-12">
            <!-- Donut Chart -->
            <DonutChart :data="objDonutChartData" chartClass="chart-container responsive-chart-height" />
          </div>
          <!-- Donut Chart Container -->
          <div class="col-12 col-sm-4 col-md-12">
            <!-- Donut Chart -->
            <DonutChart :data="objDonutChartData" chartClass="chart-container responsive-chart-height" />
          </div>
          <!-- Bar Chart Container -->
          <div class="col-12 col-sm-4 col-md-12">
            <!-- Bar Chart -->
            <BarChart :data="objBarChartData" chartClass="chart-container responsive-chart-height" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="./planned_outage_schedule.js"></script>

<style lang="sass" scoped>
.container
  display: flex
  justify-content: space-between
  padding: px


.chart-container
  width: 100%
  border-radius: 4px
  padding: 4px !important
  background: white

.tabulator-container
  width: 100%
  height: 100%
  background-color: white
  box-shadow: 0 1px 3px rgba(0,0,0,0.1)
  
  .q-dark & 
    background-color: #1f1f1f
    color: #e0e0e0
    border: 1px solid #333
    box-shadow: 0 2px 10px rgba(255,255,255,0.05)

.table-outer-wrapper
  width: 100%
  height: calc(100vh - 32.7vh)
  
  @media (max-width: 1024px)
    width: 96vw
    height: 600px
    margin-bottom: 10px

.responsive-chart-height
  height: calc((100vh - 34vh) / 3) !important
  min-height: 150px
  
  @media (max-width: 1023px)
    height: 250px !important
    margin-bottom: 5px

.main-page
  display: flex
  flex-direction: column
  min-height: 100vh
  margin-top: -8px !important

.main-page-medium-screen
  padding-bottom: 120px

.db-chart
  border-radius: 4px

.db-number-chart-dark
  border: none

.db-number-chart-light
  border: 1px solid lightgray

.tabulator-table-wrapper
  display: flex
  flex-direction: column
  
  
</style>

<style>
:root {
  --footer-pagination: #f2f4f7;
  --table-row-even-bg: #f5f5f5;
}

.btn-size-dialog-planned-small {
   font-size: 10px !important;
   font-weight: 400;
   margin-right: 3px;
   padding: 2px 8px !important;
   text-transform: capitalize !important;
}

.btn-size-dialog-planned {
   font-size: 12px !important;
   font-weight: 400;
   margin-left: 10px;
   /* margin-right: 10px; */
   padding: 2px 8px !important;
   text-transform: capitalize !important;
}

.body--dark {
  --footer-pagination: #1d1d1d;
}

.tabulator-footer {
  background-color: #ffffff !important;
  border-top: 1px solid #e0e0e0 !important;
  margin: 0px !important;
}

.tabulator-paginator {
  color: #333 !important;
  font-size: 13px !important;
  display: flex !important;
  justify-content: end !important;
}

.tabulator-page-size {
  display: inline-block !important;
  margin: 0 4px !important;
  padding: 4px 8px !important;
  border: 1px solid #d0d0d0 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  color: #333 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.tabulator-page-size:hover {
  border-color: #999 !important;
  background-color: #f5f5f5 !important;
}

.tabulator-pages {
  display: inline-flex !important;
  gap: 4px !important;
  margin: 0 8px !important;
}

.tabulator-page {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 32px !important;
  height: 32px !important;
  padding: 0 8px !important;
  border: 1px solid #d0d0d0 !important;
  border-radius: 4px !important;
  background-color: #ffffff !important;
  color: #555 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  font-weight: 500 !important;
}

.tabulator-page:hover:not(.disabled) {
  background-color: #f5f5f5 !important;
  border-color: #999 !important;
  color: #333 !important;
}

.tabulator-page.active {
  background-color: #333 !important;
  border-color: #333 !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

.tabulator-page.disabled {
  opacity: 0.4 !important;
  cursor: not-allowed !important;
  pointer-events: none !important;
}

.tabulator-page-counter {
  color: #666 !important;
  font-size: 13px !important;
  margin: 0 8px !important;
}

.tabulator .tabulator-header .tabulator-col .tabulator-col-content {
  padding: 7px 0px 4px 4px !important;
}

.tabulator-row {
  min-height: 19px;
}

.tabulator-row.tabulator-row-even {
  background-color: var(--table-row-even-bg) !important;
}

.tabulator .tabulator-footer .tabulator-footer-contents {
  background-color: var(--footer-pagination);
}

.body--dark .tabulator-footer {
  background-color: #1e1e1e !important;
  border-top: 1px solid #444 !important;
}

.body--dark .tabulator-paginator {
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page-size {
  border: 1px solid #555 !important;
  background-color: #2a2a2a !important;
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page-size:hover {
  border-color: #777 !important;
  background-color: #333 !important;
}

.body--dark .tabulator-page {
  border: 1px solid #555 !important;
  background-color: #2a2a2a !important;
  color: #b0b0b0 !important;
}

.body--dark .tabulator-page:hover:not(.disabled) {
  background-color: #333 !important;
  border-color: #777 !important;
  color: #f5f5f5 !important;
}

.body--dark .tabulator-page.active {
  background-color: #bdd9f5 !important;
  border-color: #bdd9f5 !important;
  color: #1e1e1e !important;
  font-weight: 600 !important;
}

.body--dark .tabulator-page.disabled {
  opacity: 0.3 !important;
}

.body--dark .tabulator-page-counter {
  color: #b0b0b0 !important;
}

.body--dark .tabulator-row .tabulator-cell {
  color: #90a4ae !important;
}

.tabulator-page[data-page="first"]::before {
  content: "«";
  font-weight: bold;
}

.tabulator-page[data-page="prev"]::before {
  content: "‹";
  font-weight: bold;
}

.tabulator-page[data-page="next"]::before {
  content: "«";
  font-weight: bold;
}

.tabulator-page[data-page="last"]::before {
  content: "»";
  font-weight: bold;
}
</style>


 <!-- <div>

      <div class="row q-col-gutter-xs q-mb-xs" style="margin-top:1rem" :style="$q.screen.lt.md ? 'margin-top:0rem' : ''">
      <div v-for="(item, index) in arrCircularValues" :key="index" class="col-12 col-sm-6 col-md-3">
        <db-number :value="item.value" :total="item.total" :title="item.title" :subtitle="item.subtitle"
          :percentRanges="item?.percentRanges" :trend="item.trend"
          :trackColor="$q.dark.isActive ? '#37474f' : '#f2f2f2'" style=" border-radius: 4px;"
          :style="$q.dark.isActive ? 'border:none;' : 'border: 1px solid lightgray;'" />
      </div>
    </div>

    <div class="row q-col-gutter-xs q-mb-xs" style="padding-bottom: 0px;">

      <div class="col-12 col-sm-6 col-md-4" style="min-width: 0;">
        <AccuracyChart :data="objAccuracyChartData" />
      </div>

      <div class="col-12 col-sm-6 col-md-4" style="min-width: 0;">
        <PieDash :data="arrPieChartData" />
      </div>

      <div class="col-12 col-sm-12 col-md-4" style="min-width: 0;">

        <div class="row q-col-gutter-xs">

          <div class="col-12 col-sm-6 col-md-12">
            <DonutChart :data="objDonutChartData" />
          </div>

          <div class="col-12 col-sm-6 col-md-12">
            <BarChart :data="objBarChartData" />
          </div>

        </div>
      </div>

    </div>

    <CombContainer :servers="arrServers" />

    </div> -->