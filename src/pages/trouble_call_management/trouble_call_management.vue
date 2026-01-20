<template>
  <!-- Page Layout -->
  <q-layout view="hHh lpR fFf">
    <!-- Page Container -->
    <q-page-container>
      <!-- Page -->
      <q-page :class="setPageColor">

        <!-- Page Header Component-->
        <PageHeader :title="strPageTitle" />

        <!-- Main Content Wrapper-->
        <div class="main-content-wrapper">
          <!-- Main Content Area -->
          <div class="main-content-area">

            <!-- Db Number Chart Wrapper-->
            <div class="row q-col-gutter-xs q-mb-xs db-number-chart-wrapper">
              <!-- Db Number Chart Container -->
              <div v-for="(objCircularValue, nIndex) in arrCircularValues" :key="nIndex" class="col-12 col-sm-6 col-md-3">
                <!-- Db Number Chart -->
                <db-number :value="objCircularValue.nValue" :total="objCircularValue.nTotal"
                  :title="objCircularValue.strTitle" :subtitle="objCircularValue.strSubtitle"
                  :trend="objCircularValue.arrTrend" :percentRanges="objCircularValue?.arrPercentRanges"
                  :trackColor="setDbNumberTrackColor" class="db-number-chart"
                  :class="setDbNumberClass" />
              </div>
            </div>

            <!-- Charts Wrapper-->
            <div class="row q-col-gutter-sm">
              <!-- Charts Container -->
              <div class="col-12 col-md-6">
                <!-- Trend Chart -->
                <TrendChart v-if="arrLabels.length > 0" 
                  :title="strTrendChartTitle"
                  :labels="arrLabels" 
                  :data="arrTrendData"
                  @chart-ready="onTrendChartReady" />

                <!-- Bar Chart and Donut Chart Wrapper-->
                <div class="row q-col-gutter-sm">
                  <!-- Bar Chart Container -->
                  <div :class="setChartContainerClass">
                    <!-- Bar Chart -->
                    <MultiBarChart 
                    :title="strBarChartTitle"
                    :labels="arrBarLabels" 
                    :data="arrBarData" />

                  </div>
                  <!-- Pie Chart Container -->
                  <div :class="setChartContainerClass">
                    <!-- Pie Chart -->
                    <PieChart
                     :title="strPieChartTitle"
                     :labels="arrPieLabels" 
                     :data="arrPieData" />
                  </div>
                </div>
              </div>

              <!-- Map Container -->
              <div class="col-12 col-md-6">
                <!-- Map Card -->
                <q-card flat bordered class="themed-card">
                  <!-- Map Card Section -->
                  <q-card-section class="map-card-section">
                    <!-- Map -->
                    <div id="outageMap" class="map"></div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script src="./trouble_call_management.js"></script>

<style scoped>
.q-toolbar {
  padding-left: 8px !important;
}

.main-page-medium-screen {
  padding-bottom: 120px;
}

.main-content-wrapper {
  display: flex;
  margin-top: -6px;
}

.main-content-area {
  padding: 8px;
  margin-top: -21px;
  width: 100%;
}

.db-number-chart-wrapper {
  margin-top: 1rem
}

.db-number-chart {
  border-radius: 4px;
}

.db-number-chart-dark {
  border: none;
}

.db-number-chart-light {
  border: 1px solid lightgray;
}

.map-card-section {
  padding: 0px;
  height: calc(100vh - 216px);
}

.map {
  height: 100%;
  width: 100%;
}
</style>
<style>
.themed-card {
  background: white;
}

.body--dark .themed-card {
  background-color: #252525 !important;
  border-color: #404040 !important;
}

.body--dark .text-subtitle2 {
  color: #e0e0e0 !important;
}

#outageMap {
  border-radius: 4px;
}

.tabulator {
  background: white;
  border: 1px solid #e0e0e0;
}

.body--dark .tabulator {
  background: #252525;
  border-color: #404040;
}

.body--dark .tabulator-header {
  background: #1e1e1e;
  color: #b0b0b0;
}

.body--dark .tabulator-row {
  background: #252525;
  color: #e0e0e0;
  border-bottom: 1px solid #333;
}

.body--dark .tabulator-row:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>