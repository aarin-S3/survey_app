<template>
  <q-page class="q-pa-sm" :class="$q.dark.isActive ? '' : 'bg-white'" style="padding-top: 0px !important;"
    :style="$q.screen.lt.md ? 'padding-bottom: 120px !important;' : 'padding-bottom: 65px !important;'">

    <div style="margin-left: -8px;">
      <PageHeader title="Dashboard" />
    </div>

    <div style="display: grid; grid-template-columns: minmax(0, 1fr);">
      <div style="overflow-x: auto; width: 100%;">
        <div id="audit-log-table" style="border-bottom: none;"></div>
      </div>
    </div>

    <div>
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

    </div>

  </q-page>
</template>

<script src="./dashboard.js"></script>

<style scoped>

.graph-container {
  width: 99%;
  height: 200px;
  min-height: 180px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px;
  background: white;
  position: relative;
  overflow: hidden;
}

</style>