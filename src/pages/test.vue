<template>
  <!-- Page Layout -->
  <q-layout view="hHh lpR fFf">
    <!-- Page Container -->
    <q-page-container>
      <!-- Page -->
      <q-page class="" :class="[$q.dark.isActive ? 'bg-dark-page' : 'bg-white',]"
        :style="$q.screen.lt.md ? 'padding-bottom: 120px;' : ' '">

        <!-- Page Header Component-->
        <PageHeader title="Trouble Call Management" />

        <div style="display: flex; margin-top: -6px;">
          <div style="padding: 8px; margin-top: -21px; width: 100%; ">

            <div class="row q-col-gutter-xs q-mb-xs" style="margin-top:1rem">
              <div v-if="arrCircularValues && arrCircularValues.length" v-for="(item, index) in arrCircularValues" :key="index" class="col-12 col-sm-6 col-md-3">
                <db-number :value="item.value" :total="item.total" :title="item.title" :subtitle="item.subtitle"
                  :trend="item.trend" :percentRanges="item?.percentRanges"
                  :trackColor="$q.dark.isActive ? '#37474f' : '#f2f2f2'" style=" border-radius: 4px;"
                  :style="$q.dark.isActive ? 'border:none;' : 'border: 1px solid lightgray;'" />
              </div>
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-md-6">
                <TroubleTrendChart v-if="objLabels.length > 0" :labels="objLabels" :data="arrTrendData"
                   @chart-ready="onTrendChartReady" />

                <div class="row q-col-gutter-sm">
                  <div class="" :class="$q.screen.lt.md ? 'col-12' : 'col-6'">

                    <TroubleBarChart :labels="arrBarLabels" :data="arrBarData" />

                  </div>
                  <div class="" :class="$q.screen.lt.md ? 'col-12' : 'col-6'">
                     <TroubleDonutChart :labels="arrDonutLabels" :data="arrDonutData" />
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <q-card flat bordered class="themed-card">
                  <q-card-section style="padding: 0px; height: calc(100vh - 216px);">
                    <div id="outageMap" style="height: 100%; width: 100%;"></div>
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
.trouble-page{
  padding-bottom: 120px;
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